// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './runBeforeRequire';
import Vue from 'vue';
import VueRouter from 'vue-router';
import configRouter from './route.config';
import App from './App.vue';

Vue.use(VueRouter);

let routeConfig = {
    base: __dirname,
    routes: configRouter,
    mode: 'history',
    fallback: false
};
const router = new VueRouter(routeConfig);

router.beforeEach((to, from, next) => {
    console.log(to, from)
    //  do something
    next();
});

/* eslint-disable no-new */
new Vue({
    render(h) {
        return h(App);
    },
    router
}).$mount('#app');
