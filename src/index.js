import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuex);

import Index from './components/Index.vue';
import Practice from './components/Practice.vue';
import store from './store';
import ArgumentPool from '../pool/argument';
import IssuePool from '../pool/issue';

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/argument',
      component: Index,
      props: {
        mode: "argument",
        questions: ArgumentPool,
      }
    },
    {
      path: '/issue',
      component: Index,
      props: {
        mode: "issue",
        questions: IssuePool,
      }
    },
    {
      path: "/practice-argument",
      component: Practice,
      props: {
        mode: "argument",
        questions: ArgumentPool,
      },
      beforeEnter: (_, __, next) => {
        if(store.state.questionId == -1){
          next('/argument');
        }else{
          next();
        }
      }
    },
    {
      path: '/practice-issue',
      component: Practice,
      props: {
        mode: "issue",
        questions: IssuePool,
      },
      beforeEnter: (_, __, next) => {
        if(store.state.questionId == -1){
          next('/issue');
        }else{
          next();
        }
      }
    },
    {
      path: '*',
      redirect: "/argument",
    },
  ]
})

new Vue({
  el: '#app',
  router,
  store,
})