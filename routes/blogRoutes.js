import { Router } from 'express';
import {
  get_all_blogs,
  create_blog,
  get_single_blog,
  delete_blog,
} from '../controllers/blogController.js';

const router = Router();

router.get('/', get_all_blogs);

router.post('/', create_blog);

router.get('/:id', get_single_blog);

router.delete('/:id', delete_blog);

export default router;
