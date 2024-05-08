import { Router } from "express"
import { login, logout, signup } from "../Controllers/authController.js";

export const authRouter = Router(); 

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.post('/logout', logout)