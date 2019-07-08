var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//  var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var env = config.build.env
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
      }).concat([
          {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
            query: {
              limit: 1,
              name: utils.assetsPath(`img/[name]|[path]|.[ext]`),
              outputPath: function(url){
                   var pathReg = /\|.*\|/;
                   url = url.replace(pathReg, function(whole){
                       return ''
                   })
                  return url;
              },
              publicPath: function(url) {
                    var pathReg = /\|.*\|/;
                    var replace;
                    replace = '../img';

                    url = url.replace(pathReg, function(whole){
                        return ''
                    })
                    url = url.replace(/^static\/img/, replace)
                    return url
                }
            },
            include: /nobase64/
          }, {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              //name: utils.assetsPath(`img/[name].[${config.prefix}].[ext]`),
              name: utils.assetsPath(`img/[name]|[path]|.[ext]`),
              //useRelativePath: true,
              outputPath: function(url){
                   var pathReg = /\|.*\|/;

                   url = url.replace(pathReg, function(whole){
                       return ''
                   })
                  return url;
              },
              publicPath: function(url) {

                    var pathReg = /\|.*\|/;
                    var replace;
                    replace = '../img';

                  url = url.replace(pathReg, function(whole){
                      return ''
                  })

                  url = url.replace(/^static\/img/, replace)
                  return url
              }
            },
            exclude: /icons|nobase64/
          }
      ])
  },
  mode: "production",
  externals: {
      vue: 'Vue'
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name].js`),
    chunkFilename: utils.assetsPath(`js/[name]-[chunkhash].js`),
    // library: 'webpackNumbers',
    // libraryTarget: 'this'
  },

  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //  new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    /* convert it to webpack 4
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    */
    //copy custom static assets
    /* new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/base.css'),
        to: 'static/css/base.css',
        ignore: ['.*']
      }

    ]) */
  ],
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false
          },
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          autoprefixer: {
            browsers: 'last 2 version, IE > 8'
          }
        }
      })
    ],
    /* any required modules inside node_modules are extracted to vendor
       extract webpack runtime and module manifest to its own file in order to
       prevent vendor hash from being updated whenever app bundle is updated */
    splitChunks: {
      cacheGroups: {
          commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all"
          }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
})

/* if (process.env.NODE_ENV_INNER === 'development') {
     webpackConfig.plugins.splice(1,1);
} */

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

var pages = utils.getEntries('./src/views/**/main.js');
for(var page in pages) {
  // 配置生成的html文件，定义路径等
  console.log('page',page)
  var conf = {
    alwaysWriteToDisk: true,
    filename: page + '/index.html',
    template: `!!raw-loader!./src/views/${page}/index.html`, //模板路径
    inject: true,
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports = webpackConfig
