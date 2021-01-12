import Vue from 'vue'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/tree'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
// import 'echarts-gl'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/chart/lines'
// 注册组件后即可使用
Vue.component('v-chart', ECharts)

// export Echarts
export default ECharts
