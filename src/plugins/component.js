import Vue from 'vue'

import CountTo from 'vue-count-to'

Vue.component('CountTo', CountTo)

const requireComponent = require.context(
  '../components/global',
  true,
  /index.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/')[1]
  // 全局注册组件
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
