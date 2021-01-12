<template>
  <div class="iframe-box">
    <iframe
      :src="needUrl ? needUrl : url"
      :width="width"
      :height="height"
      frameborder="0"
      allowfullscreen
      allow="autoplay; fullscreen"
    ></iframe>
  </div>
</template>

<script>
import { getToken } from '@/api/smartData/gridView'
export default {
  props: {
    cameraIndexCode: {
      type: [String, Number],
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    }
  },
  data() {
    return {
      token: '',
      needUrl: ''
    }
  },
  watch: {
    cameraIndexCode: {
      immediate: true,
      handler() {
        this.queryToken()
      }
    }
  },
  methods: {
    queryToken() {
      getToken().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.token = data
          this.needUrl = `http://172.11.16.61:10000/play.html?serial=36010000002002019807&code=${this.cameraIndexCode}&aspect=fullscreen&token=${this.token}`
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
}
</style>
