import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/urinetherapydata'
    // children: [{
    //       path: 'dashboard',
    //       name: 'Dashboard',
    //       component: () => import('@/views/dashboard/index'),
    //       meta: { title: 'Dashboard', icon: 'dashboard' }
    // }]
  },

  //尿疗资料库
  {
    path: '/urinetherapydata',
    component: Layout,
    redirect: '/urinetherapydata/list',
    name: 'UrineTherapyData',
    meta: { title: '尿疗资料', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/UrineTherapyData/List'),
        meta: { title: '尿疗资料列表', icon: 'table' }
      },
      {
        path: 'uploadData',
        name: 'UploadData',
        component: () => import('@/views/UrineTherapyData/UploadData'),
        meta: { title: '尿疗资料上传', icon: 'form' }
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => import('@/views/UrineTherapyData/Editor'),
        meta: { title: '尿疗资料编辑器', icon: 'form' }
      }
    ]
  },

  //用户管理
  {
    path: '/userList',
    component: Layout,
    redirect: '/UserManagement/UserList',
    name: 'UserList',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/UserManagement/UserList'),
        meta: { title: '微信用户列表', icon: 'table' }
      }
    ]
  },

  //打卡管理
  {
    path: '/checkList',
    component: Layout,
    redirect: '/CheckManagement/CheckList',
    name: 'CheckList',
    meta: { title: '尿疗打卡管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'checkList',
        name: 'CheckList',
        component: () => import('@/views/CheckManagement/CheckList'),
        meta: { title: '打卡记录', icon: 'table' }
      }
    ]
  },

  {
    path: '/enurinetherapydata',
    component: Layout,
    redirect: '/enurinetherapydata/wxList',
    name: 'EnUrineTherapyData',
    meta: { title: '英语尿疗资料', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'enList',
        name: 'enList',
        component: () => import('@/views/ENUrineTherapyData/List'),
        meta: { title: '英语尿疗资料列表', icon: 'table' }
      },
      {
        path: 'enUploadData',
        name: 'enUploadData',
        component: () => import('@/views/ENUrineTherapyData/UploadData'),
        meta: { title: '英语尿疗资料上传', icon: 'form' }
      }
    ]
  },

  {
    path: '/jpurinetherapydata',
    component: Layout,
    redirect: '/jpurinetherapydata/wxList',
    name: 'JpUrineTherapyData',
    meta: { title: '日语尿疗资料', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'jpList',
        name: 'jpList',
        component: () => import('@/views/JPUrineTherapyData/List'),
        meta: { title: '日语尿疗资料列表', icon: 'table' }
      },
      {
        path: 'jpUploadData',
        name: 'jpUploadData',
        component: () => import('@/views/JPUrineTherapyData/UploadData'),
        meta: { title: '日语尿疗资料上传', icon: 'form' }
      }
    ]
  },




  {
    path: '/wxurinetherapydata',
    component: Layout,
    redirect: '/wxurinetherapydata/wxList',
    name: 'WxUrineTherapyData',
    meta: { title: '公众号尿疗资料', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'wxList',
        name: 'WxList',
        component: () => import('@/views/WxUrineTherapyData/WxList'),
        meta: { title: '公众号尿疗资料列表', icon: 'table' }
      },
      {
        path: 'wxUploadData',
        name: 'WxUploadData',
        component: () => import('@/views/WxUrineTherapyData/WxUploadData'),
        meta: { title: '公众号尿疗资料上传', icon: 'form' }
      }
    ]
  },

  //尿疗资料路由
  // {
  //   path: '/allData',
  //   component: Layout,
  //   // redirect: '/example/table',
  //   name: 'AllData',
  //   meta: { title: '尿疗资料', icon: 'el-icon-s-help' },
  //   component: () => import('@/views/table/index'),
  //   // children: [
  //   //   {
  //   //     path: 'table',
  //   //     name: 'Table',
  //   //     component: () => import('@/views/table/index'),
  //   //     meta: { title: 'Table', icon: 'table' }
  //   //   },
  //   //   {
  //   //     path: 'tree',
  //   //     name: 'Tree',
  //   //     component: () => import('@/views/tree/index'),
  //   //     meta: { title: 'Tree', icon: 'tree' }
  //   //   }
  //   // ]
  // },

  // {
  //       path: '/form',
  //       component: Layout,
  //       children: [
  //             {
  //                   path: 'index',
  //                   name: 'Form',
  //                   component: () => import('@/views/form/index'),
  //                   meta: { title: 'Form', icon: 'form' }
  //             }
  //       ]
  // },

  // {
  //       path: '/nested',
  //       component: Layout,
  //       redirect: '/nested/menu1',
  //       name: 'Nested',
  //       meta: {
  //             title: 'Nested',
  //             icon: 'nested'
  //       },
  //       children: [
  //             {
  //                   path: 'menu1',
  //                   component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //                   name: 'Menu1',
  //                   meta: { title: 'Menu1' },
  //                   children: [
  //                         {
  //                               path: 'menu1-1',
  //                               component: () => import('@/views/nested/menu1/menu1-1'),
  //                               name: 'Menu1-1',
  //                               meta: { title: 'Menu1-1' }
  //                         },
  //                         {
  //                               path: 'menu1-2',
  //                               component: () => import('@/views/nested/menu1/menu1-2'),
  //                               name: 'Menu1-2',
  //                               meta: { title: 'Menu1-2' },
  //                               children: [
  //                                     {
  //                                           path: 'menu1-2-1',
  //                                           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //                                           name: 'Menu1-2-1',
  //                                           meta: { title: 'Menu1-2-1' }
  //                                     },
  //                                     {
  //                                           path: 'menu1-2-2',
  //                                           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //                                           name: 'Menu1-2-2',
  //                                           meta: { title: 'Menu1-2-2' }
  //                                     }
  //                               ]
  //                         },
  //                         {
  //                               path: 'menu1-3',
  //                               component: () => import('@/views/nested/menu1/menu1-3'),
  //                               name: 'Menu1-3',
  //                               meta: { title: 'Menu1-3' }
  //                         }
  //                   ]
  //             },
  //             {
  //                   path: 'menu2',
  //                   component: () => import('@/views/nested/menu2/index'),
  //                   name: 'Menu2',
  //                   meta: { title: 'menu2' }
  //             }
  //       ]
  // },

  // {
  //       path: 'external-link',
  //       component: Layout,
  //       children: [
  //             {
  //                   path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //                   meta: { title: 'External Link', icon: 'link' }
  //             }
  //       ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
