import { Router } from 'express';
import {
  get_all_blogs,
  create_blog,
  get_single_blog,
  delete_blog,
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';

const router = Router();

router.get('/', get_all_blogs);

router.post('/', upload.single('image'), create_blog);

router.get('/:id', get_single_blog);

router.delete('/:id', delete_blog);

export default router;
