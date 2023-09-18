import express from 'express';
import {
  user_authenticate,
  user_sign_up,
  user_log_in,
  user_update_username,
  user_update_password,
} from '../controllers/userController.js';
import {
  usernamePasswordValidation,
  confPasswordValidation,
  updatePasswordValidation,
  validate,
} from '../middleware/validator.js';
import verifyToken from '../middleware/verifyToken.js';
import verifyCredentials from '../middleware/verifyCredentials.js';
import checkDuplicateUsername from '../middleware/checkDuplicateUsername.js';

const routes = express.Router();

routes.get('/authenticate', verifyToken, user_authenticate);

routes.post(
  '/sign-up',
  checkDuplicateUsername,
  usernamePasswordValidation(),
  confPasswordValidation(),
  validate,
  user_sign_up
);

routes.post(
  '/log-in',
  usernamePasswordValidation(),
  validate,
  verifyCredentials,
  user_log_in
);

routes.patch(
  '/username',
  usernamePasswordValidation(),
  validate,
  verifyCredentials,
  verifyToken,
  user_update_username
);

routes.patch(
  '/password',
  updatePasswordValidation(),
  validate,
  verifyCredentials,
  verifyToken,
  user_update_password
);

export default routes;
