import { Router } from 'express';
import { get_all_blogs, create_blog } from '../controllers/blogController.js';

const router = Router();

router.get('/', get_all_blogs);

router.post('/', create_blog);

export default router;
