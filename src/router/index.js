
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
        hidden:true
    },
    {
        path:'/home',
        // hidden:false,
        component: (resolve) => require(['../views/home/index.vue'], resolve)
    }
];

export default {
    //loginRouter:loginRouter,
    mainRouter:mainRouter,
};