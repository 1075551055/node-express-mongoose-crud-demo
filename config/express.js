/**
 * Module dependencies
 */
const bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    config = require('./index')

module.exports = function (app) {
    // 1.If want to access the static resources, must expose them, or it will occur 'cannot get 404' error
    // 2.Call express middleware by 'app.use' method, the middleware can be understood as an encapsulated js function. From the client sending the request to the
    //  response stage, different middleware can be used to coordinate the completion of request process.
    // 3.__dirname can dynamically gets the directory where the current server.js(node server.js launcher) resides.
    // __dirname动态获取当前文件相对server.js(node server.js启动程序)所在的绝对目录路径，这样有一个好处：无论在哪启动server.js都能获取到当前文件相对server.js所在的绝对目录，
    // 假如不是在根目录去执行node server.js,那么类似'./views'这样的路径查找则会是匹配到当前执行该命令的路径，所以取决于node server.js命令执行所在的目录,这样通过相对路径来定位的话
    // 往往就会出现问题了,而通过__dirname就能获取到当前文件相对server.js的绝对路径,无论node server.js命令在哪执行。
    // 读取文件的时候才会遇到类似的路径问题，express.static底层会去读取文件，而对于require来说则不会出现这种问题，所以可以使用相对路径。
    // 4.当请求访问/的时候，会到app/views下面寻找资源,默认是寻找index.html
    // app.use('/', express.static(path.join(__dirname, 'app/views')))

    //当url中包含/public，那么会请求访问public目录下面的资源
    app.use('/public', express.static(path.join(config.root, '/public')))
    app.use('/node_modules', express.static(path.join(config.root, '/node_modules')))
    app.use('/app/views', express.static(path.join(config.root, '/app/views')))


    //解析请求的数据，需要使用body-parser，否则获取不到data
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    /**
    *Redirect middleware
    */
    //当访问/users/add的时候，会返回add.html
    // app.use('/users/add', express.static(path.join(__dirname, '../app/views/users/add.html')))
    app.use('/users/add', function (req, res, next) {
        res.sendFile(path.join(config.root, 'app/views/users/add.html'));
    })

    /**
     * template engine settings: art-template
     * refer to :
     * https://expressjs.com/zh-cn/guide/using-template-engines.html
     * https://aui.github.io/art-template/express/
     */
    //if template engine name is the same as the web page file name, no need to config this settings,
    //like jade template engine, only config 'app.set('view engine', 'jade')' is enough, and then
    //no need to write the file extension when use app.render. But except for art-template
    app.engine('html', require('express-art-template'))
    app.set('view engine', 'html')
    //default view path is 'views' which is in the same directory as server.js is
    app.set('views', path.join(config.root, 'app/views'))

}