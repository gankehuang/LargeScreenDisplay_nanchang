<template>
  <div
    v-if="visible"
    class="shade"
  >
    <div class="container">
      <div class="title">
        权限设置
      </div>
      <div
        class="close"
        @click="closeModal"
      >
        <img
          src="@/assets/image/layout/close.png"
          alt=""
        >
      </div>
      <div class="line">
        <div class="label">
          角色名称
        </div>
        <div class="select">
          <el-select
            v-model="selected"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div
        class="line"
        style="height: 500px;"
      >
        <div class="label">
          权限分配
        </div>
        <el-scrollbar style="width: 1140px;height: 100%;">
          <div class="right">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="check"
            >
              <el-checkbox
                v-model="checkAll[index].status"
                style="width: 200px;"
                @change="handleCheckAllChange"
              >
                {{ item.selectAll }}
              </el-checkbox>
              <el-checkbox-group
                v-model="checkedCities[index]"
                @change="handleCheckedCitiesChange(index)"
              >
                <el-checkbox
                  v-for="city in item.authorityList"
                  :key="city"
                  :label="city"
                >
                  {{ city }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="buttons">
        <div
          class="button"
          @click="closeModal"
        >
          取消
        </div>
        <div
          class="button"
          @click="sureModal"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  data () {
    return {
      selected: '',
      isIndeterminate: '',
      checkAll: [],
      checkedCities: [],
      list: [
        {
          selectAll: '智汇数据',
          authorityList: ['查看', '添加', '修改', '删除']
        },
        {
          selectAll: '网格',
          authorityList: ['网格轮廊查看', '网格数据详情', '导出']
        },
        {
          selectAll: 'AI研判',
          authorityList: ['查看', '自定义模型', '修改模型', '删除模型']
        },
        {
          selectAll: '重点人群',
          authorityList: ['查看', '轨迹查询', '新增', '删除', '搜索']
        },
        {
          selectAll: '重点区域',
          authorityList: ['查看', '防空圈', '新增', '修改', '删除']
        },
        {
          selectAll: '重点水域',
          authorityList: ['查看', '新增', '修改', '删除']
        },
        {
          selectAll: '政法舆情',
          authorityList: ['查看', '报告导出', '关键词', '预警信息']
        },
        {
          selectAll: '流动人口',
          authorityList: ['查看', '新增', '修改', '删除']
        },
        {
          selectAll: '出租房屋',
          authorityList: ['查看', '新增', '修改', '删除']
        },
        {
          selectAll: '融合指挥',
          authorityList: ['查看', '视频查看', '预案添加', '调度']
        },
        {
          selectAll: '智汇数据',
          authorityList: ['查看', '添加', '修改', '删除']
        },
        {
          selectAll: '平安态势',
          authorityList: ['查看', '报表导出']
        },
        {
          selectAll: '警情态势',
          authorityList: ['查看', '报表导出']
        },
        {
          selectAll: '访情态势',
          authorityList: ['查看', '报表导出']
        },
        {
          selectAll: '智惠服务',
          authorityList: ['事项通办', '预警处置', '活动指挥', '县区督导']
        },
        {
          selectAll: '智效办公',
          authorityList: [
            '办公门户',
            '信息发布',
            '材料报送',
            '收发文',
            '领导视察'
          ]
        },
        {
          selectAll: '智慧搜索',
          authorityList: ['搜索']
        },
        {
          selectAll: '视频',
          authorityList: ['预览', '详情', '新增', '修改', '删除']
        },
        {
          selectAll: '图片采集',
          authorityList: [
            '人脸抓拍查看',
            '人脸抓拍导出',
            '车辆抓拍查看',
            '车辆抓拍导出'
          ]
        },
        {
          selectAll: '轨迹分析',
          authorityList: ['查看轨迹']
        },
        {
          selectAll: '人员档案',
          authorityList: ['档案搜索', '档案详情', '档案合并']
        },
        {
          selectAll: '部门管理',
          authorityList: ['部门查看', '部门添加', '部门修改', '部门删除']
        },
        {
          selectAll: '账号管理',
          authorityList: ['账号查看', '账号添加', '账号修改', '账号删除']
        },
        {
          selectAll: '角色管理',
          authorityList: ['角色查看', '角色添加', '角色修改', '角色删除']
        },
        {
          selectAll: '平台配置',
          authorityList: ['查看', '新增', '修改', '删除']
        },
        {
          selectAll: '黑名单管理',
          authorityList: ['查看', '新增', '修改', '删除']
        },
        {
          selectAll: '隐私过滤',
          authorityList: ['无密码查看', '密码查看']
        },
        {
          selectAll: '操作记录',
          authorityList: ['查看']
        },
        {
          selectAll: '系统配置',
          authorityList: ['查看', '修改']
        }
      ],
      options: [
        {
          value: 0,
          label: '东湖区综治中心'
        },
        {
          value: 1,
          label: '西湖区综治中心'
        },
        {
          value: 2,
          label: '青山湖区综治中心'
        },
        {
          value: 3,
          label: '青云谱区综治中心'
        },
        {
          value: 4,
          label: '红谷滩区综治中心'
        },
        {
          value: 5,
          label: '新建区综治中心'
        },
        {
          value: 6,
          label: '南昌县区综治中心'
        },
        {
          value: 7,
          label: '安义县区综治中心'
        },
        {
          value: 8,
          label: '进贤县区综治中心'
        },
        {
          value: 9,
          label: '高新区区综治中心'
        },
        {
          value: 10,
          label: '经开区区综治中心'
        },
        {
          value: 11,
          label: '湾里局区综治中心'
        }
      ]
    }
  },
  mounted () {
    for (let i = 0; i < this.list.length; i++) {
      this.checkAll.push({ status: false })
      this.checkedCities.push([])
    }
    // this.checkedCities[3] = ['查看', '轨迹查询', '新增']
  },
  methods: {
    closeModal () {
      this.$emit('update:visible', false)
    },
    sureModal () {
      this.$emit('update:visible', false)
      this.$message.success('权限修改成功！')
    },
    handleCheckedCitiesChange (index) {
      this.checkAll[index].status =
        this.list[index].authorityList.length ===
        this.checkedCities[index].length
    },
    handleCheckAllChange () {
      this.checkAll.forEach((item, index) => {
        if (item.status) {
          this.checkedCities[index] = this.list[index].authorityList
        } else {
          this.checkedCities[index] = []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  .container {
    position: absolute;
    left: 15%;
    top: 7%;
    width: 70.4%;
    height: 85.5%;
    padding: 30px 60px 0;
    color: #a9daff;
    background: url("~@/assets/image/layout/authority-bg.png") no-repeat center;
    background-size: 100% 100%;
    .title {
      line-height: 100px;
      font-size: 24px;
      font-weight: bold;
    }
    .close {
      position: absolute;
      top: 34px;
      right: 34px;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
      }
    }
    .line {
      display: flex;
      margin-top: 29px;
      .label {
        line-height: 40px;
        font-size: 16px;
        margin-right: 23px;
      }
      .el-select {
        width: 280px;
        height: 40px;
        background: url("~@/assets/image/layout/select-bg.png") no-repeat center;
        background-size: 100% 100%;
        /deep/.el-input__inner {
          height: 40px;
          line-height: 40px;
          color: #a9daff;
        }
      }
      .right {
        .check {
          display: flex;
          width: 1140px;
          height: 40px;
          margin-bottom: 10px;
          background: url("~@/assets/image/layout/authority-line-bg.png")
            no-repeat center;
          background-size: 100% 100%;
        }
        .el-checkbox {
          line-height: 40px;
          padding-left: 15px;
          color: #a9daff;
        }
      }
    }
  }
  .buttons {
    width: 280px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    .button {
      width: 120px;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      color: #a9daff;
      text-align: center;
      background: url("~@/assets/image/layout/authority-button.png") no-repeat
        center;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
</style>
