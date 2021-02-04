<!-- 头部搜索组件 -->
<template>
  <div>
    <el-input
      v-model="advancedForm.eventName"
      class="search-input"
      placeholder="事件名称"
      clearable
    />
    <el-button
      type="primary"
      style="marginLeft: 10px"
      @click="searchBtn"
    >
      查询
    </el-button>
    <el-button
      plain
      @click="highSearchBtn"
    >
      高级搜索
    </el-button>

    <search-advance
      v-show="visible"
      style="top:496px"
    >
      <el-form
        ref="advancedForm"
        :model="advancedForm"
        label-width="140px"
      >
        <el-form-item label="事件名称">
          <el-input
            v-model="advancedForm.eventName"
            clearable
            class="search-input"
            style="width: 312px"
            placeholder="请输入事件名称"
          />
        </el-form-item>

        <el-form-item label="事件状态">
          <el-select
            v-model="advancedForm.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="未受理"
              value="1"
            />
            <el-option
              label="已派发"
              value="2"
            />
            <el-option
              label="已处置"
              value="3"
            />
            <el-option
              label="超时"
              value="4"
            />
            <el-option
              label="催单"
              value="5"
            />
            <el-option
              label="已归档"
              value="6"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件等级">
          <el-select
            v-model="advancedForm.emergencyLevel"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="一级"
              value="1"
            />
            <el-option
              label="二级"
              value="2"
            />
            <el-option
              label="三级"
              value="3"
            />
            <el-option
              label="四级"
              value="4"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件来源">
          <el-select
            v-model="advancedForm.source"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="督办协办"
              value="SUPERVISORY_CO_ORGANIZER"
            />
            <el-option
              label="群众上报"
              value="MASS_REPORT"
            />
            <el-option
              label="主动发现"
              value="ACTIVE_DISCOVERY"
            />
            <el-option
              label="设备感知"
              value="DEVICE_AWARENESS"
            />
            <el-option
              label="县区上报"
              value="DISTRICT_REPORT"
            />
            <el-option
              label="其他"
              value="OTHERS"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button
            type="primary"
            @click="searchAdvance"
          >
            查询
          </el-button>
          <el-button
            type="primary"
            @click="resetSearchForm"
          >
            重置
          </el-button>
          <el-button
            plain
            @click="visible = false"
          >
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </search-advance>
  </div>
</template>
<script>

/**
 * @param search required: false, type: Function, default value: () => {} 用于把要搜索的表单暴露给父组件
 */

export default {
  components: {
  },
  props: {
    search: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      advancedForm: {
        eventName: '',
        type: '',
        status: '',
        emergencyLevel: '',
        excludeEventCodeList: 'supervise',
        source: ''
      },
      visible: false
    }
  },
  methods: {
    // 查询 按钮的方法
    searchBtn () {
      if (this.search) {
        this.search(this.advancedForm)
      }
      this.advancedForm = this.$options.data().advancedForm
    },
    // 高级搜索 按钮的方法
    highSearchBtn () {
      this.visible = true
    },
    // 高级搜索 内的 查询按钮方法
    searchAdvance () {
      if (this.search) {
        this.search(this.advancedForm)
      }
      this.visible = false
      this.advancedForm = this.$options.data().advancedForm
    },
    // 高级搜索 重置表单
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
    }
  }

}
</script>
<style lang='scss' scoped>
@import '~@/styles/form.scss';
</style>
