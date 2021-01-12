<template>
  <div class="quickEntry">
    <div class="title">
      快捷入口
    </div>
    <div class="shuaxin"></div>
    <div class="box">
      <div
        class="box-list"
        v-for="(item, index) in list"
        :key="index"
        @click="toChange(index)"
      >
        <svg-icon :icon-class="item.icon" class="icon" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          icon: 'ling-dao',
          title: '领导视察'
        },
        {
          icon: 'email',
          title: '邮件'
        },
        {
          icon: 'tong-xun',
          title: '通讯录'
        }
      ]
    }
  },
  methods: {
    toChange(index) {
      if (index === 0) {
        this.$router.push('/intelligentOffice/leaderInspection')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.quickEntry {
  position: relative;
  width: 100%;
  height: 257px;
  margin-bottom: 15px;
  background: url("~@/assets/image/officePortal/left-two.png") no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 46px;
    padding-left: 24px;
  }
  .shuaxin {
    width: 30px;
    height: 25px;
    background: url("~@/assets/image/officePortal/shuaxin.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .box {
    width: 100%;
    height: 115px;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    .box-list {
      margin: 0 30px;
      width: 115px;
      height: 115px;
      background: #00225c;
      text-align: center;
      padding-top: 15px;
      cursor: pointer;
      p {
        font-size: 18px;
        font-weight: 400;
        color: #3b9afe;
      }
      .icon {
        width: 50px;
        height: 50px;
        color: #3b9afe;
      }
    }
  }
}
</style>
