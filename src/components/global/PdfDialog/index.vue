<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="pdf-modal-contianer">
      <el-scrollbar class="popup-scrollbar">
        <pdf
          v-for="(item, index) in info.numPages"
          :key="index"
          class="pdf-page"
          :src="info.file"
          :page="item"
        />
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      numPages: 0
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-dialog {
  background: url("~@/assets/image/socialGovernment/popup_right_bg.png") no-repeat center center;
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
  .el-dialog__headerbtn {
    top: 34px;
    right: 40px;

    .el-dialog__close {
    &:before {
      font-size: 24px;
      font-weight: bold;
      color: #3B9AFE;
    }
  }
  }

}
::v-deep .el-dialog__body {
  padding: 20px 30px 2px 11px;
  width: 100%;
  min-height: 150px;
}

::v-deep .el-dialog__footer {
  padding: 0 30px 35px 30px;
}

.pdf-modal-contianer {
  width: 100%;
  height: 700px;
  z-index: 2000 !important;
}
.popup-scrollbar {
  margin: 20px 0 0 32px;
  width: 96%;
  height: 96%;
}
.pdf-page {
  width: 100%;
  height: 100%;
}
</style>
