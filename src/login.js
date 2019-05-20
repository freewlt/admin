// import Vue from 'vue';
// import iView from 'iview';
// import VueRouter from 'vue-router';
// import Vuex from 'vuex';

// import routeConfig from './router/index';
// import App from 'app.vue';


// Vue.use(VueRouter);
// Vue.use(Vuex);
// Vue.use(iView);

// const RouteRConfig = {
//     routes:routeConfig.loginRouter
// };
// const router = new VueRouter(RouteRConfig);
// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.config({
//         color: '#16b812',
//         height: 2
//     });
//     iView.LoadingBar.start();
//     next();
// });

// router.afterEach(() => {
//     iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });

// const store = new Vuex.Store({
//     state: {

//     },
//     getters: {

//     },
//     mutations: {

//     },
//     actions: {

//     }
// });

// new Vue({
//     el: '#app',
//     router: router,
//     store: store,
//     render: h => h(App)
// });