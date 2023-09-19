import express from 'express';
import { authenticate, create } from '../controllers/authController.js';
import checkDuplicateUsername from '../middleware/checkDuplicateUsername.js';
import {
  usernamePasswordValidation,
  confPasswordValidation,
  validate,
} from '../middleware/validator.js';

import verifyToken from '../middleware/verifyToken.js';

const routes = express.Router();

routes.get('/', verifyToken, authenticate);

routes.post(
  '/',
  checkDuplicateUsername,
  usernamePasswordValidation(),
  confPasswordValidation(),
  validate,
  create
);

export default routes;
