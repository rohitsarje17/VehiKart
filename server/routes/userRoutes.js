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

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;
