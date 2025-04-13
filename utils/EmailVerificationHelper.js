const crypto = require("crypto");
const EmailVerification = require("../models/EmailVerification");
const User = require("../models/User");

// Created to manage email verification tokens for users
// This model is used to manage email verification tokens for users
async function generateEmailVerification(userId, userEmail) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await EmailVerification.create({
        user_id: userId,
        token: token,
        expires_at: expiresAt
    });

    await sendVerificationEmail(userEmail, token);
    return token;
}

// send mail to user with the verification link
async function sendVerificationEmail(email, token) {
    const verificationUrl = `https://my-blog.com/verify-email?token=${token}`;

    console.log(`Invia email a ${email} -> ${verificationUrl}`);
}

// Token verification function
async function verifyEmailToken(token) {
    const record = await EmailVerification.findOne({ where: { token } });

    if (!record || record.expires_at < new Date()) {
        throw new Error("Token non valido o scaduto");
    }

    await User.update(
        { email_verified: true },
        { where: { id: record.user_id } }
    );

    await EmailVerification.destroy({ where: { id: record.id } });

    return true;
}

module.exports = {
    generateEmailVerification,
    verifyEmailToken
};
