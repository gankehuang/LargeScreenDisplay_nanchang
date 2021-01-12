<template>
  <div class="numList">
    <div class="left">
      <p>预警响应单位</p>
    </div>
    <div class="right">
      <div class="right-one" v-for="(item, index) in dataList" :key="index">
        {{ item.name }}<span class="one">{{ item.num }}</span
        ><span class="two">个</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          name: '卫健',
          num: '12312'
        },
        {
          name: '公安',
          num: '12312'
        },
        {
          name: '政法',
          num: '12312'
        },
        {
          name: '教育',
          num: '12312'
        },
        {
          name: '司法',
          num: '12312'
        },
        {
          name: '应急',
          num: '12312'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.numList {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 160px;
    height: 100%;
    display: flex;
    padding: 20px 15px 0 15px;
    align-items: center;
    p {
      width: 100%;
      height: 50px;
      background: url("~@/assets/image/intelligentService/bottom-line.png")
        no-repeat;
      background-position: bottom;
      font-size: 18px;
      font-weight: bold;
      color: #3b9afe;
      text-align: center;
    }
  }
  .right {
    width: calc(100% - 160px);
    height: 100%;
    display: flex;
    .right-one {
      background: url("~@/assets/image/intelligentService/left-line.png")
        no-repeat;
      background-position: left;
      width: 16.6%;
      height: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #a9daff;
      padding-top: 40px;
      .one {
        font-size: 24px;
        color: #00ffff;
        display: inline-block;
        margin: 0 6px;
      }
      .two {
        font-size: 16px;
      }
    }
  }
}
</style>
