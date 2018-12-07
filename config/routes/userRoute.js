const userController = require('../../app/controllers/userController')
module.exports = function (app) {
    app.get('/', userController.index)

    // app.post('/user', (req, res)=> {
    //     res.send({'status': -1})
    // })
}