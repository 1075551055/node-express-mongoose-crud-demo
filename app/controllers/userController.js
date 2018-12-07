
exports.index = function (req, res) {
    res.render('users/index', {
        title: 'CRUD demo'
    })
}