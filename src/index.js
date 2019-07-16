import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Index from './components/Index.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      redirect: "/argument",
    },
    {
      path: '/argument',
      component: Index,
      props: {
        mode: "argument",
      }
    },
    {
      path: '/issue',
      component: Index,
      props: {
        mode: "issue",
      }
    }
  ]
})

new Vue({
  router
}).$mount('#app')