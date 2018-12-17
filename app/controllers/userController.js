//todo why require('/app/models/user') meet error?
const User = require('../models/user');
const {respond} = require('../utils');
const path = require('path');
exports.index = function (req, res) {
    User.list(function (err, users) {
        userList = users;
        if (err){
            return respond(res, 'users/index', {
                error: 'get user data failed'
            } )
        }
        res.render('users/index', {
            title: 'CRUD demo',
            users: users
        })
    })

}

exports.create = function (req, res) {
    const user = new User(req.body);
    user.save(function (err, user) {
        console.log(req.body);
        if (err) {
            return respond(res,  'users/add',{
                error: err.toString()
            }, 422)

        }
        respond(res, 'users/add',{
            success: 'create user successfully!'
        }, 200)
    })
}

// exports.add = function(req, res) {
    //note: don't use render method if the page use art-template for browser,
    // it will render as a template in server and replace template variable placeholder,
    // for example, {{error}}. Then if want to render the variable dynamically in browser
    // after ajax callback , it will not work. So can use redirect method or app.use() middleware=>no need to config route for this(details pls see in express.js)

    // res.render('users/add',{})
    // res.redirect('/app/views/users/add.html');
// }
