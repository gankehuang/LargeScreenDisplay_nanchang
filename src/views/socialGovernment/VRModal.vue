<template>
  <div class="mask-container" v-if="visible">
    <div class="mask"></div>
    <div class="conflict-modal-container">
      <div class="close" @click="close"></div>
      <iframe
        :src="url"
        style="width:1300px;height:780px;margin:20px 25px 0;"
      ></iframe>
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
    modalType: {
      type: String,
      dafault: 'zhq'
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.mask-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}
.iframe {
  width: 100%;
  height: 100%;
}
.conflict-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1350px;
  height: 828px;
  z-index: 1000;
  background: url("~@/assets/image/conflict/conflict_modal_bg.png") center
    center / 100% 100% no-repeat;
}
.close {
  cursor: pointer;
  z-index: 1001;
  position: absolute;
  top: 40px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
</style>
