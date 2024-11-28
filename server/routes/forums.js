import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.string()
});

router.get('/posts', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category && category !== 'All' ? { category } : {};

    const posts = await prisma.forumPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            comments: true,
            views: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      author: {
        id: post.author.id,
        name: post.author.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`
      },
      replies: post._count.comments,
      views: post._count.views,
      createdAt: post.createdAt,
      lastActivity: post.updatedAt
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
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
            email: true
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

router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

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
            name: true
          }
        }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
});

export const forumsRouter = router;