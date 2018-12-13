module.exports = {
    respond: respond
}
function respond(res, template, templateData, status) {
    // http://expressjs.com/zh-cn/api.html#res.format
    res.format({
        'text/html': function () {
            res.render(template, templateData);
        },
        'application/json': function () {
            if (status) return res.status(status).json(templateData);
            //res.json like res.send
            res.json(templateData);
        },
        default: function () {
            res.status(406).send('Not Acceptable');
        }
    })
}