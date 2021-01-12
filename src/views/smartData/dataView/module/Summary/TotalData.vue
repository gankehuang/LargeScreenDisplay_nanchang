<template>
  <div class="total-data">
    <div class="grid-point">
      <div class="grid-module">
        <h1>{{ totalData.area }}</h1>
        <p>{{ totalData.name }}区域面积</p>
      </div>
    </div>
    <div class="grid-into">
      <div class="grid-module">
        <h1>{{ totalData.produce }}</h1>
        <p>经济生产总值(GDP)</p>
      </div>
    </div>
    <div class="grid-condition">
      <div class="condition">
        <p>实有事件</p>
      </div>
      <div class="condition-box">
        <ul>
          <li>
            <h1>{{ totalData.totalThing }}<span>件</span></h1>
            <p>案事件总数</p>
          </li>
          <li>
            <h1>{{ totalData.endThing }}<span>件</span></h1>
            <p>处置完成</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalData: { type: Object, value: () => {} }
  }
}
</script>

<style lang="scss" scoped>
.total-data {
  width: 100%;
  height: 83px;
  p {
    margin: 0;
  }
  .grid-module {
    width: 205px;
    text-align: center;
    padding-top: 10px;
    cursor: pointer;
    h1 {
      margin: 0px;
      padding: 0px;
      font-size: 28px;
      line-height: 40px;
      color: #e6b00e;
    }
    p {
      margin: 0px;
      padding: 0px;
      font-size: 16px;
      line-height: 22px;
      color: #aadaff;
    }
  }
  .grid-point {
    display: inline-block;
    width: 212px;
    height: 83px;
    margin-right: 3px;
    background: url("~@/assets/image/dataView/gridding.png") no-repeat center
      center;
  }
  .grid-into {
    display: inline-block;
    width: 205px;
    height: 83px;
    margin-right: 3px;
    background: url("~@/assets/image/dataView/gridding1.png") no-repeat center
      center;
  }
  .grid-condition {
    display: inline-block;
    vertical-align: bottom;
    width: 419px;
    height: 83px;
    background: url("~@/assets/image/dataView/webCon.png") no-repeat center
      center;
    // display: flex;
    // flex-direction: row;
    .condition {
      float: left;
      width: 87px;
      height: 33px;
      line-height: 16px;
      padding: 0px 28px;
      margin-top: 25px;
      color: #c2dfff;
      border-right: 1px solid #0cbafb;
    }
    .condition-box {
      float: left;
      width: calc(100% - 87px);
      ul {
        width: calc(100% - 40px);
        margin: 0px;
        padding: 0px;
        margin: 0px 20px;
        margin-top: 13px;
        list-style: none;
        li {
          float: left;
          width: 50%;
          text-align: center;
        }
      }
      h1 {
        color: #e6b00e;
        margin: 0px;
        padding: 0px;
        line-height: 30px;
        font-size: 28px;
        span {
          display: inline-block;
          margin-left: 5px;
          color: #fff;
          font-size: 16px;
          font-weight: normal;
        }
      }
      p {
        color: #aadaff;
        line-height: 22px;
      }
    }
  }
}
</style>
