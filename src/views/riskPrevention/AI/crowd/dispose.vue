<template>
  <div class="model">
    <div class="model-box">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="规则名称:"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="请输入规则名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="风险等级:">
              <el-select
                v-model="form.grade"
                placeholder="请选择风险等级"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="通知对象:">
              <el-select
                v-model="form.reception"
                placeholder="请选择通知对象"
                multiple
              >
                <el-option
                  v-for="item in receptionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处置措施:">
              <el-select
                v-model="form.measure"
                placeholder="请选择处置措施"
              >
                <el-option
                  v-for="item in measureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="超时期限:">
              <el-select
                v-model="form.overtime"
                placeholder="请选择超时期限"
              >
                <el-option
                  v-for="item in overtimeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="model-footer">
      <el-button
        type="primary"
        @click="submitClick"
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        purchase: 2
      },
      rules: {
        name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
      },
      options: [
        {
          value: '1',
          label: 'A级'
        },
        {
          value: '2',
          label: 'B级'
        },
        {
          value: '3',
          label: 'C级'
        }
      ],
      receptionOptions: [
        {
          value: 1,
          label: '主管部门'
        },
        {
          value: 2,
          label: '退役军人事务局'
        },
        {
          value: 3,
          label: '属地单位'
        },
        {
          value: 4,
          label: '法定监护人'
        },
        {
          value: 5,
          label: '精防人员'
        },
        {
          value: 6,
          label: '社区干部'
        },
        {
          value: 7,
          label: '社区民警'
        },
        {
          value: 8,
          label: '网格员'
        },
        {
          value: 9,
          label: '自定义'
        }
      ],
      measureOptions: [
        {
          value: '1',
          label: '提醒'
        },
        {
          value: '2',
          label: '关注'
        },
        {
          value: '3',
          label: '反馈'
        },
        {
          value: '4',
          label: '落查'
        },
        {
          value: '5',
          label: '督导'
        }
      ],
      overtimeOptions: [
        {
          value: '1',
          label: '6小时'
        },
        {
          value: '2',
          label: '12小时'
        },
        {
          value: '3',
          label: '24小时'
        },
        {
          value: '4',
          label: '48小时'
        }
      ]
    }
  },
  methods: {
    submitClick () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.getRandomInt(10)
          this.$emit('submitEvent', this.form)
        }
      })
    },
    getRandomInt (data) {
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
/deep/ .el-tag.el-tag--info {
  background-color: rgba(0, 0, 0, 0.2) !important;
  border-color: #095083;
  color: #fff;
  .el-tag__close {
    background-color: #095083;
  }
}
/deep/ .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
