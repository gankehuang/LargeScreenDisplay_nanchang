<template>
  <Dialog
    v-if="info"
    width="35%"
    top="15vh"
    :title="modalTitle"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @open="openBefore"
  >
    <div class="left-tree">
      <el-scrollbar style="height: 100%;">
        <el-tree
          ref="tree"
          :data="groupList"
          :expand-on-click-node="false"
          show-checkbox
          accordion
          :default-expanded-keys="['网格员']"
          node-key="id"
          :default-expand-all="modalTitle === '事件上报'"
          @check="bindTreeCheck"
        >
          <div
            slot-scope="{ node, data }"
            class="node"
          >
            <img
              v-if="node.isLeaf"
              class="img-device"
              :class="data.active || 'inactive'"
              src="@/assets/image/warning/device.png"
            >
            <span>{{ node.label }} {{ data.phone ? "-" + data.phone : "" }}</span>
          </div>
        </el-tree>
      </el-scrollbar>
    </div>

    <div class="content-right">
      <el-scrollbar style="height: 230px;">
        <div class="right-block checked-box">
          <div
            v-for="item in checkedList"
            :key="item.name"
            class="item"
            @click="removeChecked(item.name)"
          >
            {{ item.name }}
            <img src="@/assets/image/warning/label-remove.png">
          </div>
        </div>
      </el-scrollbar>

      <div class="right-block msg">
        <textarea
          v-model="sendMsg"
          placeholder="请输入信息"
        />
      </div>
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
        @click="handleBtn('发送')"
      >
        发送
      </div>
    </template>
  </Dialog>
</template>
<script>
import { eventAssign, getGroupForce, queryOrgMember } from '@/api/intelligentCommand/warning'

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
      groupList: [],
      checkedList: [],
      sendMsg: ''
    }
  },
  computed: {
    modalTitle () {
      return `事件${this.info.btnTypeText}`
    }
  },
  methods: {
    // 打开弹框的回调
    openBefore () {
      if (this.modalTitle === '事件指派') {
        this.getGroupForce()
      } else if (this.modalTitle === '事件上报') {
        this.queryOrgMember()
      }
    },
    // 打开弹框
    openModal () {
      this.dialogVisible = true
    },
    // 关闭弹框
    closeModal () {
      this.groupList = []
      this.sendMsg = ''
      this.checkedList = []
      this.dialogVisible = false
    },
    // 事件指派获取数据
    getGroupForce () {
      getGroupForce({
        gridCode: this.info.gridCode,
        eventId: this.info.id
      }).then(res => {
        const classObj = {}
        classObj['网格员'] = []
        if (this.peopleLabel && this.peopleLabel.indexOf('精神') > -1) {
          res.data.forEach((item, index) => {
            if (item.industryTypeName && index === 1) {
              classObj['法定监护人'] = [item]
            } else if (item.industryTypeName && index === 2) {
              classObj['精防人员'] = [item]
            } else if (item.industryTypeName && index === 3) {
              classObj['社区干部'] = [item]
            } else if (item.industryTypeName && index === 4) {
              classObj['社区民警'] = [item]
            } else if (item.industryTypeName && index !== 5) {
              classObj['' + item.industryTypeName + ''] = [item]
            } else {
              classObj['网格员'].push(item)
            }
          })
        } else {
          res.data.forEach(item => {
            if (item.industryTypeName) {
              if (!classObj['' + item.industryTypeName + '']) {
                classObj['' + item.industryTypeName + ''] = [item]
              } else {
                classObj['' + item.industryTypeName + ''].push(item)
              }
            } else {
              classObj['网格员'].push(item)
            }
          })
        }

        const controlTeamList = []
        for (const key in classObj) {
          let needArr = []
          if (classObj[key].length) {
            if (
              key === '法定监护人' ||
              key === '精防人员' ||
              key === '社区干部' ||
              key === '社区民警'
            ) {
              needArr = classObj[key].map(item1 => {
                return {
                  id: item1.id,
                  label: item1.name,
                  name: item1.name,
                  active: false,
                  phone: item1.phone
                }
              })

              controlTeamList.push({
                label: key,
                name: key,
                children: needArr
              })
            } else {
              needArr = classObj[key].map(item1 => {
                return {
                  id: item1.id,
                  label: item1.name,
                  name: item1.name,
                  active: false,
                  phone: item1.phone
                }
              })

              this.groupList.push({
                label: key,
                name: key,
                children: needArr
              })
            }
          }
        }

        this.groupList.splice(1, 0, {
          label: '管控服务小组',
          name: '管控服务小组',
          children: controlTeamList
        })
      })
    },
    // 事件上报获取数据
    queryOrgMember () {
      queryOrgMember({
        orgId: '2370',
        type: 0
      }).then(res => {
        let needArr = []
        if (res.data.list.length) {
          needArr = res.data.list.map(item1 => {
            return {
              id: item1.id,
              label: item1.name,
              name: item1.name,
              active: false,
              phone: item1.phone
            }
          })

          this.groupList.push({
            label: '市综治中心',
            children: needArr
          })
        }
      })
    },
    bindTreeCheck (data, nodes) {
      this.checkedList = this.$refs.tree.getCheckedNodes()
      if (this.checkedList.length) {
        this.checkedList = this.checkedList.filter(item => {
          return !item.children
        })
      }
    },
    removeChecked (deviceName) {
      this.checkedList = this.checkedList.filter(
        item => item.name !== deviceName
      )
      this.$refs.tree.setCheckedKeys(
        this.checkedList.map(item => item.name)
      )
    },
    async handleBtn (btnTypeText) {
      if (btnTypeText === '返回') {
        this.closeModal()
        this.$emit('onEventAssignmentReport')
        return
      }

      if (this.modalTitle === '事件指派') {
        const { status } = await eventAssign({
          desc: this.sendMsg,
          eventId: this.info.id,
          groupForceIdList: this.checkedList.map(item => {
            return item.id
          })
        })

        if (status === 200) {
          this.$message.success('发送成功')
          setTimeout(() => {
            this.closeModal()
            this.$emit('onEventAssignmentReport')
          }, 1000)
        }

        return
      }

      if (this.modalTitle === '事件上报') {
        this.$message.success('上报成功')
        setTimeout(() => {
          this.closeModal()
          this.$emit('onEventAssignmentReport')
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}
::v-deep .el-dialog__body {
  display: flex;
  justify-content: space-between;
}
.left-tree {
  width: 330px;
  height: 470px;
  padding: 10px;
  background: url("~@/assets/image/event/event-home-block-bg.png") no-repeat;
  background-size: 100% 100%;
  .img-device {
    margin-right: 10px;
  }
}

.content-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right-block {
  background: url("~@/assets/image/event/event-home-block-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 243px;
  height: 230px;
  padding: 15px;
  align-items: baseline;
  align-content: baseline;
  &.checked-box {
    display: flex;
    flex-wrap: wrap;
    .item {
      color: #fff;
      font-size: 12px;
      padding: 10px 12px;
      margin-right: 4px;
      margin-bottom: 4px;
      background-color: #199ccb;
      cursor: pointer;
    }
  }
  &.msg textarea {
    color: #fff;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    resize: none;
    border: none;
    line-height: 28px;
    &::placeholder {
      color: #aaa;
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
