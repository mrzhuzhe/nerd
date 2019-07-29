var config  = require('../config/index');
function MyPlugin(options) {
  // Configure your plugin with options...
  this.env = options.env;
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  var that = this;
  compiler.hooks.compilation.tap('MyPlugin', compilation => {
  //  compiler.plugin('compilation', function(compilation) {

    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('convertFilePathBeforeProcess', (htmlPluginData, cb) => {
     // Do stuff
     // console.log(htmlPluginData.assets)
     cb(null, htmlPluginData);
    })

    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('onvertFilePathAfterProcess', (htmlPluginData, cb) => {
     // Do stuff
     // console.log(htmlPluginData.assets)
     cb(null, htmlPluginData);
    })

  });

};

module.exports = MyPlugin;
