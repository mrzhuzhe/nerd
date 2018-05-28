# Nerd

> A Project Template with some webpack config and .rc
> Nerd is not cool , Nerd is Usefull

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

# 目标实现的功能
1. eslint vmrc  eslintignore editorconfig
2. babel配置 postcss/pretty.js(待补充)
3. static文件夹为静态文件模板/config为配置参数
4. dev-server /hot -module/ less (BEM )/babel
5. code split 大文件单独异步import /common trunk 公共文件单独vendor runtime单独vendor / cssnano

# ToDo
1. 用lerma做私有包管理
2. 整合到vue-cli的脚手架中


# 依赖包的说明

``` bash
  "devDependencies": {
     # babel config start
    "babel-core": "^6.26.3",    // babel 6.X 版本核心
    "babel-loader": "^7.1.4",   // babel 6.0 的 webpack loader
    "babel-plugin-syntax-jsx": "^6.18.0",   // babel 插件支持 jsx 核心语法 
    "babel-plugin-transform-runtime": "^6.23.0",    // babel 6.X 版本 的 runtime polyfill
    "babel-plugin-transform-vue-jsx": "^3.7.0",     // babel 插件支持 jsx 核心语法
    "babel-preset-env": "^1.7.0",           //  babel 语法转义支持版本的插件
    "babel-preset-stage-2": "^6.24.1",      //  babel emac stage-2 的语法转义
    # babel config end 
    
    "body-parser": "^1.18.3",
    "chalk": "^2.4.1",                      //  在bash 中更改显示颜色
    "connect-history-api-fallback": "^1.5.0",   //  在history.back 异常是返回首页
    "copy-webpack-plugin": "^4.5.1",    // webpack 复制文件（夹）插件
    "css-loader": "^0.28.11",   //  css 解析器
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.16.3",       // 后端中间件框架
    "extract-text-webpack-plugin": "^3.0.2",    //     提取vue 文件中的 css
    "friendly-errors-webpack-plugin": "^1.7.0",     
    "fs-extra": "^6.0.1",       
    "glob": "^7.1.2",   // 用于匹配和搜索文件
    "html-webpack-harddisk-plugin": "^0.2.0",   //  用于把 webpack 生成在内存中的文件保存到硬盘
    "html-webpack-plugin": "^3.2.0",        //  webpack html 操作插件
    "http-proxy-middleware": "^0.18.0",     //  用于在webpack-dev-server中将请求代理到对应地址
    "less": "^3.0.4",   // less
    "less-loader": "^4.1.0",    // webpack less loader
    "optimize-css-assets-webpack-plugin": "^4.0.1", 
    // 解决 extract-text-webpack-plugin 插件产生的css 合并文件中有大量重复css的问题 
    "ora": "^2.1.0",    // 在bash中产生一个原地打转的loading提示
    "raw-loader": "^0.5.1",
    "semver": "^5.5.0",
    "vue-loader": "^15.2.0",    // webpack vue loader
    "vue-template-compiler": "^2.5.16", // webpack vue 模板编译器
    "webpack": "^4.8.3",    
    "webpack-bundle-analyzer": "^2.13.0",   // webpack 打包分析器
    "webpack-dev-middleware": "^3.1.3",     // webpack dev server
    "webpack-hot-middleware": "^2.22.2",    // webpack dev server 的热更新插件
    "webpack-merge": "^4.1.2"   // 一个函数 用来 把多个 webpcakconfig 合并成一个
  }
```
