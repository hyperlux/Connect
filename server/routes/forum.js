import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/authenticate.js';
import { createNotification } from './notifications.js';

const router = express.Router();

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.string()
});

const commentSchema = z.object({
  content: z.string().min(1)
});

// Get all posts
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await prisma.forumPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Create post
router.post('/posts', authenticate, async (req, res, next) => {
  try {
    const postData = postSchema.parse(req.body);
    const post = await prisma.forumPost.create({
      data: {
        ...postData,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Update post (admin or author only)
router.put('/posts/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = postSchema.parse(req.body);
    
    const post = await prisma.forumPost.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is admin or post author
    if (req.user.role !== 'ADMIN' && post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updatedPost = await prisma.forumPost.update({
      where: { id },
      data: postData,
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    });

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// Delete post (admin or author only)
router.delete('/posts/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const post = await prisma.forumPost.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is admin or post author
    if (req.user.role !== 'ADMIN' && post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete all comments first
    await prisma.forumComment.deleteMany({
      where: { postId: id }
    });

    // Delete the post
    await prisma.forumPost.delete({
      where: { id }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Admin: Delete any post
router.delete('/posts/:id/admin', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const post = await prisma.forumPost.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete all comments first
    await prisma.forumComment.deleteMany({
      where: { postId: id }
    });

    // Delete the post
    await prisma.forumPost.delete({
      where: { id }
    });

    res.json({ message: 'Post deleted successfully by admin' });
  } catch (error) {
    next(error);
  }
});

// Create comment
router.post('/posts/:id/comments', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentData = commentSchema.parse(req.body);
    
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
        ...commentData,
        postId: id,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            name: true
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
    next(error);
  }
});

// Delete comment (admin or author only)
router.delete('/comments/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const comment = await prisma.forumComment.findUnique({
      where: { id }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is admin or comment author
    if (req.user.role !== 'ADMIN' && comment.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await prisma.forumComment.delete({
      where: { id }
    });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Admin: Delete any comment
router.delete('/comments/:id/admin', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const comment = await prisma.forumComment.findUnique({
      where: { id }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await prisma.forumComment.delete({
      where: { id }
    });

    res.json({ message: 'Comment deleted successfully by admin' });
  } catch (error) {
    next(error);
  }
});

export const forumRouter = router; 