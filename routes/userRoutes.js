import express from 'express';
import { user_register, user_log_in } from '../controllers/userController.js';
import { registerFormValidation, validate } from '../middleware/validator.js';

const routes = express.Router();

routes.post('/register', user_register);

routes.post('/log-in', user_log_in);

// Later routes to be added

// routes.get('/my-account', user_get_my_account);

// routes.post('/log-out', logOut());

// routes.put('/make-admin', user_put_admin);

export default routes;
