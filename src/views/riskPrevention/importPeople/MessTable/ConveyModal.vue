<template>
  <Dialog
    width="35%"
    top="20vh"
    title="传达区县"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <div class="form-item">
      <div class="label">
        县区：
      </div>
      <el-select
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

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
        @click="handleBtn('取消')"
      >
        取消
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
      content: '',
      value: '0006',
      options: [
        {
          label: '东湖区',
          value: '0001'
        },
        {
          label: '西湖区',
          value: '0002'
        },
        {
          label: '青云谱区',
          value: '0003'
        },
        {
          label: '青山湖区',
          value: '0004'
        },
        {
          label: '新建区',
          value: '0005'
        },
        {
          label: '红谷滩区',
          value: '0006'
        },
        {
          label: '南昌县',
          value: '0007'
        },
        {
          label: '安义县',
          value: '0008'
        },
        {
          label: '进贤县',
          value: '0009'
        },
        {
          label: '高新区',
          value: '0010'
        },
        {
          label: '经开区',
          value: '0011'
        },
        {
          label: '湾里管理局',
          value: '0012'
        }
      ]
    }
  },
  methods: {
    // 打开弹框
    openModal () {
      this.dialogVisible = true
    },
    // 关闭弹框
    closeModal () {
      this.dialogVisible = false
      this.personInfo = this.$options.data().personInfo
    },
    async handleBtn (btnTypeText) {
      if (btnTypeText === '确定') {
        this.$message({
          message: '操作成功',
          type: 'success'
        })

        this.closeModal()
        return
      }

      if (btnTypeText === '取消') {
        this.closeModal()
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

    ::v-deep .el-textarea__inner {
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
