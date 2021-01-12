<template>
  <div class="search">
    <div class="title">
      <img src="@/assets/image/search/search-icon.png" />
      智慧搜索
    </div>
    <Search @search="search"></Search>
  </div>
</template>
<script>
import Search from '@/components/search'
export default {
  components: {
    Search
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    search(id, search) {
      this.$router
        .push({ path: '/search/second', query: { id: id, search: search }})
        .catch(() => {
          this.reload()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  height: 100%;
  background: url("../../assets/image/search/search1.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  .title {
    margin: 9% auto 4%;
    line-height: 84px;
    font-size: 36px;
    color: #fff;
    text-align: center;
    img {
      display: block;
      width: 128px;
      height: 102px;
      margin: 0 auto;
    }
  }
}
</style>
