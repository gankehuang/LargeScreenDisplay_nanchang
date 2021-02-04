<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { stopVideo } from '@/api/smartData/gridView'
export default {
  name: 'App',
  mounted () {
    // 解决flv视频，在页面刷新或者直接关闭时不走stop接口
    if (localStorage.getItem('flvVideoId')) {
      stopVideo({
        id: localStorage.getItem('flvVideoId')
      }).then(res => {
        localStorage.removeItem('flvVideoId')
      })
    }
  },
  methods: {}
}
</script>

<style></style>
