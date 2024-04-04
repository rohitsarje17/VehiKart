// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');

router.post('/signup', signup);

router.post('/login', login);

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.patch('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
