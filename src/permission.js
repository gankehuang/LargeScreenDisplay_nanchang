import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 判断是否为后台管理界面,更新侧边栏导航相关数据
  if (to.path.indexOf('admin') > -1) {
    if (to.path.indexOf('adminReleaseManagement') > -1) {
      store.commit('asideRouters/SET_ADMINROUTERS', 'adminReleaseManagement')
    } else if (to.path.indexOf('adminMaterialSubmit') > -1) {
      store.commit('asideRouters/SET_ADMINROUTERS', 'adminMaterialSubmit')
    } else if (to.path.indexOf('adminPostManage') > -1) {
      store.commit('asideRouters/SET_ADMINROUTERS', 'adminPostManage')
    }
  }

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next()
      next(`/login?redirect=${to.path}`)
    }
  }
})
