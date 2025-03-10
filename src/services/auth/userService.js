const UserModel = require('../../models/auth/UserModel.js')

userService = {};
userService.createService = async (params) => {
    const { name, email, password } = params;
    try {
        const task = new UserModel({
            name,
            email,
            password
        });
        return await task.save();
    } catch (error) {
        console.log(error.message);
        throw new Error('Error saving user');
    }
}


module.exports = userService;