<template>
  <div class="page-box">
    <iframe
      style="position: absolute; left: 0; top: 8%;z-index: 2;"
      src="http://106.225.143.132:6555/big-data/#/safe?auto=true"
      width="100%"
      height="92%"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
    />
  </div>
</template>

<script>
import { autoLogin } from '@/api/riskPrevention/law'

export default {
  data () {
    return {
      iframeUrl: ''
    }
  },
  created () {
    this.autoLogin()
  },
  mounted () {},
  methods: {
    autoLogin () {
      autoLogin().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.iframeUrl = `http://nczfw.geostaryuqing.com:8080/auth?token=${data.token}`
          console.log(this.iframeUrl)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  background-color: #172638;
}
</style>
