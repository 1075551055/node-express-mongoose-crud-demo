/**
 * Module dependencies
 */
const path = require('path'),
    development = require('./env/development'),
    test = require('./env/test'),
    production = require('./env/production')

const defaults = {
    //.. means the upper level directory: project root path
    root: path.join(__dirname, '..')
}
module.exports = {
    development: Object.assign(development, defaults),
    test: Object.assign(test, defaults),
    production: Object.assign(production, defaults)
}[process.env.NODE_ENV || 'development'] //if not set env variable NODE_ENV, will use 'development' as default config