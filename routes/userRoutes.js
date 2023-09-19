import express from 'express';
import {
  log_in,
  update_username,
  update_password,
} from '../controllers/userController.js';
import {
  usernamePasswordValidation,
  updatePasswordValidation,
  validate,
} from '../middleware/validator.js';
import verifyToken from '../middleware/verifyToken.js';
import verifyCredentials from '../middleware/verifyCredentials.js';

const routes = express.Router();

routes.post(
  '/',
  usernamePasswordValidation(),
  validate,
  verifyCredentials,
  log_in
);

routes.patch(
  '/username',
  usernamePasswordValidation(),
  validate,
  verifyCredentials,
  verifyToken,
  update_username
);

routes.patch(
  '/password',
  updatePasswordValidation(),
  validate,
  verifyCredentials,
  verifyToken,
  update_password
);

export default routes;
