import { Router } from 'express';
import {
  get_all_blogs,
  create_blog,
  get_single_blog,
  delete_blog,
  update_published,
  update_blog,
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import { createFormValidation, validate } from '../middleware/validator.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.get('/', get_all_blogs);

router.post(
  '/',
  verifyToken,
  upload.single('image'),
  createFormValidation(),
  validate,
  create_blog
);

router.get('/:id', verifyToken, get_single_blog);

router.delete('/:id', verifyToken, delete_blog);

router.patch('/', verifyToken, update_published);

router.put(
  '/',
  verifyToken,
  upload.single('image'),
  createFormValidation(),
  validate,
  update_blog
);

export default router;
