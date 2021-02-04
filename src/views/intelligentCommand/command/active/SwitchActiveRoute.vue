<template>
  <div class="active-select">
    <div class="select-drop">
      <el-select
        v-model="selectedActive"
        value-key="id"
        placeholder="省委常委、政法委书记尹建业通知调研南昌市推进市域社会治理现代化工作情况安排"
      >
        <el-option
          v-for="item in activeList"
          :key="item.id"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </div>
    <div
      class="button"
      @click="switchRoute()"
    >
      活动路线
    </div>
  </div>
</template>

<script>
import { selectActivityBasePage } from '@/api/intelligentCommand/command'
export default {
  props: {},
  data () {
    return {
      activeList: [],
      selectedActive: {}
    }
  },
  created () {
    this.fetchActiveList()
  },
  methods: {
    fetchActiveList () {
      selectActivityBasePage(1, 10).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.activeList = [...data]

          if (this.activeList && this.activeList.length) {
            this.selectedActive = this.activeList[0]
            // 设置默认活动路线
            this.$emit('switchActiveRoute', this.selectedActive)
          }
        }
      })
    },
    // 切换活动路线
    switchRoute () {
      this.$emit('switchActiveRoute', this.selectedActive)
    }
  }
}
</script>

<style lang="scss" scoped>
.active-select {
  position: absolute;
  right: 25%;
  top: 12%;
  z-index: 99;
  display: flex;
  .select-drop {
    width: 312px;
    height: 36px;
    background: url("~@/assets/image/command/drop-bg.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    .el-select {
      width: 100%;
      height: 36px;
      ::v-deep .el-input__inner {
        border: 0;
      }
    }
  }
  .button {
    width: 86px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    color: #a9daff;
    margin-left: 10px;
    text-align: center;
    background: url("~@/assets/image/command/button-bg.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
