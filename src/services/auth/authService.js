const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/auth/UserModel');

const authService = {};

authService.authenticate = async (params) => {
    const { email, password } = params;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { token };
};

module.exports = authService;
