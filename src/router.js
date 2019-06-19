import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.vue')
      
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/search/search.vue')
    },
    {
      path: '/basic',
      name: 'basic',//模版文件
      component: () => import('./views/basic.vue'),
      children:[
        {
          path: 'index',
          name: 'index',
          meta:'首页',
          component: () => import('./views/index/index.vue')
        },
        {
          path: 'user',
          name: 'user',
          meta:'用户管理',
          component: () => import('./views/user/user.vue')
        },
      ]
    }
  ]
})
