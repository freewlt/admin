// import Vue from 'vue';
// import Vuex from 'vuex';
// // import getters from './getters';
// // import actions from './actions';
// // import mutations from './mutations';

// Vue.use(Vuex);
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    first: 15,
    second: 18,
    listUser:[
        {user:'admin', password:123456, done: true},
        {user:'admin1', password:'admin1',done: false}
    ]
};
const getters = {
    doneUser: state =>{
        return state.listUser.filter(todo => todo.done);
    }
};
const mutations = {
    add (state) {
        state.first ++;
    },
    miuns (state) {
        state.second --;
    }
};
const  actions = {
    miuns ({commit}){
        commit('miuns');
    }
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;

