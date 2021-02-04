<template>
  <div class="modal-content">
    <img
      class="close-btn"
      src="@/assets/image/KeyThrong/close.png"
      @click="close"
    >

    <div class="content-left">
      <div class="item-p">
        <span>网格归属：</span>
        <span class="value-text">{{
          infoWindowData.gridSubPath || '暂无'
        }}</span>
      </div>
      <div
        class="item-p"
        style="display: flex"
      >
        <span style="align-self: center">姓名：</span>
        <span class="value-text">{{ infoWindowData.faceName }}</span>
      </div>
      <div class="item-p">
        <span>抓拍时间：</span>
        <span class="value-text">{{ infoWindowData.alarmTime }}</span>
      </div>
      <div class="item-p">
        <span>抓拍地点：</span>
        <span class="value-text">{{
          infoWindowData.snapLocation || '暂无'
        }}</span>
      </div>
    </div>
    <div class="content-right">
      <el-image
        style="width:100px;height:100px"
        :z-index="9999"
        fit="contain"
        :src="infoWindowData.bkgUrl"
        :preview-src-list="[infoWindowData.bkgUrl]"
      />
      <div
        class="look-trajectory"
        @click="lookVideo(infoWindowData)"
      >
        查看视频
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoWindowData: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('closeWindow')
    },
    lookVideo (infoWindowData) {
      this.$emit('lookVideo', infoWindowData)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  position: relative;
  width: 600px !important;
  height: 180px !important;
  padding: 10px 20px;
  background: url('~@/assets/image/importPeople/search-modal-bg.png') no-repeat
  100% 100%;
  background-size: 100% 100%;
  display: flex;
  .close-btn {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
  .item-p {
    color: #fff;
    padding-bottom: 10px;
    .value-text {
      color: #01aae5;
    }
  }

  .content-left {
    flex: 0 0 70%;
    padding-right: 25px;
  }

  .content-right {
    flex: 0 0 30%;
  }
}
.look-trajectory {
  width: 110px;
  height: 28px;
  line-height: 28px;
  background: rgba(3, 35, 63, 0.2);
  border: 1px solid rgba(1, 170, 229, 1);
  border-radius: 20px;
  text-align: center;
  color: #17cbf8;
  cursor: pointer;
  margin-top: 10px;
}
</style>
