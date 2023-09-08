import { Router } from 'express';
import {
  get_all_likes,
  like_blog,
  like_comment,
} from '../controllers/likeController.js';
import verifyToken from '../middleware/verifyToken.js';
import {
  likeBlogValidation,
  likeCommentValidation,
  validate,
} from '../middleware/validator.js';
import {
  checkDuplicateBlogLike,
  checkDuplicateCommentLike,
} from '../middleware/checkDuplicateLike.js';

const router = Router();

router.get('/', get_all_likes);

router.patch(
  '/blog',
  verifyToken,
  likeBlogValidation(),
  validate,
  checkDuplicateBlogLike,
  like_blog
);

router.patch(
  '/comment',
  verifyToken,
  likeCommentValidation(),
  validate,
  checkDuplicateCommentLike,
  like_comment
);

export default router;
