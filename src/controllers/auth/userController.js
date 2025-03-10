const userService = require('../../services/auth').userService;
userController = {};

userController.create = async (req, res) => {
    try {
        const user = await userService.createService(req.body);
        res.status(201).json({ status: "success", user });
    } catch (error) {
        console.error("Error in createUser: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = userController;