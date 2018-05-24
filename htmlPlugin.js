var config  = require('../config/index');
function MyPlugin(options) {
  // Configure your plugin with options...
  this.env = options.env;
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  var that = this;
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        //console.log(htmlPluginData);
        // if (that.env === 'dev') {
        //     // htmlPluginData.assets.css.push('http://localhost:8085/vhtml.css')
        //     // htmlPluginData.assets.js.splice(1, 0, 'http://localhost:8085/vhtml.js')
        //     // htmlPluginData.assets.js.splice(1, 0, 'http://localhost:8085/vue.js')
        // } else {
        //console.log(htmlPluginData.assets)

        htmlPluginData.assets.css = htmlPluginData.assets.css.map((css)=>{
            return '//<%== _domain %><%== locals.base %>' + css +  '<%== locals.lbfConf.comboSuffix %>';
        });
        htmlPluginData.assets.js = htmlPluginData.assets.js.map((js)=>{
            return '//<%== _domain %><%== locals.base %>' + js  +  '<%== locals.lbfConf.comboSuffix %>' ;
        });

        // htmlPluginData.assets.js.unshift(`//<%== locals.vhtml %>vhtml.js<%== locals.lbfConf.comboSuffix %>`)
        // htmlPluginData.assets.js.unshift(`//<%== locals.vhtml %>vue.${that.env==='dev' ? '' : 'prod'}js<%== locals.lbfConf.comboSuffix %>`)


    //   console.log('----------------')
    //   console.log(htmlPluginData);
      callback(null, htmlPluginData);
    });

    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {



    //   console.log('----------------')
    //   console.log(htmlPluginData);
      callback(null, htmlPluginData);
    });


  });

};

module.exports = MyPlugin;
