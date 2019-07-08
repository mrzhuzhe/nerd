var path = require('path')
var config = require('../config')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var glob = require('glob');
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      /* return MiniCssExtractPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      }) */
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.getEntries = function (globPath) {
  var entries = {}

  glob.sync(globPath).forEach(function (entry) {
    let tmp;
    for (let i = 3; i < 9; i++) {
        tmp = entry.split('/').splice(-i);
        if (tmp[0] === 'views') {
            i -= 1
            tmp = entry.split('/').splice(-i);
            break
        }
    }

    tmp.pop();
    var moduleName = `${tmp.join('/')}`;
    entries[moduleName] = entry
  });
  return entries;
}
