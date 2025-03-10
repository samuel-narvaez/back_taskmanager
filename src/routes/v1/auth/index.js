const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
module.exports = app => {
    app.use('/api/user', userRoute);
    app.use('/api/auth', authRoute);
}