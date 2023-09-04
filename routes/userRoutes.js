import express from 'express';
import {
  user_authenticate,
  user_sign_up,
  user_log_in,
} from '../controllers/userController.js';
import {
  usernamePasswordValidation,
  confPasswordValidation,
  validate,
} from '../middleware/validator.js';
import verifyToken from '../middleware/verifyToken.js';

const routes = express.Router();

routes.get('/authenticate', verifyToken, user_authenticate);

routes.post(
  '/sign-up',
  usernamePasswordValidation(),
  confPasswordValidation(),
  validate,
  user_sign_up
);

routes.post('/log-in', usernamePasswordValidation(), validate, user_log_in);

// Later routes to be added

// routes.get('/my-account', user_get_my_account);

// routes.put('/make-admin', user_put_admin);

export default routes;
