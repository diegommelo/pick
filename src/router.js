import Vue from 'vue'
import Router from 'vue-router'
import Challengers from './views/Challengers.vue'
import Pickem from './views/Pickem.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', redirect:'/major/berlin/stage/legends'
    },
    {
      path: '/major/:major/stage/:stage',
      component: Challengers,
      props:true,
    },
    {
      path:'/pick/:pick',
      name:'pick',
      component: Pickem,
      props:true
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: function () { 
    //     return import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    // }
  ]
})
