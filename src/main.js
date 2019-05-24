import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import store from './store';

import routeConfig from './router/index';
import 'iview/dist/styles/iview.css';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(iView);

const RouteRConfig = {
    routes:routeConfig.mainRouter
};
const router = new VueRouter(RouteRConfig);
router.beforeEach((to, from, next) => {
    iView.LoadingBar.config({
        color: '#5cb85c',
        failedColor: '#f0ad4e',
        height: 2
    });
    iView.LoadingBar.start();
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});