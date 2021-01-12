<template>
  <div class="modal">
    <img
      class="btn-close"
      src="@/assets/image/common/close-btn.png"
      @click="bindBtnClose"
    />
    <div class="title">群防力量</div>
    <div class="body">
      <div class="content1">
        <el-tree
          :data="departmentTree"
          expand-on-click-node
          default-expand-all
          show-checkbox
          accordion
          node-key="serialNumber"
          @check="bindTreeCheck"
          ref="tree"
        >
          <div class="node" slot-scope="{ node, data }">
            <img
              v-if="node.isLeaf"
              class="img-device"
              :class="!data.isOnline && 'inactive'"
              src="@/assets/image/command/device.png"
            />
            <span>{{ node.label }}</span>
          </div>
        </el-tree>
      </div>
      <div class="content2 checked">
        <div
          class="item"
          v-for="serialNumber in checked"
          :key="serialNumber"
          @click="removeDevice(serialNumber)"
        >
          {{ serialNumber }}
          <img src="@/assets/image/command/label-remove.png" />
        </div>
      </div>
      <div class="content2 msg">
        <textarea v-model="text" placeholder="请输入信息"></textarea>
      </div>
      <div class="btn">
        <button @click="startMonitor">视频调度</button>
        <button @click="startVoice">临时组呼</button>
        <button @click="sendMessage">文字广播</button>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '@/api/intelligentCommand/command'
export default {
  props: {
    devices: Array,
    selectedDevices: Array
  },
  data() {
    return {
      checked: [],
      text: ''
    }
  },
  computed: {
    departmentTree() {
      if (this.devices.length === 0) {
        return []
      }
      const list = this.devices.map(item => {
        return {
          label: item.nickName,
          isOnline: item.isOnline,
          lon: item.lon,
          lat: item.lat,
          serialNumber: item.serialNumber,
          id: item.id
        }
      })
      return [
        {
          label: this.$store.getters['user/address'],
          children: list
        }
      ]
    }
  },
  mounted() {
    this.checked = this.selectedDevices.map(item => item.serialNumber)
    this.$refs['tree'].setCheckedKeys(this.checked)
  },
  methods: {
    bindBtnClose() {
      this.$emit('bindBtnClose')
    },
    bindTreeCheck() {
      this.checked = this.$refs['tree']
        .getCheckedKeys()
        .filter(item => Boolean(item))
    },
    removeDevice(serialNumber) {
      this.checked = this.checked.filter(item => item !== serialNumber)
      this.$refs['tree'].setCheckedKeys(this.checked)
    },
    startVoice() {
      const checkedDevices = this.devices.filter(item =>
        this.checked.includes(item.serialNumber)
      )
      const ids = checkedDevices.map(item => item.id)
      this.$parent.showVoice(ids)
    },
    startMonitor() {
      const checkedDevices = this.devices.filter(item =>
        this.checked.includes(item.serialNumber)
      )
      const ids = checkedDevices.map(item => item.id)
      const router = this.$router.resolve({
        path: '/intelligentCommand/command/scheduling',
        query: { id: ids }
      })
      window.open(router.href, '_blank')
    },
    async sendMessage() {
      if (!this.text) {
        this.$message.error('请输入信息！')
        return
      }
      const checkedDevices = this.devices.filter(item =>
        this.checked.includes(item.serialNumber)
      )
      const ids = checkedDevices.map(item => item.id)
      await sendMessage(this.text, ids)
      this.$message.success('发送成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/image/common/modal-bg.png");
  width: 666px;
  height: 610px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 12px 7px 6px 6px;
  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
  .title {
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #00ffff;
    font-weight: bold;
    border-bottom: 1px solid #0b61a0;
  }
  .body {
    height: calc(100% - 36px);
    padding: 18px 23px 72px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    position: relative;
    .content1 {
      background: url("~@/assets/image/command/modal-content1.png") no-repeat;
      width: 354px;
      height: 466px;
    }
    .content2 {
      background: url("~@/assets/image/command/modal-content2.png") no-repeat;
      width: 243px;
      height: 225px;
      align-items: baseline;
      align-content: baseline;
      &.checked {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        .item {
          color: #fff;
          font-size: 12px;
          padding: 10px 12px;
          margin-right: 4px;
          margin-bottom: 4px;
          background-color: #199ccb;
        }
      }
      &.msg textarea {
        font-size: 14px;
        color: #fff;
        width: 100%;
        height: 100%;
        background: transparent;
        outline: none;
        resize: none;
        border: none;
        padding: 15px;
        line-height: 28px;
        &::placeholder {
          color: #aaa;
        }
      }
    }
    .btn {
      text-align: right;
      position: absolute;
      bottom: 20px;
      right: 14px;
      button {
        background: url("~@/assets/image/command/submit-btn.png");
        width: 104px;
        height: 38px;
        border: none;
        outline: none;
        color: #fff;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
}

.node {
  position: relative;
  width: 100%;
  .img-device {
    margin-right: 8px;
    &.inactive {
      filter: grayscale(1);
    }
  }
  .img-right {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 2px;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
