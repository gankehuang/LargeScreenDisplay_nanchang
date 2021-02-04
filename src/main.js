import localforage from 'localforage'
import Vue from 'vue'
import 'normalize.css/normalize.css'
import 'video.js/dist/video-js.css'
import App from './App.vue'
import router from './router'
import store from '@/store'
import animated from 'animate.css'

import './icons' // icon
import '@/plugins/element.js'
import '@/plugins/component.js'
import '@/plugins/echarts'
import * as filters from '@/plugins/filters.js'
import * as directives from '@/plugins/directives.js'

import '@/styles/index.scss'
import '@/permission'
window.localforage = localforage

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 插入过滤器名和对应方法
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) // 插入指令和对应方法
}) // permission control

Vue.use(animated)
Vue.use(directives)

// 公共bus
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
