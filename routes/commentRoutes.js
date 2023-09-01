import { Router } from 'express';
import {
  create_comment,
  get_blog_comments,
} from '../controllers/commentController.js';
import { commentFormValidation, validate } from '../middleware/validator.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  commentFormValidation(),
  validate,
  create_comment
);

router.get('/:id', verifyToken, get_blog_comments);

export default router;
