process.env.NODE_ENV = 'production'
// process.env.NODE_ENV_INNER = 'development'

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dll.conf')

var spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: true,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
