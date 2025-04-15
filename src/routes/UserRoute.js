const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/:id', UserController.getUserDetails);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
