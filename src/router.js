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
          path: 'systemBasic',
          name: 'systemBasic',
          meta:'项目基本情况 / 信息系统基本情况',
          component: () => import('./views/proBasic/systemBasic.vue')
        },
        {
          path: 'opsInfo/:id',
          name: 'opsInfo',
          meta:'项目基本情况 / 信息系统基本情况 / 运维信息',
          component: () => import('./views/proBasic/opsInfo.vue')
        },
        {
          path: 'networkBasic',
          name: 'networkBasic',
          meta:'项目基本情况 / 行业专网基本情况',
          component: () => import('./views/proBasic/networkBasic.vue')
        },
        {
          path: 'systemConstruction',
          name: 'systemConstruction',
          meta:'项目建设进展 / 系统建设进展',
          component: () => import('./views/projectConstruction/systemConstruction.vue')
        },
        {
          path: 'networkIntegration',
          name: 'networkIntegration',
          meta:'项目基本情况 / 专网整合进展',
          component: () => import('./views/projectConstruction/networkIntegration.vue')
        },
        {
          path: 'specialAudit',
          name: 'specialAudit',
          meta:'专项审计',
          component: () => import('./views/specialAudit/specialAudit.vue')
        },
        {
          path: 'progressReport',
          name: 'progressReport',
          meta:'工作简报 / 进度报表',
          component: () => import('./views/workBriefing/progressReport.vue')
        },
        {
          path: 'viewProgress/:id/:deptname',
          name: 'viewProgress',
          meta:'工作简报 / 进度报表 / 进度查看',
          component: () => import('./views/workBriefing/viewProgress.vue')
        },
        {
          path: 'workplan',
          name: 'workplan',
          meta:'工作简报 / 工作计划',
          component: () => import('./views/workBriefing/workplan.vue')
        },
      ]
    }
  ]
})
