const UserController = require('../controllers/user.controller')


module.exports = app => {
    app.post('/api/register', UserController.registerUser)
    app.post('/api/login', UserController.loginUser)
    app.get('/api/logout', UserController.logoutUser)
    app.get('/api/user-current', UserController.getLogged);
}