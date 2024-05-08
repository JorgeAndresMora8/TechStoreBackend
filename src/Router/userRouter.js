import { Router } from "express";
import { getUsers, deleteUser, updateUser } from "../Controllers/userController.js"
import authMiddleware from "../utils/authMiddleware.js";

export const userRouter = Router(); 

userRouter.use(authMiddleware)

userRouter.get('/', getUsers)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)