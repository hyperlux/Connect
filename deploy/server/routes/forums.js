import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { createNotification } from '../lib/notifications.js';

const router = express.Router();

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.string()
});

const voteSchema = z.object({
  value: z.number().min(-1).max(1)
});

router.get('/posts', async (req, res) => {
  try {
    console.log('Fetching forum posts with query:', req.query);
    const { category, sort = 'new' } = req.query;
    const where = category && category !== 'All' ? { category } : {};

    let orderBy = [];
    switch (sort) {
      case 'hot':
        // For hot posts, order by score and recency
        orderBy = [
          { score: 'desc' },
          { createdAt: 'desc' }
        ];
        break;
      case 'top':
        // For top posts, order by score only
        orderBy = [{ score: 'desc' }];
        break;
      case 'new':
      default:
        orderBy = [{ createdAt: 'desc' }];
    }

    console.log('Prisma query where clause:', where);
    const posts = await prisma.forumPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePicture: true
          }
        },
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      },
      orderBy
    });

    console.log(`Found ${posts.length} posts`);

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      author: {
        id: post.author.id,
        name: post.author.name,
        avatar: post.author.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`
      },
      score: post.score || 0,
      _count: {
        comments: post._count.comments,
        votes: post._count.votes
      },
      views: post.views,
      createdAt: post.createdAt,
      lastActivity: post.updatedAt
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Failed to fetch posts',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Add route for fetching individual forum post
router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await prisma.forumPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePicture: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                profilePicture: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Forum post not found' });
    }

    // Update views count
    await prisma.forumPost.update({
      where: { id },
      data: { views: (post.views || 0) + 1 }
    });

    const formattedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      author: {
        id: post.author.id,
        name: post.author.name,
        avatar: post.author.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`
      },
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.author.id,
          name: comment.author.name,
          avatar: comment.author.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author.name)}`
        },
        createdAt: comment.createdAt
      })),
      score: post.score || 0,
      _count: {
        comments: post._count.comments,
        votes: post._count.votes
      },
      views: post.views + 1,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };

    res.json(formattedPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ 
      message: 'Failed to fetch post',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { title, content, category } = postSchema.parse(req.body);
    
    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        category,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePicture: true
          }
        },
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Vote on post
router.post('/posts/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = voteSchema.parse(req.body);
    
    // Check if post exists
    const post = await prisma.forumPost.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check for existing vote
    const existingVote = await prisma.postVote.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: req.user.id
        }
      }
    });

    // Handle vote logic
    if (existingVote) {
      if (value === 0) {
        // Remove vote
        await prisma.postVote.delete({
          where: {
            postId_userId: {
              postId: id,
              userId: req.user.id
            }
          }
        });
      } else {
        // Update vote
        await prisma.postVote.update({
          where: {
            postId_userId: {
              postId: id,
              userId: req.user.id
            }
          },
          data: { value }
        });
      }
    } else if (value !== 0) {
      // Create new vote
      await prisma.postVote.create({
        data: {
          postId: id,
          userId: req.user.id,
          value
        }
      });
    }

    // Update post score
    const votes = await prisma.postVote.findMany({
      where: { postId: id }
    });
    
    const newScore = votes.reduce((sum, vote) => sum + vote.value, 0);
    
    const updatedPost = await prisma.forumPost.update({
      where: { id },
      data: { score: newScore },
      include: {
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      }
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error voting on post:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Failed to vote on post' });
  }
});

router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const post = await prisma.forumPost.findUnique({
      where: { id },
      include: {
        author: true
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await prisma.forumComment.create({
      data: {
        content,
        postId: id,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    });

    // Notify the post author
    if (post.authorId !== req.user.id) {
      await createNotification(
        post.authorId,
        'forum',
        'New Comment',
        `${req.user.name} commented on your post: ${post.title}`,
        `/forum/posts/${post.id}`
      );
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
});

export const forumsRouter = router;
