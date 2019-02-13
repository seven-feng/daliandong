import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/CLGSHZ/event',
    component: Layout,
    name: 'Event',
    meta: { title: '事件', icon: 'event' },
    children: [
      {
        path: 'editDetail/:id',
        name: 'editDetail',
        hidden: true,
        component: () => import('@/views/detail/editDetail/index'),
        meta: { title: '修改详情', icon: 'table' }
      }, {
        path: 'predoing',
        name: 'predoing',
        component: () => import('@/views/event/predoing/index'),
        meta: { title: '待办件', icon: 'table' }
      },
      {
        path: 'predetail/:id',
        name: 'predetail',
        hidden: true,
        component: () => import('@/views/detail/predetail/index'),
        meta: { title: '待办件详情', icon: 'table' }
      },
      {
        path: 'relatedDetail/:id',
        name: 'relatedDetail',
        hidden: true,
        component: () => import('@/views/detail/relatedDetail/index'),
        meta: { title: '相似事件', icon: 'table' }
      },
      {
        path: 'doing',
        name: 'doing',
        component: () => import('@/views/event/doing/index'),
        meta: { title: '交办跟踪件', icon: 'table' }
      },
      {
        path: 'assignDetail/:id',
        name: 'assignDetail',
        hidden: true,
        component: () => import('@/views/detail/assignDetail/index'),
        meta: { title: '交办跟踪件详情', icon: 'table' }
      },
      {
        path: 'delayCheck',
        name: 'delayCheck',
        component: () => import('@/views/event/delayCheck/index'),
        meta: { title: '延期审核件', icon: 'table' }
      },
      {
        path: 'delayCheckDetail/:id',
        name: 'delayCheckDetail',
        hidden: true,
        component: () => import('@/views/detail/delayCheckDetail/index'),
        meta: { title: '延期审核件详情', icon: 'table' }
      },
      {
        path: 'backCheck',
        name: 'backCheck',
        component: () => import('@/views/event/backCheck/index'),
        meta: { title: '退单审核件', icon: 'table' }
      },
      {
        path: 'backCheckDetail/:id',
        name: 'backCheckDetail',
        hidden: true,
        component: () => import('@/views/detail/backCheckDetail/index'),
        meta: { title: '退单审核件详情', icon: 'table' }
      },
      {
        path: 'check',
        name: 'check',
        component: () => import('@/views/event/check/index'),
        meta: { title: '结案审核件', icon: 'table' }
      },
      {
        path: 'checkDetail/:id',
        name: 'checkDetail',
        hidden: true,
        component: () => import('@/views/detail/checkDetail/index'),
        meta: { title: '结案审核件详情', icon: 'table' }
      },
      {
        path: 'end',
        name: 'end',
        component: () => import('@/views/event/end/index'),
        meta: { title: '已办结件', icon: 'table' }
      },
      {
        path: 'endDetail/:id',
        name: 'endDetail',
        hidden: true,
        component: () => import('@/views/detail/endDetail/index'),
        meta: { title: '已办结件详情', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

