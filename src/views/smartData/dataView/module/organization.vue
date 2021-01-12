<template>
  <div class="organization">
    <div class="top">
      <div class="primary">
        <h1>基层党组织</h1>
        <ul>
          <li>
            <h2><i class="iconfont icon-wangge" /></h2>
            <h3>8989</h3>
            <p>红色网格</p>
          </li>
          <li>
            <h2><i class="iconfont icon-wuye" /></h2>
            <h3>8989</h3>
            <p>红色物业</p>
          </li>
          <li>
            <h2><i class="iconfont icon-yizhan" /></h2>
            <h3>8989</h3>
            <p>红色驿站</p>
          </li>
        </ul>
      </div>
      <div class="tissue">
        <h1>综治组织</h1>
        <ul class="data">
          <li class="security">
            <h3>12</h3>
            <p>综治中心</p>
          </li>
          <li class="civil">
            <h3>999</h3>
            <p>综治责任单位</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="fors">
        <h1>群防群治组织</h1>
        <ul class="data">
          <li class="data1">
            <h3>8989</h3>
            <p>志愿者队伍</p>
          </li>
          <li class="data2">
            <h3>8989</h3>
            <p>义务巡逻队</p>
          </li>
          <li class="data3">
            <h3>8989</h3>
            <p>专职巡逻队</p>
          </li>
        </ul>
      </div>
      <div class="society">
        <h1>社会组织</h1>
        <ul>
          <li>
            <p class="connected">
              <span class="title"><i class="iconfont icon-health-ecg"/></span
              ><span class="unit">心防组织</span
              ><strong class="num">8989</strong>
            </p>
          </li>
          <li>
            <p class="connected">
              <span class="title"><i class="iconfont icon-falvyuanzhu"/></span
              ><span class="unit">法律援助组织</span
              ><strong class="num">8989</strong>
            </p>
          </li>
          <li>
            <p class="connected">
              <span class="title"><i class="iconfont icon-woshou"/></span
              ><span class="unit">人民调解组织</span
              ><strong class="num">8989</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.organization {
  float: right;
  ul,
  h1,
  h2,
  h3,
  p {
    margin: 0px;
    padding: 0px;
    list-style: none;
  }
  .top {
    width: 100%;
    height: 280px;
    .primary {
      float: left;
      width: 429px;
      height: 280px;
      background: url("~@/assets/image/dataView/primary.png") no-repeat center
        center;
      h1 {
        font-size: 16px;
        color: #7ebcff;
        padding: 7px 0px 0px 22px;
      }
      ul {
        margin: 50px 20px;
        text-align: center;
        li {
          float: left;
          width: calc(100% / 3);
          h2 {
            i {
              font-size: 50px;
              color: #7ebcff;
              font-weight: normal;
            }
          }
          h3 {
            margin-top: 20px;
            font-size: 26px;
            color: #7ebcff;
          }
          p {
            font-size: 16px;
            color: #fff;
          }
        }
      }
    }
    .tissue {
      float: right;
      width: 426px;
      height: 280px;
      background: url("~@/assets/image/dataView/tissue.png") no-repeat center
        center;
      h1 {
        text-align: right;
        font-size: 16px;
        color: #7ebcff;
        padding: 7px 22px 0px 0px;
      }
      .data {
        margin: 25px 20px 0px 20px;
        padding: 0px;
        height: 136px;
        list-style: none;
        li {
          float: left;
          width: 50%;
          height: 126px;
          text-align: center;
          padding-top: 114px;
          &.security {
            background: url("~@/assets/image/dataView/centre.png") no-repeat
              center top;
          }
          &.civil {
            background: url("~@/assets/image/dataView/duty.png") no-repeat
              center top;
          }
          p {
            margin: 0px;
            padding: 0px;
            font-size: 14px;
            color: #fff;
            background: url("~@/assets/image/dataView/zidi.png") no-repeat
              center top;
          }
          h3 {
            margin: 0px;
            padding: 0px;
            font-size: 26px;
            line-height: 40px;
            color: #a9daff;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 279px;
    .fors {
      float: left;
      width: 420px;
      height: 279px;
      background: url("~@/assets/image/dataView/zuzhi.png") no-repeat center
        center;
      h1 {
        font-size: 16px;
        color: #7ebcff;
        padding: 7px 0px 0px 22px;
      }
      .data {
        margin: 45px 20px 0px 20px;
        padding: 0px;
        height: 108px;
        list-style: none;
        li {
          float: left;
          width: calc(100% / 3);
          height: 108px;
          text-align: center;
          padding-top: 54px;
          &.data1 {
            background: url("~@/assets/image/dataView/fors1.png") no-repeat
              center top;
          }
          &.data2 {
            background: url("~@/assets/image/dataView/fors2.png") no-repeat
              center top;
          }
          &.data3 {
            background: url("~@/assets/image/dataView/fors3.png") no-repeat
              center top;
          }
          p {
            margin: 0px;
            padding: 0px;
            font-size: 14px;
            color: #fff;
          }
          h3 {
            margin: 0px;
            padding: 0px;
            font-size: 24px;
            line-height: 40px;
            color: #fff;
            margin-bottom: 30px;
          }
        }
      }
    }
    .society {
      float: right;
      width: 420px;
      height: 279px;
      background: url("~@/assets/image/dataView/zuzhi.png") no-repeat center
        center;
      h1 {
        font-size: 16px;
        color: #7ebcff;
        padding: 7px 0px 0px 22px;
      }
      ul {
        margin-top: 30px;
      }
      li {
        height: 55px;
        margin-bottom: 10px;
        background: url("~@/assets/image/dataView/society.png") no-repeat center
          center;
        .connected {
          height: 38px;
          line-height: 38px;
          margin: 0px 50px;
          padding: 8px 0px;
          .title {
            width: 38px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            display: inline-block;
            font-size: 16px;
            font-weight: 400;
            color: #ffffff;
            border: 1px solid #0b53a2;
            border-radius: 4px;
            i {
              font-size: 20px;
              color: #0084ff;
            }
          }
          .unit {
            margin-left: 20px;
            font-size: 16px;
            color: #fff;
          }
          .num {
            float: right;
            font-size: 24px;
            color: #fff;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
