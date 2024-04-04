import express from 'express';
import {
  login,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  signup
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.get('/users', getAllUsers);

userRouter.get('/users/:id', getUserById);

userRouter.patch('/users/:id', updateUser);

userRouter.delete('/users/:id', deleteUser);

export default userRouter;
