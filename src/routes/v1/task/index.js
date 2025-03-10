const taskRoute = require('./taskRoute');

module.exports = app => {
    app.use('/api/task', taskRoute);
}