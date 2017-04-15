import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/maps/index'


Vue.use(Router);

export default new Router({
  routes: [
   /* {
      path: '/',
      name: 'Hello',
      component: Hello
    }, */
    {
      name: 'MainMap',
      path: '/',
      folder: true,
      component: Index
    },
  ]
})
