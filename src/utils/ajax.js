import Vue from 'vue';
import axios from 'axios';

const CancelToken = axios.CancelToken;

if (!Vue.prototype.$ajax) {
    const UNIQUE_KEY = '_t';
    let lastRequestSettings = [];
    let going = false;
    let _uniqueId = 0;
    // let hold;
    let parse = function (str) {
        let data = {};
        let p = str.split('&');
        p.forEach(item => {
            item = item.split('=');
            data[item[0]] = item[1];
        });
        return data;
    };

    let wrapError = function (data) {
        let err = new Error();
        let res;

        if (data.response) {
            res = typeof data.response.data === 'object' ? data.response.data : {};
            res.status = data.response.status;
        }
        else {
            res = {
                msg: data.message
            };
        }

        err.cancel = axios.isCancel(data);
        err.code = res.code;
        err.msg = err.message = res.msg || res.message;
        // copy http status
        err.status = res.status;

        // backsend data
        res.data && (err.data = res.data);

        // 登录超时，自动记录请求
        if (err.status === 508 && !data.config.ignore) {
            lastRequestSettings.push(data.config);
        }

        return err;
    };

    let request = function (config) {
        config._uniqueId = ++_uniqueId;
        let defer = new Promise((resolve, reject) => {
            config.promise = {resolve, reject};
            axios.request(config).then((data) => {
                resolve(data);
            }).catch((error) => {
                error && error.status !== 508 && reject(error);
            });
        });
        return defer;
    };

    axios.interceptors.request.use(function (config) {
        // add timestamp for get request, to avoid 304
        if (config.method === 'get') {
            config.params = config.params || {};
            config.params[UNIQUE_KEY] = Date.now();
        }

        if (true) {
            switch (config.method) {
                case 'get':
                case 'delete':
                case 'head':
                case 'options':
                    config.params = config.params || {};
                    break;
                case 'post':
                case 'put':
                case 'patch':
                    config.data = config.data || {};
                    if (typeof config.data === 'string') {
                        let str = config.data;
                        try {
                            config.data = JSON.parse(str);
                        }
                        catch (e) {
                            // data数据在服务那边处理后变成了 name=val&...形式
                            config.data = parse(str);
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        return config;
    });

    axios.interceptors.response.use(function (res) {

        return res.data;

    }, function (error) {
        let url = error.config.url;
        error = wrapError(error);

        return Promise.reject(error);
    });

    // 继续上次请求，如登录态续期后继续发起请求
    axios.goon = function () {
        let len = lastRequestSettings.length;
        let defers = [];
        let config;

        if (len === 0 || going) {
            return;
        }

        // 防止同组ajax的goon多次触发
        going = true;
        for (let i = 0; i < len; i++) {
            // 重发的请求不再存储参数
            config = lastRequestSettings[i];
            config.ignore = true;

            (function (config) {
                let defer = axios.request(config);
                defer.then((data) => {
                    config.promise.resolve(data);
                }, (error) => {
                    error && error.status !== 508 && config.promise.reject(error);
                });

                defers.push(defer);
            })(config);

        }

        Promise.all(defers).then(() => {
            lastRequestSettings = [];
            going = false;
        }).catch(() => {
            going = false;
        });

        return axios;
    };

    let methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'read', 'create', 'update'];

    methods.map(method => {
        axios[method] = function (url, config = {}, moreConfig = {}) {
            let data;
            let defer;
            let source = CancelToken.source();
            let cancel = function () {
                source.cancel();
            };

            if ('create|read|update|delete'.indexOf(method) !== -1) {
                const methodsMap = {
                    create: 'post',
                    read: 'get',
                    update: 'put',
                    delete: 'delete'
                };
                if ('read|delete'.indexOf(method) !== -1) {
                    moreConfig.params = config;
                }
                else {
                    moreConfig.data = config;
                }
                moreConfig.method = methodsMap[method] || 'post';
                moreConfig.url = url;
                moreConfig.headers = {'X-Requested-With': 'XMLHttpRequest'};
                moreConfig.cancelToken = source.token;
                defer = request(moreConfig);
                defer.cancel = cancel;
                return defer;
            }

            if ('post|put|patch'.indexOf(method) !== -1) {
                data = config;
                config = arguments[2] || {};
            }

            config.method = method;
            config.url = url;
            config.data = data;
            config.headers = {'X-Requested-With': 'XMLHttpRequest'};
            config.cancelToken = source.token;

            defer = request(config);
            defer.cancel = cancel;
            return defer;
        };
    });

    Vue.prototype.$ajax = axios;
}

export default Vue.prototype.$ajax;
