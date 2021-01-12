<template>
  <div class="model">
    <div class="model-box">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="规则名称:" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入规则名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="人员去向:">
              <el-select v-model="form.staff" placeholder="请选择人员去向">
                <el-option
                  v-for="item in staffOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="出现频次:">
              <el-select v-model="form.frequency" placeholder="请选择出现频次">
                <el-option
                  v-for="item in frequencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="聚集人数:">
              <label>大于等于</label>
              <el-input
                v-model="form.gatherNumber"
                style="width: 80px"
              ></el-input
              ><label>人</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="同行人数:">
              <label>大于等于</label>
              <el-input v-model="form.peerNumber" style="width: 80px"></el-input
              ><label>人</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="同行次数:">
              <label>大于等于</label>
              <el-input v-model="form.peerTime" style="width: 80px"></el-input
              ><label>次</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="相继出没时间:">
              <label>相继出没时间</label>
              <el-input v-model="form.truth" style="width: 80px"></el-input
              ><label>分钟</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="未出现时间:">
              <label>未出现时间</label>
              <el-input v-model="form.noTruth" style="width: 80px"></el-input
              ><label>分钟</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="同行间隔时间:">
              <label>同行间隔时间</label>
              <el-input v-model="form.between" style="width: 80px"></el-input
              ><label>分钟</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="出现次数占比:">
              <el-input
                v-model="form.peerTime"
                placeholder="请输入出现次数占比"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="model-footer">
      <el-button type="primary" @click="submitClick">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        purchase: 2
      },
      staffOptions: [
        {
          value: '1',
          label: '离昌'
        },
        {
          value: '2',
          label: '离省'
        },
        {
          value: '3',
          label: '进京'
        }
      ],
      frequencyOptions: [
        {
          value: '1',
          label: '未出现'
        },
        {
          value: '2',
          label: '首次出现'
        },
        {
          value: '3',
          label: '多次出现'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.getRandomInt(10)
          this.$emit('submitEvent', this.form)
        }
      })
    },
    getRandomInt(data) {
      let number = ''
      for (let i = 0; i < data; i++) {
        number += Math.floor(Math.random() * 10)
      }
      this.form.id = number
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
    height: calc(100% - 50px);
    label {
      color: #aadaff;
      font-weight: normal;
      padding: 0px 5px;
    }
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
