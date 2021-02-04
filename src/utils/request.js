import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 500000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const { resp_code } = dataAxios // 这个状态码是和后端约定的
    if (resp_code === undefined) {
      // 特殊接口可能不含 code
      return dataAxios
    } else if (resp_code === 1) {
      // code:1 请求成功
      return dataAxios.datas
    } else {
      return dataAxios
    }

    // // 过滤登录接口
    // if (res.access_token || res === '') {
    //   return res
    // }
    //
    // if (res.code !== 0) {
    //   if (res.code === 401) {
    //     MessageBox.confirm('登录信息已过期，请重新登录！', '退出登录', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   } else {
    //     Message({
    //       message: res.message || 'Error',
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
