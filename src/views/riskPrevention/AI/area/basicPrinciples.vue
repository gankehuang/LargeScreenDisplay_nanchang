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
              label="重点区域名称:"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="请输入重点区域名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="model-map">
      <SimpleMap />
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
      center: [115.791124, 28.611357],
      map: null,
      mapEvents: {
        init: map => {
          this.map = map
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
          this.zoom = map.setZoom(11)
        }
      },
      form: {
        name: '',
        purchase: 2
      },
      rules: {
        name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
      },
      options: [
        {
          value: '0',
          label: '普通人员'
        },
        {
          value: '1',
          label: '严重精神障碍患者'
        },
        {
          value: '2',
          label: '重点信访人员'
        },
        {
          value: '3',
          label: '退役重点人员'
        },
        {
          value: '4',
          label: '刑释解戒人员'
        },
        {
          value: '5',
          label: '社区矫正人员'
        }
      ],
      labelOptions: [
        {
          value: '1',
          label: '党员'
        },
        {
          value: '2',
          label: '志愿者'
        },
        {
          value: '3',
          label: '楼栋长'
        },
        {
          value: '4',
          label: '物业'
        },
        {
          value: '5',
          label: '社会团体'
        }
      ],
      sexOptions: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      marriageOptions: [
        {
          value: '1',
          label: '已婚'
        },
        {
          value: '2',
          label: '未婚'
        },
        {
          value: '3',
          label: '再婚'
        },
        {
          value: '4',
          label: '离异'
        }
      ],
      educationOptions: [
        {
          value: '1',
          label: '小学'
        },
        {
          value: '2',
          label: '初中'
        },
        {
          value: '3',
          label: '高中'
        },
        {
          value: '4',
          label: '大专'
        },
        {
          value: '5',
          label: '本科'
        },
        {
          value: '6',
          label: '研究生'
        }
      ],
      jobOptions: [
        {
          value: '1',
          label: '已就业'
        },
        {
          value: '2',
          label: '未就业'
        }
      ],
      securityOptions: [
        {
          value: '1',
          label: '已缴纳'
        },
        {
          value: '2',
          label: '未缴纳'
        }
      ],
      kidOptions: [
        {
          value: '1',
          label: '1孩'
        },
        {
          value: '2',
          label: '2孩'
        },
        {
          value: '3',
          label: '3孩'
        },
        {
          value: '4',
          label: '4孩及以上'
        }
      ],
      legalOptions: [
        {
          value: '1',
          label: '企业名称'
        },
        {
          value: '2',
          label: '企业状态'
        },
        {
          value: '3',
          label: '注册资本'
        }
      ],
      caseOptions: [
        {
          value: '1',
          label: '矛盾纠纷'
        },
        {
          value: '2',
          label: '失信行为'
        },
        {
          value: '3',
          label: '刑事案件'
        },
        {
          value: '4',
          label: '信访情况'
        },
        {
          value: '5',
          label: '报警情况'
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
