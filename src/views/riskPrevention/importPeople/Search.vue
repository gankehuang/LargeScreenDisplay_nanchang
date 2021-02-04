<template>
  <div
    class="search-btn"
  >
    <el-input
      v-model="searchKey"
      placeholder="请搜索人员名称"
    />
    <i
      class="search-icon"
      @click="toSearch"
    />
  </div>
</template>

<script>
import {
  getAcceptInfoByNo,
  getMentalInfoByNo,
  getReleaseInfoByNo,
  getVeteransInfoByNo
} from '@/api/riskPrevention/importPeople'
const personTypeFunc = {
  mentalDisease: getMentalInfoByNo,
  petitionLetter: getAcceptInfoByNo,
  retire: getVeteransInfoByNo,
  released: getReleaseInfoByNo,
  correct: getMentalInfoByNo
}

export default {
  props: {
    curPageType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchKey: ''
    }
  },
  methods: {
    // 搜索人员标记
    async toSearch () {
      const searchFunc = personTypeFunc[this.curPageType]
      const { status, data } = await searchFunc({ name: this.searchKey })
      if (status === 200) {
        if (data.length > 0) {
          this.$emit('searchPersonMarker', data)
        } else {
          this.$message.warning('暂无该人员信息')
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  position: absolute;
  top: 150px;
  left: 460px;
  z-index: 99;
  display: flex;
  width: 252px;
  height: 36px;
  background: url('~@/assets/image/common/组 106.png') no-repeat;
  background-size: 100% 100%;
  ::v-deep .el-input {
    width: calc(100% - 30px);
    height: 36px;
  }
  ::v-deep .el-input__inner {
    height: 36px;
    display: inline-block;
    border: none;
    &::placeholder {
      color: #2971c2;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .search-icon {
    width: 18px;
    height: 36px;
    background: url('~@/assets/image/common/搜索 (1).png') no-repeat 0 8px;
    cursor: pointer;
  }
}
</style>
