const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const Auth = require('../middleware/authMiddleware');
const AuthController = require('../controllers/AuthController');

// 🔐 Register
router.post('/register', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], AuthController.registerUser);

// 🔐 Login
router.post('/login', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').notEmpty()
], AuthController.loginUser);

// 👤 Get current user
router.get('/me', Auth, AuthController.getMe);

// 🔄 Refresh Token
router.get('/refresh', Auth, AuthController.refreshToken);

// 🚪 Logout
router.get('/logout', Auth, AuthController.logoutUser);

// 🔁 Password Reset Flow
router.post('/forgot-password', [
  check('email', 'Valid email is required').isEmail()
], AuthController.forgotPassword);

router.post('/reset-password/:token', [
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], AuthController.resetPassword);

// ✉️ Email Verification
router.post('/verify-email', [
  check('email', 'Valid email is required').isEmail()
], AuthController.verifyEmail);

router.post('/verify-email/:token', AuthController.verifyEmailToken);
router.post('/resend-verification-email', Auth, AuthController.resendVerificationEmail);

// 🛠️ Profile Updates
router.post('/update-profile', Auth, [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Valid email is required').isEmail()
], AuthController.updateProfile);

router.post('/update-password', Auth, [
  check('currentPassword', 'Current password is required').notEmpty(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], AuthController.updatePassword);

// ⚠️ Account Deactivation / Deletion
router.post('/deactivate-account', Auth, AuthController.deactivateAccount);
router.post('/activate-account', Auth, AuthController.activateAccount);
router.post('/delete-account', Auth, AuthController.deleteAccount);

module.exports = router;
