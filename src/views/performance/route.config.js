/* if (typeof window !== 'undefined') {
    __webpack_require__.p = window.GLOBAL_STATIC_PATH + '/';
} */

let route = [{
    path: '/perf',
    name: 'index',
    meta: {
        title: '测试页面首页'
    },
    component: r => require.ensure([], () => r(require('./index/index.vue')), 'index')
}];

module.exports = route;
