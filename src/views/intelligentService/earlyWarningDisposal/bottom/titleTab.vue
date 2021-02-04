<!-- 头部按钮组件 -->
<template>
  <div
    class="form-page"
  >
    <div
      class="search-bar"
      style="padding: 0px"
    >
      <el-button
        plain
        :disabled="!selection.length"
        icon="el-icon-delete"
        @click="deleteAll"
      >
        批量删除
      </el-button>
      <div class="searchType">
        <div
          v-for="(item, index) in typeList"
          :key="index"
          :class="['searchTypeList', { isactive: index === tab }]"
          @click="switchTab(index, item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

/**
 * @param typeList required: true, type: Array, default value: [] 用于接收需要渲染的列表按钮
 * @param selection required: true, type: Function, default value: [] 用于接收需要删除的列表数据
 * @param backValue required: false, type: Function, default value: () => {} 用于把选中按钮的数据暴露给父组件
 * @param del required: false, type: Function, default value: () => {} 用于删除数据的方法
 */

export default {
  components: {
  },
  props: {
    typeList: {
      type: Array,
      required: true,
      default: () => ([])
    },
    selection: {
      type: Array,
      required: true,
      default: () => ([])
    },
    backValue: {
      type: Function,
      required: false,
      default: () => {}
    },
    del: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    // 切换 事件类型的方法
    switchTab (index, item) {
      this.tab = index
      if (this.backValue) {
        this.backValue(item.value)
      }
    },
    // 删除全部按钮的方法
    deleteAll () {
      if (this.del) {
        this.del(this.selection)
      }
    }
  }

}
</script>
<style lang='scss' scoped>
@import '~@/styles/form.scss';
</style>
