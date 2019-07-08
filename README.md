# Nerd

> A Project Template with some webpack config and .rc
> Nerd is not cool , Nerd is Usefull

### ChangeLog 2019/07/08
 hey 宝贝们 nerd 0.0.3 更新了
 1. 修复了 dev-server 中取文件路径写死的问题  现在改用获取所有本地文件夹下路径为express路由
 ``` bash
 // 取到的路径 如 example | performance | ...
 utils.getEntries('./src/views/**/main.js')
 ```
 2. 补充了url-loader 和 svg-sprite-loader
 3. 增加了 `ProgressBarPlugin` 和 测试环境下作用域提升 `concatenateModules`
 4. 关闭了 babel 的 `comment: false` 导致注释中语法糖失效的问题
 5. 增加了 mock cgi 的功能 `./build/mock.js` 和 ajax 的功能 `./src/utils/ajax.js` 调用例子在 `./src/views/performace/index/index.vue`中

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 实现的功能
1. 项目基础设置: vmrc/gitignore
2. babel: .rc 和 babel runtime配置
3. eslint: eslint 配置 和 自动lint工具 pretter.js
4. dev-server: 本地express开发服务器 和 mock.js 本地模拟cgi
5. webpack基本配置：区分环境，各种loader配置, 
5. webpack打包过程：commontrunk公共文件提取, css提取和优化, bundle分析等
6. code-split: 在路由中使用import 异步加载文件，做分包
7. 自定义打包过程：作用域提升插件 和 在webpack中hook自定义过程
8. 性能优化：dll 多线程打包等 （开发中）

# ToDo
1. DLLPlugin 性能测试后加进来
2. HappyPack 性能测试后加进来

# 依赖包的说明

``` bash
"devDependencies": {
   # babel config
  "babel-core": "^6.26.3",    // babel 6.X 版本核心
  "babel-loader": "^7.1.4",   // babel 6.0 的 webpack loader
  "babel-plugin-syntax-jsx": "^6.18.0",   // babel 插件支持 jsx 核心语法
  "babel-plugin-transform-runtime": "^6.23.0",    // babel 6.X 版本 的 runtime polyfill
  "babel-plugin-transform-vue-jsx": "^3.7.0",     // babel 插件支持 jsx 核心语法
  "babel-preset-env": "^1.7.0",           //  babel 语法转义支持版本的插件
  "babel-preset-stage-2": "^6.24.1",      //  babel emac stage-2 的语法转义

  # 控制台输出
  "chalk": "^2.4.1",                      //  在bash 中更改显示颜色 ( windows无效 )
  "commander": "^2.15.1",                 //  TJ大神的参数解析器 https://github.com/tj/commander.js/ 用于 ./pretty.js
  "ora": "^2.1.0",    // 在bash中产生一个原地打转的loading提示 ( windows无效 )

  # express
  "express": "^4.16.3",       // 后端中间件框架
  "body-parser": "^1.18.3",               // 高版本 express 里 req.body 解析器
  "connect-history-api-fallback": "^1.5.0",   //  在history.back 异常是返回首页 仅用于dev-server

  # eslint     
  "eslint": "^4.19.1",            //  一生之敌
  "eslint-plugin-vue": "^4.5.0",  // vue template 和 script 支持 eslint
  "jsonschema": "^1.2.4",  // ./build/mock.js 中用于格式化json

  # loader
  "css-loader": "^0.28.11",   //  css 解析器
  "url-loader": "^1.1.2",     //  文件loader
  "vue-loader": "^15.2.0",    // webpack vue loader
  "vue-template-compiler": "^2.6.8",
  "less": "^3.0.4",   // less
  "less-loader": "^4.1.0",    // webpack less loader
  "raw-loader": "^0.5.1",     // 直接原样读取文件
  "svg-sprite-loader": "^4.1.6",    //   合并svg到js里

  # 文件和路径操作
  "glob": "^7.1.2",   // 用于匹配和搜索文件
  "fs-extra": "^6.0.1",     // 文件操作加强版，解决了原生文件操作时如判空等的一些蛋疼的问题  https://github.com/jprichardson/node-fs-extra
  "semver": "^5.5.0",
  "staged-git-files": "^1.1.1",       // eslint 时 获取本地staged的文件

  # webpack config
  "webpack": "^4.8.3",    
  "webpack-bundle-analyzer": "^2.13.0",   // webpack 打包分析器
  "webpack-dev-middleware": "^3.1.3",     // webpack dev server
  "webpack-hot-middleware": "^2.22.2",    // webpack dev server 的热更新插件
  "webpack-merge": "^4.1.2"   // 一个函数 用来 把多个 webpcakconfig 合并成一个
  "friendly-errors-webpack-plugin": "^1.7.0",     // 自定义日志级别 ( windows 下不可用)  https://github.com/geowarin/friendly-errors-webpack-plugin
  "copy-webpack-plugin": "^4.5.1",    // webpack 复制文件（夹）插件
  "eventsource-polyfill": "^0.9.6",     // [待删除]低版本浏览器支持长连接 用于 webpack-hot-middleware   https://github.com/amvtek/EventSource
  "html-webpack-harddisk-plugin": "^0.2.0",   //  用于把 webpack 生成在内存中的文件保存到硬盘
  "html-webpack-plugin": "^3.2.0",        //  webpack html 操作插件
  "http-proxy-middleware": "^0.18.0",     //  用于在webpack-dev-server中将请求代理到对应地址
  "mini-css-extract-plugin": "^0.4.0",  //  代替 extract-text-webpack-plugin 从js 中提取cs
  "optimize-css-assets-webpack-plugin": "^4.0.1",
  // 解决 mini-css-extract-plugin 插件产生的css 合并文件中有大量重复css的问题
  "progress-bar-webpack-plugin": "^1.12.1",   //  打包过程进度条 ( windows 下不可用)
  "uglifyjs-webpack-plugin": "^2.0.1",    // 开启parallel模式 https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#parallel

  # end
```
