<!-- 搜索组件 -->

<template>
  <div class="elt-sm-right-box">
    <GridSelectBox
      :back-value="getSelectList"
    />
    <el-button
      type="primary"
      class="elt-sm-search-btn"
      @click="searchBtn"
    >
      查询
    </el-button>
    <el-button
      plain
      class="elt-sm-high-search-btn"
      @click="visible = true"
    >
      高级搜索
    </el-button>
    <span
      class="back-btn"
      @click="backPage"
    >
      <svg-icon icon-class="page-back" />
      返回
    </span>
    <HighSearchModal
      :page-name="pageName"
      :visible="visible"
      :close="() => visible = false"
      :high-search="highSearch"
    />
  </div>
</template>
<script>

/**
 * @param backValue required: true, type: Function, 向父组件返回数据
 * @param pageName type: String
 */

import HighSearchModal from './highSearchModal'

export default {
  components: {
    HighSearchModal
  },
  props: {
    backValue: {
      type: Function,
      default: () => {},
      required: true
    },
    pageName: String
  },
  data () {
    return {
      searchList: [],
      visible: false,
      inputValue: ''
    }
  },
  methods: {

    // 返回上一页的方法
    backPage () {
      this.$EventBus.$emit('backPage', {
        pageName: 'home',
        pageType: 'home'
      })
    },

    // 搜索的方法
    searchBtn () {
      if (this.backValue) {
        this.backValue(this.searchList, null)
      }
    },
    getSelectList (e) {
      this.searchList = e
      this.inputValue = e.map(item => item.label).join('/')
    },
    highSearch (e) {
      if (this.backValue) {
        this.backValue(null, e)
      }
    }
  }

}
</script>
<style lang='scss' scoped>

.elt-sm-right-box {
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .elt-sm-search-btn {
    margin-left: 10px;
  }

  .elt-sm-high-search-btn {
    background-color: #1a418f;
    border: 1px solid #1a418f;
    color: #ffffff;

    &:hover {
      background-color: #344050;
      border: 1px solid #344050;
    }

    &:focus {
      background-color: #344050;
      border: 1px solid #344050;
    }
  }
}
.back-btn {
  color: #98caff;
  margin-left: 25px;
  cursor: pointer;
}

</style>
