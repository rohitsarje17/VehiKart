import express from 'express';
import {
  login,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  signup
} from '../controllers/userController';

router.post('/signup', signup);

router.post('/login', login);

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.patch('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
