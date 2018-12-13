/**
 * Module dependencies
 */
const express = require('express')
    , path = require('path')
    , db = require('./app/models/db')
    //todo read model by fs.readdirSync
    // , User = require('./app/models/user')
    , app = express()

/**
 * bootstraps routes and express.js
 */
require('./config/express')(app)
require('./config/routes/userRoute')(app)

/**
 * app start once db connection open
 */
db.once('open', function () {
    var port = process.env.PORT || 3000
    app.listen(process.env.PORT || 3000, function () {
        console.log("App started on port " + port)
    })
})
