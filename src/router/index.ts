import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store/index.ts'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/course/index.vue'),
        meta: {
          fullName: '课程管理'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          fullName: '角色管理'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          fullName: '菜单管理'
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
        meta: {
          fullName: '资源管理'
        }
      },
      {
        path: '/resourceCategory',
        name: 'resourceCategory',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/resourceCategory.vue'),
        meta: {
          fullName: '资源分类'
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          fullName: '课程管理'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          fullName: '用户管理'
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          fullName: '广告管理'
        }
      },
      {
        path: '/addAdvertise',
        name: 'addAdvertise',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/addAdvertise.vue'),
        meta: {
          fullName: '广告添加'
        }
      },
      {
        path: '/updateAdvertise/:id',
        name: 'updateAdvertise',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/updateAdvertise.vue'),
        meta: {
          fullName: '广告编辑'
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
        meta: {
          fullName: '广告位管理'
        }
      },
      {
        path: '/updateAdvertiseSpace/:id',
        name: 'updateAdvertiseSpace',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/updateAdvertiseSpace.vue'),
        meta: {
          fullName: '广告位编辑'
        },
        props: true
      },
      {
        path: '/addAdvertiseSpace',
        name: 'addAdvertiseSpace',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/addAdvertiseSpace.vue'),
        meta: {
          fullName: '广告位添加'
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'),
        meta: {
          fullName: '课程管理'
        }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        props: true,
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'),
        meta: {
          fullName: '课程管理'
        }
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        props: true
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
        props: true
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue'),
        meta: {
          fullName: '课程管理'
        }
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: 'error-page' */ '@/views/error-page/index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(next)
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.user) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } }) // login
    }
  } else {
    next()
  }
})

export default router
