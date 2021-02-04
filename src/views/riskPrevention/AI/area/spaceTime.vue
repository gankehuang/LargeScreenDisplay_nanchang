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
            <el-form-item label="关注日期:">
              <el-select
                v-model="form.date"
                placeholder="请选择持续时间"
              >
                <el-option
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关注时段:">
              <div style="padding:0px 20px;">
                <el-slider
                  v-model="form.pay"
                  range
                  :marks="marks"
                  :show-tooltip="false"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="持续时间:">
              <el-select
                v-model="form.duration"
                placeholder="请选择持续时间"
              >
                <el-option
                  v-for="item in durationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="第一圈层:">
              <el-input
                v-model="form.tier1"
                style="width: 80px"
              /><label>米</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="第二圈层:">
              <el-input
                v-model="form.tier2"
                style="width: 80px"
              /><label>米</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="第三圈层:">
              <el-input
                v-model="form.tier3"
                style="width: 80px"
              /><label>米</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="监控区域:">
              <el-select
                v-model="form.monitor"
                placeholder="请选择监控区域"
              >
                <el-option
                  v-for="item in monitorOptions"
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
        purchase: 2,
        pay: [25, 50]
      },
      rules: {
        name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
      },
      marks: {
        0: '00:00',
        25: '8:00',
        50: '12:00',
        75: '20:00',
        100: '24:00'
      },
      dateOptions: [
        {
          value: '1',
          label: '日常时段'
        },
        {
          value: '2',
          label: '重要敏感时期'
        },
        {
          value: '3',
          label: '重大活动期间'
        }
      ],
      durationOptions: [
        {
          value: '1',
          label: '1天'
        },
        {
          value: '2',
          label: '2天'
        },
        {
          value: '3',
          label: '3天'
        },
        {
          value: '4',
          label: '4天'
        },
        {
          value: '5',
          label: '5天'
        },
        {
          value: '6',
          label: '6天'
        },
        {
          value: '7',
          label: '7天'
        }
      ],
      areaOptions: [
        {
          value: '1',
          label: '省行政中心'
        },
        {
          value: '2',
          label: '市行政中心'
        },
        {
          value: '3',
          label: '八一广场'
        },
        {
          value: '4',
          label: '秋水广场'
        }
      ],
      partOptions: [
        {
          value: '1',
          label: '学校'
        },
        {
          value: '2',
          label: '医院'
        },
        {
          value: '3',
          label: '加油站'
        },
        {
          value: '4',
          label: '建筑工地'
        },
        {
          value: '5',
          label: '过江大桥'
        }
      ],
      monitorOptions: [
        {
          value: '1',
          label: '生米662青岚居委会西南侧向西'
        },
        {
          value: '2',
          label: '生米841万达主题乐园西侧靠东向南'
        },
        {
          value: '3',
          label: '生米820（全智能）文青村李家01'
        },
        {
          value: '4',
          label: '生米482（全智能）夏宇下岗邓家西面支路'
        },
        {
          value: '5',
          label: '生米790（全智能）山图村委门口'
        },
        {
          value: '6',
          label: '九龙湖1546（全智能）华南东一路西站瑞都西门内01'
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
  /deep/ .el-slider__marks-text {
    margin-top: -28px !important;
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
