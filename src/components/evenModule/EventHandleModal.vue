<template>
  <Dialog
    v-if="info"
    width="40%"
    top="25vh"
    title="事件处置"
    :visible.sync="dialogVisible"
    :append-to-body="true"
  >
    <div class="form-item">
      <div class="label">
        处理说明：
      </div>
      <el-input
        v-model="content"
        class="input"
        type="textarea"
      />
    </div>

    <template v-slot:footer>
      <div
        class="base-btn"
        @click="handleBtn('返回')"
      >
        返回
      </div>
      <div
        class="base-btn"
        @click="handleBtn('确定')"
      >
        确定
      </div>
    </template>
  </Dialog>
</template>
<script>
import { handleEvent } from '@/api/intelligentCommand/warning'

export default {
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      dialogVisible: false,
      content: ''
    }
  },
  methods: {
    // 打开弹框
    openModal () {
      this.dialogVisible = true
    },
    // 关闭弹框
    closeModal () {
      this.content = ''
      this.dialogVisible = false
    },
    async handleBtn (btnTypeText) {
      if (btnTypeText === '确定') {
        if (!this.content) {
          this.$message.warning('处置说明不能为空')
          return
        }
        await handleEvent({
          id: this.info.id,
          processingDesc: this.content,
          processingImageUrl: '',
          isInvalid: false
        })

        this.$message({
          message: '处置成功',
          type: 'success'
        })

        this.closeModal()
        this.$emit('onEventHandleModal')
        return
      }

      if (btnTypeText === '返回') {
        this.closeModal()
        this.$emit('onEventHandleModal')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item {
  padding: 10px;
  display: flex;
  .label {
    width: 120px;
    color: #fff;
  }
  .input {
    color: #fff;

    ::v-deep.el-textarea__inner {
      background-color: #03223c;
      border: 1px solid #0b61a0 !important;
      color: #fff;
      height: 90px;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
}

::v-deep .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
  .base-btn {
    width: 100px;
    height: 30px;
    margin-left: 13px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: url("~@/assets/image/event/event-home-btn.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
