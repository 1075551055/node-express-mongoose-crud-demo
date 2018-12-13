const userController = require('../../app/controllers/userController')
module.exports = function (app) {
    //todo: Router using
    app.get('/', userController.index);
    // app.get('/users/add', userController.add);
    app.post('/users', userController.create);

    // app.post('/user', (req, res)=> {
    //     res.send({'status': -1})
    // })
}