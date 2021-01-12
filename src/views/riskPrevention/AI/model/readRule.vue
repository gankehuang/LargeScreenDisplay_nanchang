<template>
  <div class="model">
    <div class="model-box">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="24" v-for="(item, index) in form.list" :key="index">
            <el-form-item :label="item.name">
              <label>{{ item.value }}</label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array
    }
  },
  data() {
    return {
      form: {
        list: this.dataList
      }
    }
  },
  methods: {
    submitClick() {
      this.$emit('submitEvent', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  width: 100%;
  height: calc(100% - 57px);
  /deep/ .el-form-item__label {
    color: #aadaff;
  }
  label {
    color: #aadaff;
    font-size: 14px;
  }
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-slider__runway {
    background: rgba(0, 0, 0, 0.2);
  }
  /deep/ .el-slider__button {
    width: 12px;
    height: 12px;
    background: #409eff;
  }
  /deep/ .el-radio {
    color: #aadaff;
    .el-radio__input.is-checked + .el-radio__label {
      color: #aadaff;
    }
    .el-radio__inner {
      background: none;
    }
  }
  .model-box {
    padding: 0px 60px;
    width: 100%;
    height: 50px;
  }
  .model-map {
    margin: 0px 30px 20px 30px;
    width: calc(100% - 60px);
    height: calc(100% - 120px);
    position: relative;
  }
  .model-footer {
    width: 100%;
    padding: 0px 20px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}
</style>
