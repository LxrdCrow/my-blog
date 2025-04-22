const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const EmailVerification = require("../models/EmailVerification");
const { sendVerificationEmail } = require("../utils/emailVerificationHelper");
const { Op } = require("sequelize");

const AuthController = {
    async registerUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });

            await sendVerificationEmail(user);

            res.status(201).json({ message: "User registered. Please verify your email." });
        } catch (error) {
            res.status(500).json({ message: "Registration error", error: error.message });
        }
    },

    async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: "Login failed", error: error.message });
        }
    },

    async getMe(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            res.json({ user });
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch user", error: error.message });
        }
    },

    async logoutUser(req, res) {
        res.json({ message: "Logged out (client should discard the token)" });
    },

    async refreshToken(req, res) {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token: newToken });
    },

    async forgotPassword(req, res) {
        res.json({ message: "Password reset link sent (fake for now)" });
    },

    async resetPassword(req, res) {
        res.json({ message: "Password reset (fake for now)" });
    },

    async verifyEmail(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            await sendVerificationEmail(user);
            res.json({ message: "Verification email sent" });
        } catch (error) {
            res.status(500).json({ message: "Error sending email", error: error.message });
        }
    },

    async verifyEmailToken(req, res) {
        res.json({ message: "Email verified (fake for now)" });
    },

    async resendVerificationEmail(req, res) {
        return AuthController.verifyEmail(req, res);
    },

    async updateProfile(req, res) {
        const { name, email } = req.body;
        try {
            await User.update({ name, email }, { where: { id: req.user.id } });
            res.json({ message: "Profile updated" });
        } catch (error) {
            res.status(500).json({ message: "Update failed", error: error.message });
        }
    },

    async updatePassword(req, res) {
        const { currentPassword, newPassword } = req.body;

        try {
            const user = await User.findByPk(req.user.id);
            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) return res.status(400).json({ message: "Wrong current password" });

            const hashed = await bcrypt.hash(newPassword, 10);
            await user.update({ password: hashed });

            res.json({ message: "Password updated" });
        } catch (error) {
            res.status(500).json({ message: "Error updating password", error: error.message });
        }
    },

    async deleteAccount(req, res) {
        try {
            await User.destroy({ where: { id: req.user.id } });
            res.json({ message: "Account deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting account", error: error.message });
        }
    },

    async deactivateAccount(req, res) {
        try {
            await User.update({ active: false }, { where: { id: req.user.id } });
            res.json({ message: "Account deactivated" });
        } catch (error) {
            res.status(500).json({ message: "Error deactivating account", error: error.message });
        }
    },

    async activateAccount(req, res) {
        try {
            await User.update({ active: true }, { where: { id: req.user.id } });
            res.json({ message: "Account activated" });
        } catch (error) {
            res.status(500).json({ message: "Error activating account", error: error.message });
        }
    },

    async sendVerificationEmail(req, res) {
        return AuthController.verifyEmail(req, res);
    },

    async updateProfilePicture(req, res) {
        res.json({ message: "Profile picture updated (fake)" });
    },

    async updateCoverPicture(req, res) {
        res.json({ message: "Cover picture updated (fake)" });
    },

    async updateBio(req, res) {
        const { bio } = req.body;
        try {
            await User.update({ bio }, { where: { id: req.user.id } });
            res.json({ message: "Bio updated" });
        } catch (error) {
            res.status(500).json({ message: "Error updating bio", error: error.message });
        }
    },

    async updateUsername(req, res) {
        const { username } = req.body;
        try {
            await User.update({ username }, { where: { id: req.user.id } });
            res.json({ message: "Username updated" });
        } catch (error) {
            res.status(500).json({ message: "Error updating username", error: error.message });
        }
    },
};

module.exports = AuthController;
