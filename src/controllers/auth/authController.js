const authService = require('../../services/auth/authService');
const authController = {};

authController.login = async (req, res) => {
  try {
    const result = await authService.authenticate(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


module.exports = authController;
