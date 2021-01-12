import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Login from '@/views/login/index'
// import socialGovernment from '@/views/socialGovernment/index'
import webSection from './webSection'

export const constantRoutes = [
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/socialGovernment',
  //   component: socialGovernment
  // }
]

const createRouter = () =>
  new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [...constantRoutes, ...webSection]
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  console.log(
    isChunkLoadFailed,
    '/Loading chunk (d)+ failed/g',
    '路由懒加载找不到对应的moudle'
  )
  if (isChunkLoadFailed) {
    window.location.reload()
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log(error)
  }
})

export default router
