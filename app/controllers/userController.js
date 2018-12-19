//todo why require('/app/models/user') meet error?
const User = require('../models/user');
const {respond,respondOrRedirect} = require('../utils');
const path = require('path');
const {wrap: async} = require('co');

exports.load = async(function* (req, res, next, id){
    try {
        console.log("param method coming!!!");
        req.user = yield User.load(id);
        if (!req.user) return next(new Error('User not found'));
    }catch (err) {
        return next(err);
    }
    next();
})

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
    //will call model validation before save to db, if validation not pass, will return err,
    //can change it to be like saveOrUpdate method: first do the validation in model and then throw error to controller
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

exports.edit = function(req, res){
    // JSON.parse(req.user); cannot parse, it is not a standard json str
    res.render('users/edit', {
        user: req.user
    });
}

exports.update = async(function* (req, res) {
    var user = req.user;
    user = Object.assign(user, req.body);
    try {
        yield user.saveOrUpdate();
        respondOrRedirect(req, res,'/', {},{
            type:'info',
            text: 'update successfully'
        });
    }catch (err) {
        respond(res, `users/${user.id}/edit`, {
            error: err.toString()
        })
    }
})

exports.destroy = async(function* (req, res) {
    yield req.user.remove();
    respondOrRedirect(req,res, '', {
        success: true
    });
})

// exports.add = function(req, res) {
    //note: don't use render method if the page use art-template for browser,
    // it will render as a template in server and replace template variable placeholder,
    // for example, {{error}}. Then if want to render the variable dynamically in browser
    // after ajax callback , it will not work. So can use redirect method or app.use() middleware=>no need to config route for this(details pls see in express.js)

    // res.render('users/add',{})
    // res.redirect('/app/views/users/add.html');
// }
