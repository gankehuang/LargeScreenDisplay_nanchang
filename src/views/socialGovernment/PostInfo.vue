<template>
  <div class="postInfo" v-if="visible">
    <div class="close" @click="close" />
    <div class="title">{{ info.name }}</div>
    <div class="infobox">
      <p>
        <svg-icon icon-class="dizhi" style="color:#95D6FF" /> {{ info.address }}
      </p>
      <el-image
        v-if="info.img && info.img.indexOf('http') === -1"
        :src="'http://172.11.16.241:5054' + info.img"
        :preview-src-list="['http://172.11.16.241:5054' + info.img]"
      >
        <div slot="placeholder" class="image-slot">
          <img src="@/assets/image/socialGovernment/loading-img.gif" />
        </div>
      </el-image>
      <el-image
        v-else-if="info.img && info.img.indexOf('http') !== -1"
        :src="info.img"
        :preview-src-list="[info.img]"
      >
        <div slot="placeholder" class="image-slot">
          <img src="@/assets/image/socialGovernment/loading-img.gif" />
        </div>
      </el-image>
      <img v-else src="@/assets/image/socialGovernment/no.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: null
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.postInfo {
  width: 463px;
  height: 341px;
  position: absolute;
  top: 170px;
  left: 80px;
  z-index: 2003;
  padding-top: 25px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  background: url("~@/assets/image/socialGovernment/postBox.png") center center /
    100% 100% no-repeat;
  .title {
    width: 100%;
    padding: 0 10%;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: #a9daff;
    line-height: 28px;
  }
  .infobox {
    width: 418px;
    height: 256px;
    padding: 0 15px;
    margin: 10px auto 0 auto;
    border: 1px solid #074574;
    p {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      color: #a9daff;
      line-height: 28px;
    }
    /deep/.el-image {
      width: 100%;
      height: 200px;
    }
  }
}
.close {
  cursor: pointer;
  position: absolute;
  z-index: 9;
  top: 25px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}

.image-slot {
  text-align: center;
}
</style>
