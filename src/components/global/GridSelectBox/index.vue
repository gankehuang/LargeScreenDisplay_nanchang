<template>
  <el-cascader
    ref="input"
    placeholder="请选择所属网格"
    :props="gridCodeProps"
    @expand-change="change"
  />
</template>
<script>

import { queryGridByParentId } from '@/api/intelligentService/socialGovernance'

/**
 * @param backValue required: false, type: Function, default value: () => {}, 返回数据给父组件
 * @param inputValue required: false, type: String, default value: '', input 输入框显示的文字
 */

export default {
  components: {
  },
  props: {
    backValue: {
      type: Function,
      default: () => {}
    },
    inputValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gridCodeProps: {
        lazy: true,
        // checkStrictly: true,
        lazyLoad: async (node, resolve) => {
          const { data } = node
          let parentId = ''
          if (data && data.id) {
            parentId = data.id
          }
          resolve(await this.getPlace(parentId))
        }
      }
    }
  },
  watch: {
    inputValue (newValue) {
      this.$refs.input.$el.firstElementChild.firstElementChild.value = newValue
    }
  },
  methods: {
    async getPlace (parentId) {
      const { status, data } = await queryGridByParentId({ parentId: parentId })
      if (status === 200) {
        return data.map(item => ({
          value: { id: item.id, label: item.gridName, code: item.gridCode },
          label: item.gridName,
          id: item.id,
          code: item.gridCode,
          leaf: item.gridLevel >= 6
        }))
      }
    },
    change (e) {
      if (!this.inputValue) {
        this.$refs.input.$el.firstElementChild.firstElementChild.value = e.map(item => item.label).join('/')
      }
      if (this.backValue) {
        this.backValue(e)
      }
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
