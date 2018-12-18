const userController = require('../../app/controllers/userController')
module.exports = function (app) {
    app.param('id', userController.load);
    //todo: Router using
    //app.get, post, put, delete will call app.use, they are route middleware.
    app.get('/', userController.index);

    app.post('/users', userController.create);

    app.get('/users/:id/edit', userController.edit);
    //todo add authorization
    app.put('/users/:id', userController.update);

    app.delete('/users/:id', userController.destroy);

    //global error handler middleware: must has 4 params, when call next(error) in other middleware,
    // it will turn into this middleware and skip other middleware for the same request url
    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).render('422', { error: err.stack });
            return;
        }

        // error page
        res.status(500).render('500', { error: err.stack });
    })

    //global 404 handler middleware: assume 404 since no middleware responded
    app.use(function (req, res) {
        const payload = {
            url: req.originalUrl,
            error: 'Page not found'
        }
        if (req.accepts().find((value) => value === 'application/json')) return res.status(404).json(payload);
        res.status(404).render('404', payload);
    })
}