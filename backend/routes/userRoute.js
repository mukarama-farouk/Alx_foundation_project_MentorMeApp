const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers); 

module.exports = router;