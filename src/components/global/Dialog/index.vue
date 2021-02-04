<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      v-if="isNeedHead"
      slot="title"
      class="modal-title"
    >
      {{ title }}
    </div>
    <slot />
    <template slot="footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 是否需要头部
    isNeedHead: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    }
  },
  data () {
    return {
      dialogVisible: true
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  background: url("~@/assets/image/common/modal-bg.png") no-repeat center center;
  background-size: 100% 100%;
  box-shadow: none;
  border-radius: 0;
}
::v-deep .el-dialog__header {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  .modal-title {
    width: 45%;
    min-width: 400px;
    height: 45px;
    line-height: 45px;
    background: url("~@/assets/image/common/modal-title-bg.png") no-repeat center center;
    background-size: 100% 100%;
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    text-align: center;
  }
  .el-dialog__close {
    &:before {
      font-size: 24px;
      font-weight: bold;
      color: #3B9AFE;
    }
  }
}
::v-deep .el-dialog__body {
  padding: 20px 30px 30px 30px;
  width: 100%;
  min-height: 150px;
}

::v-deep .el-dialog__footer {
  padding: 0 30px 35px 30px;
}
</style>
