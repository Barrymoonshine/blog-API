import { Router } from 'express';
import {
  create_comment,
  get_blog_comments,
  delete_comment,
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

// Get blog comment route not protected as user can view comments without being logged in
router.get('/:id', get_blog_comments);

router.delete('/:id', verifyToken, delete_comment);

export default router;
