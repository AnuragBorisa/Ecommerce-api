import express from 'express';
import { signup, login, logout } from '../controllers/authController';
import { signupValidator, loginValidator } from '../validators/authValidators';
import { validateRequest } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/signup', signupValidator, validateRequest, signup);

router.post('/login', loginValidator, validateRequest, login);

router.post('/logout', logout);

export default router;
