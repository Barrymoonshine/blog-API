import { Router } from 'express';
import { get_all_likes, like_doc } from '../controllers/likeController.js';
import verifyToken from '../middleware/verifyToken.js';
import { likeValidation, validate } from '../middleware/validator.js';
import checkDuplicateLike from '../middleware/checkDuplicateLike.js';

const router = Router();

router.get('/', get_all_likes);

router.post(
  '/',
  verifyToken,
  likeValidation(),
  validate,
  checkDuplicateLike,
  like_doc
);

export default router;
