import { authenticate } from './authenticate.js';
import { logger } from '../lib/log.js';

export const admin = (req, res, next) => {
  authenticate(req, res, (err) => {
    if (err) {
      logger.error('Admin verification failed', {
        error: err.message,
        userId: req.user?.id,
        ip: req.ip
      });
      return next(err);
    }
    
    if (req.user.role !== 'ADMIN') {
      logger.warn('Admin access denied', {
        userId: req.user.id,
        role: req.user.role,
        ip: req.ip
      });
      return res.status(403).json({ 
        message: 'Forbidden: Admin access required' 
      });
    }
    
    logger.info('Admin access granted', {
      userId: req.user.id,
      ip: req.ip
    });
    next();
  });
};
