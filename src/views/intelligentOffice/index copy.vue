<template>
  <div class="page-box">
    <div class="blacks"></div>
    <iframe
      style="position: absolute; left: 0; top: 0;z-index: 2;"
      :src="links"
      width="100%"
      height="100%"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
    >
    </iframe>
  </div>
</template>

<script>
import { getToken } from '@/api/intelligentOffice/intelligentOffice'
export default {
  data() {
    return {
      links: ''
    }
  },
  mounted() {
    this.getTokens()
  },
  methods: {
    getTokens() {
      getToken({ account: 'ncwsbg' }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.links =
            'http://172.11.16.88/oath2Login?appkey=guest&appsecret=nczz@2020&accessToken=' +
            res.data.accessToken
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  height: 100%;
  // background-color: rgb(38,38,63);
  position: relative;
  .blacks {
    position: absolute;
    top: 0;
    width: 100%;
    height: 8%;
    background-color: rgb(7, 7, 12);
    z-index: 3;
  }
}
</style>
