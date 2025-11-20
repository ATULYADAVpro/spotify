import { Router } from 'express'
import authController from '../controllers/authController.js';
import isAuth from '../middlewares/auth.js';
const authRouter = Router();

// define routes
authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)
authRouter.get('/me',isAuth, authController.userProfile)

export default authRouter;