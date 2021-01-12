<template>
  <div class="search-btns">
    <el-input
      v-model="keyWords"
      @focus="keyWords = ''"
      @change="searchByKeyWords"
      placeholder="请输入"
    >
    </el-input>
    <div class="searchIcon" @click="searchByKeyWords"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWords: ''
    }
  },
  methods: {
    searchByKeyWords() {
      this.$emit('searchByKeyWords', this.keyWords)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-btns {
  position: absolute;
  width: 252px;
  height: 36px;
  background: url("~@/assets/image/common/组 106.png");
  background-size: 100% 100%;
  top: 150px;
  right: 450px;
  display: inline-flex;
  .el-input {
    width: calc(100% - 30px);
    height: 36px;
  }
  /deep/.el-input__inner {
    height: 36px;
    display: inline-block;
    border: none;
    &::placeholder {
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }
  }
  .searchIcon {
    width: 18px;
    height: 36px;
    background-color: red;
    background: url("~@/assets/image/common/搜索 (1).png") no-repeat;
    background-position: 0 8px;
  }
}
</style>
