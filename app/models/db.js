//it will import the index.js which is in the config directory
const config = require('../../config'),
    mongoose = require('mongoose'),
    dbURI = config.db

function connect() {
    //connection pool config:
    // Each connection, whether created with mongoose.connect or mongoose.createConnection are all backed by an internal configurable connection pool defaulting to a maximum size of 5.
    // Adjust the pool size using your connection options.
    // it will create connection and connect.
    var dbConnectOptions = {poolSize: 5, useNewUrlParser: true, server: {socketOptions: {keepAlive: true}}};
    var conn = mongoose.createConnection(dbURI, dbConnectOptions)

    conn
        .on('connected', function () {
            console.log('Mongoose connect successfully to open ' + dbURI)
        })
        .on('disconnected', function () {
            console.log('Mongoose default connection disconnected')
            //retry connect
            connect()
        })
        .on('error', function (err) {
            console.log('Mongoose default connection error: ' + err)
        })

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        conn.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        })
    })
    return conn
}

var conn = connect()

module.exports = conn