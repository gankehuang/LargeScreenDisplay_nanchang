<template>
  <div class="model">
    <div class="model-box">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="规则名称:" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入规则名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重点人员类型:">
              <el-select v-model="form.type" placeholder="请选择重点人员类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄:">
              <el-slider v-model="form.age"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族:">
              <el-input
                v-model="form.nation"
                placeholder="请输入民族"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码:">
              <el-input
                v-model="form.phone"
                placeholder="请输入手机号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号码:">
              <el-input
                v-model="form.ids"
                placeholder="请输入身份证号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚姻状况:">
              <el-select v-model="form.marriage" placeholder="请选择婚姻状况">
                <el-option
                  v-for="item in marriageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历情况:">
              <el-select v-model="form.education" placeholder="请选择学历情况">
                <el-option
                  v-for="item in educationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就业情况:">
              <el-select v-model="form.job" placeholder="请选择就业情况">
                <el-option
                  v-for="item in jobOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社保缴纳:">
              <el-select v-model="form.security" placeholder="请选择社保缴纳">
                <el-option
                  v-for="item in securityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税情况:">
              <el-input
                v-model="form.condition"
                placeholder="请输入纳税情况"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房产数量:">
              <el-input
                v-model="form.number"
                placeholder="请输入房产数量"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小孩数量:">
              <el-select v-model="form.kid" placeholder="请选择小孩数量">
                <el-option
                  v-for="item in kidOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人信息:">
              <el-select v-model="form.legal" placeholder="请选择法人信息">
                <el-option
                  v-for="item in legalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="涉事案件:">
              <el-select v-model="form.case" placeholder="请选择涉事案件">
                <el-option
                  v-for="item in caseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否购车:">
              <el-radio-group v-model="form.purchase">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.purchase == 1">
            <el-form-item label="车牌号码:">
              <el-input
                v-model="form.busNumber"
                placeholder="请输入车牌号码"
              ></el-input>
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
