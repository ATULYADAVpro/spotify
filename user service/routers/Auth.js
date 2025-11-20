import { Router } from 'express'
import authController from '../controllers/authController.js';
const authRouter = Router();

// define routes
authRouter.post('/register', authController.registerUser)
// authRouter.post('/login', authController.loginUser)

export default authRouter;