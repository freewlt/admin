
// // login
// const loginRouter =[
//     {
//         path:'/login', 
//         component: (resolve) => require(['../views/login/index.vue'], resolve),
//         hidden:true
//     }
// ];


//其他
const mainRouter = [
    {
        path:'/', 
        component: (resolve) => require(['../views/login/index.vue'], resolve),
    },
    {
        path:'/login', 
        name:'login',
        component: (resolve) => require(['../views/login/index.vue'], resolve),
    },
    {
        path:'/home',
        name:'homeBox',
        component: (resolve) => require(['../views/home/index.vue'], resolve)
    },
    {
        path:'/register',
        name:'register',
        component: (resolve) => require(['../views/register/index.vue'], resolve)
    },
    {
        path:'/findPwd',
        name:'findPwd',
        component: (resolve) => require(['../views/findPwd/index.vue'], resolve)
    },
    {
        path:'/setPwd',
        name:'setPwd',
        component: (resolve) => require(['../views/findPwd/setPwd.vue'], resolve)
    }
];

export default {
    //loginRouter:loginRouter,
    mainRouter:mainRouter,
};