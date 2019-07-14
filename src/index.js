import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './components/index.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      component: Index,
    }
  ]
})

new Vue({
  router
}).$mount('#app')