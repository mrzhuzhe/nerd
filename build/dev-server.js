require('./check-versions')()

var fs = require('fs-extra');
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var bodyParser = require('body-parser')
var mock = require('./mock');
var config = require('../config')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable


var app = express()
var server = require('http').createServer(app);

var compiler = webpack(webpackConfig)


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})



var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes

//compiler.plugin('compilation', function (compilation) {
/* compiler.hooks.compilation.tap('hotReloadAfterHtmlEmit', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
}) */

compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
  hotMiddleware.publish({
        action: 'reload'
  });
});

//compiler.plugin("done", function(statsResult) {
/* compiler.hooks.done.tap('hotReloadComplierDone', statsResult => {
    hotMiddleware.publish({ action: 'reload' })
}); */

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
// 调用文件遍历方法
var utils = require('./utils')
var _fList = utils.getEntries('./src/views/**/main.js');
var _reg = new RegExp("^\/(" + Object.keys(_fList).join("|") + ")");
app.get(_reg, function(req, res, next) {
    var _paths = req.url.split('/');
    var _baseUrl = '../dist/' + _paths[1] + '/index.html';
    if (req.get('x-requested-with') === 'XMLHttpRequest') {
        next();
        return;
    }
    res.end(fs.readFileSync(path.resolve(__dirname, _baseUrl), 'utf8'));
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// console.log(staticPath);
app.use(staticPath, express.static('./static'))

app.use(mock);
var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
