const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers); // New route for getting all users

module.exports = router;