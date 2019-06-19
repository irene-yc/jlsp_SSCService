import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'systemBasic' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.vue')
    },
    {
      path: '/basic',
      name: 'basic',//模版文件
      component: () => import('./views/basic.vue'),
      children:[
        {
          path: 'performance',
          name: 'systemBasic',
          meta:'项目基本情况 / 信息系统基本情况',
          component: () => import('./views/proBasic/systemBasic.vue')
        },
        {
          path: 'save',
          name: 'opsInfo',
          meta:'项目基本情况 / 信息系统基本情况 / 运维信息',
          component: () => import('./views/proBasic/opsInfo.vue')
        },
      ]
    }
  ]
})
