<template>
  <div class="realhousing">
    <h1>实有房屋</h1>
    <ul>
      <li>
        <span class="title">小区总数</span><strong class="num">176</strong><span class="unit">个</span>
      </li>
      <li>
        <span class="title">房屋总数</span><strong class="num">189762</strong><span class="unit">间</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.realhousing {
  margin-top: 10px;
  display: inline-block;
  width: 431px;
  height: 121px;
  background: url("~@/assets/image/dataView/unit.png") no-repeat center center;
  h1 {
    text-align: left;
    font-size: 16px;
    color: #7ebcff;
    padding: 0px;
    margin: 10px 0px 0px 22px;
  }
  ul {
    width: 399px;
    margin: 22px 0px;
    padding: 0px;
    margin-left: 21px;
    list-style: none;
    li {
      float: left;
      width: 50%;
      margin-bottom: 10px;
      text-align: center;
      height: 55px;
      background: url("~@/assets/image/dataView/bg.png") no-repeat center bottom;
      cursor: pointer;
      .title {
        color: #fff;
        font-size: 16px;
      }
      .num {
        display: inline-block;
        margin: 0px 10px;
        color: #80f4e7;
        font-size: 20px;
      }
      .unit {
        color: #fff;
        font-size: 10px;
      }
    }
  }
}
</style>
