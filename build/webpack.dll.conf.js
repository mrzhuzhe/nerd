const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')
const src = path.resolve(__dirname, '../src'); // 源码目录

const vendors = [
    'vue-router', 'axios'
]

const webpackConfig = {
    mode: "production",
    entry: {
        vendor: vendors,
    },
    output: {
        path: path.resolve(__dirname, '../static/direct/dll'),
        // filename: '[name].dll.js',
        filename: '[name].dll.js',
        library: '[name]_[hash]',
        libraryTarget: 'this'
    },
    /* externals: {
        vue: 'Vue',
        'vhtml-ui': 'vhtml'
    }, */
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: false
                }
            })
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            context: process.cwd(),
            path: path.join(path.resolve(__dirname, '../static/direct/dll'), '[name]-manifest.json'),
            // path: path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'js', '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     output: {
        //         comments: false
        //     },
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};

module.exports = webpackConfig;
