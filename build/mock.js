"use strict";
let path = require('path');
let url = require('url');
// 验证JSOnN
let Validator = require('jsonschema').Validator;
// mock数据，模拟后端请求数据
let Mock = require('mockjs');

module.exports = function (req, res, next) {
    // // 调用文件遍历方法
    var utils = require('./utils')
    var _fList =  Object.keys(utils.getEntries('./dev/mock/*/'));

    var newfList=[]
    for(var i = 0;i<_fList.length;++i){
        newfList.push(_fList[i].toString().substring(11))
    }
    var _reg = new RegExp("^/(" + newfList.join("|") + ")")
    let pathname = url.parse(req.url).pathname;
    // console.log(pathname, 'pathname_001');

    // let filePath = path.resolve('../mock', pathname);


    function response(data, body) {
        // console.log(data);
        try {
            res.status(data.statusCode).set({
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json'
            })
            // res.setHeader(''+data.statusCode, {
            //     'Content-Length': Buffer.byteLength(body),
            //     'Content-Type': 'application/json'
            // });
            res.end(body);
        } catch (e) {
            console.log(e,'response err');
            return;
        }
    }
    if (_reg.test(pathname)) {
        let filePath = path.normalize('../dev/mock/' + pathname);
        try {
            const fs = require('fs');
            const path = require('path');
            let resolvedPath = path.resolve(__dirname, filePath);
            let id;
            let schemaValidation = false;
            // 根据请求把文件名拆开
            // if (fs.existsSync(resolvedPath)
            //     && fs.statSync(resolvedPath).isDirectory()) {
            //     schemaValidation = true;
            //     if (req.method === 'GET') {
            //         filePath += '\\read';
            //     }
            //     else if (req.method === 'POST') {
            //         filePath += '/create';
            //     }
            //     else if (req.method === 'PUT') {
            //         filePath += '/update';
            //     }
            //     else if (req.method === 'DELETE') {
            //         filePath += '/delete';
            //     }
            // }
            delete require.cache[require.resolve(filePath)];
            let data = require(filePath);
            // console.log('mocking:' + filePath);
            if (typeof data === 'function') {
                if (req.method === 'GET' || req.method === 'DELETE') {
                    if (id !== undefined) {
                        req.url += '&id=' + id;
                    }
                    data = data(url.parse(req.url, true).query);
                    // Mock.mock('/\/call\/metketing\/boardmsgs/', 'get', data(url.parse(req.url, true).query));
                }
                else if (req.method === 'POST' || req.method === 'PUT') {
                    if (id !== undefined) {
                        req.body.id = id;
                    }
                    data = data(req.body);
                }
            }
            data = Mock.mock(data);
            // console.log('mocking:' + JSON.stringify(data));
            // console.log('schemaValidation: ' + schemaValidation);
            if (schemaValidation) {
                const v = new Validator();
                let dataSchema = {
                    "id": "/ResponseData",
                    "type": "object",
                    "properties": {
                        "startDate": {"type": "integer"},
                        "endDate": {"type": "integer"},
                        "appid": {"type": "string"},
                        "domain": {"type": "string"},
                        "index": {"type": "integer"},
                        "count": {"type": "integer"},
                        "total": {"type": "integer"},
                        "pv": {"type": "integer"},
                        "uv": {"type": "integer"},
                        "vv": {"type": "integer"},
                    }
                };
                let bodySchema = {
                    "id": "/ResponseBody",
                    "type": "object",
                    "properties": {
                        "code": {"type": "integer"},
                        "msg": {"type": "string"},
                        "data": {"$ref": "/ResponseData"}
                    },
                    "additionalProperties": false
                };
                let responseSchema = {
                    "id": "/Response",
                    "type": "object",
                    "properties": {
                        "statusCode": {"type": "integer"},
                        "body": {"$ref": "/ResponseBody"}
                    }
                };
                v.addSchema(dataSchema, '/ResponseData');
                v.addSchema(bodySchema, '/ResponseBody');
                let validation = v.validate(data, responseSchema);
                if (validation && validation.errors && validation.errors.length > 0) {
                    console.log('\n****************************** validation error *******************************:\n'
                        + 'error file: ' + filePath + '\n'
                        + 'error message: ' + validation.errors + '\n');
                }
                else {
                    let body = JSON.stringify(data.body);
                    setTimeout(function () {
                        response(data, body);
                    }, 300);
                }
            }
            else {
                let body = JSON.stringify(data.body);
                setTimeout(function () {
                    response(data, body);
                }, 300);
            }
        } catch (e) {
            console.log(e);
            let data = {
                statusCode: 500,
                msg: '缺少mock数据',
                body: ''
            }
            response(data, data.body);
        }
    }
    else {
        next();
    }
};
