<template>
  <Dialog
    v-if="info"
    width="40%"
    top="15vh"
    :title="info.name"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <div class="infobox">
      <p>
        <svg-icon
          icon-class="dizhi"
          style="color:#95D6FF"
        /> {{ info.address }}
      </p>
      <el-image
        v-if="info.img"
        class="info-img"
        :src="'http://172.11.16.241:5054' + info.img"
        :preview-src-list="['http://172.11.16.241:5054' + info.img]"
      />
      <img
        v-else
        src="@/assets/image/socialGovernment/no.png"
      >
    </div>
  </Dialog>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.infobox {
  height: 350px;
}
p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
  color: #a9daff;
  line-height: 28px;
}
 .info-img {
   width: 255px;
}
</style>
