<template>
  <div class="search">
    <img src="@/assets/image/search3.png">
    <div
      class="search"
      @click="search"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    search () {
      this.$router.push({ path: '/search/second' })
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  height: calc(100% - 48px);
  position: relative;
  img {
    width: 100%;
    height: 100%;
    margin: 48px 0 0;
  }
  .search {
    width: 30px;
    height: 33px;
    position: absolute;
    top: 141px;
    right: 473px;
    // background: #000;
  }
}
</style>
<style>
.el-input__inner {
  height: 47px !important;
  line-height: 47px !important;
  border: none;
  background: #03223c;
}
</style>
