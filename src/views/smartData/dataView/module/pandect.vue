<template>
  <div class="pandect">
    <div class="top">
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
          <p>实有人口</p>
        </div>
        <div class="condition-box">
          <ul>
            <li>
              <h1>560.06<span>万人</span></h1>
              <p>实有人口</p>
            </li>
            <li>
              <h1>550.06<span>万人</span></h1>
              <p>户籍人口</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="real-left">
        <h1>实有房屋</h1>
        <ul>
          <li>
            <span class="title">小区总数</span><strong class="num">300</strong
            ><span class="unit">个</span>
          </li>
          <li>
            <span class="title">房屋总数</span><strong class="num">400</strong
            ><span class="unit">间</span>
          </li>
        </ul>
      </div>
      <div class="real-right">
        <h1>实有事件</h1>
        <ul>
          <li>
            <span class="title">案事件总数</span
            ><strong class="num">12000</strong><span class="unit">件</span>
          </li>
          <li>
            <span class="title">处置完成</span><strong class="num">1210</strong
            ><span class="unit">件</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="population-left">
        <div class="video">
          <h1>公共视频</h1>
          <ul>
            <li>
              <span class="icon"><i class="iconfont icon-shexiangtou"/></span
              ><span class="title">天网总数</span><span class="line" /><strong
                class="num"
                >8989</strong
              ><span class="unit">个</span>
            </li>
            <li>
              <span class="icon"
                ><i class="iconfont icon-shujumofangdiwang"/></span
              ><span class="title">地网总数</span><span class="line" /><strong
                class="num"
                >999</strong
              ><span class="unit">个</span>
            </li>
            <li>
              <span class="icon"><i class="iconfont icon-diannao1"/></span
              ><span class="title">社会资源总数</span
              ><span class="line" /><strong class="num">999</strong
              ><span class="unit">个</span>
            </li>
          </ul>
        </div>
        <div class="govern">
          <h1>综治组织</h1>
          <ul>
            <li>
              <span class="icon"><i class="iconfont icon-target"/></span
              ><span class="title">综治中心</span
              ><span class="total"
                ><strong class="num">1</strong
                ><span class="unit">个</span></span
              >
            </li>
            <li>
              <span class="icon"><i class="iconfont icon-qunfangqunzhi"/></span
              ><span class="title">志愿者队伍</span
              ><span class="total"
                ><strong class="num">999</strong
                ><span class="unit">个</span></span
              >
            </li>
            <li>
              <span class="icon"><i class="iconfont icon-jigou"/></span
              ><span class="title">综治责任单位</span
              ><span class="total"
                ><strong class="num">19</strong
                ><span class="unit">个</span></span
              >
            </li>
            <li>
              <span class="icon"><i class="iconfont icon-quncequnfang"/></span
              ><span class="title">社会组织</span
              ><span class="total"
                ><strong class="num">999</strong
                ><span class="unit">人</span></span
              >
            </li>
            <li>
              <span class="icon"><i class="iconfont icon-duiwu"/></span
              ><span class="title">群防群治单位</span
              ><span class="total"
                ><strong class="num">999</strong
                ><span class="unit">个</span></span
              >
            </li>
            <li>
              <span class="icon"><i class="iconfont icon-zhiyuanzhe1"/></span
              ><span class="title">必防组织</span
              ><span class="total"
                ><strong class="num">999</strong
                ><span class="unit">个</span></span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="population-right">
        <h1>全网融通</h1>
        <h2>网汇数据</h2>
        <ul class="data">
          <li class="security">
            <p>70%</p>
            <h3>999</h3>
            <p>公安</p>
          </li>
          <li class="civil">
            <p>25%</p>
            <h3>268</h3>
            <p>民政</p>
          </li>
          <li class="club">
            <p>5%</p>
            <h3>56</h3>
            <p>人社</p>
          </li>
        </ul>
        <h2>网格管理</h2>
        <ul class="reseau">
          <li>
            <p>
              <span class="icon"><i class="iconfont icon-wangge1"/></span
              ><span class="title">网格总数</span>
            </p>
            <p class="pClass">
              <strong class="num">24</strong>
            </p>
          </li>
          <li>
            <p>
              <span class="icon"><i class="iconfont icon-renyuan"/></span
              ><span class="title">网格员数</span>
            </p>
            <p class="pClass">
              <strong class="num">999</strong>
            </p>
          </li>
          <li>
            <p>
              <span class="icon"
                ><i class="iconfont icon-ronghezongliang"/></span
              ><span class="title">网格融合</span>
            </p>
            <p class="pClass">
              <strong class="num">99</strong>
            </p>
          </li>
        </ul>
        <h2>网格连通</h2>
        <p class="connected">
          <span class="title">打通单位数</span><span class="img" /><strong
            class="num"
            >87/93</strong
          ><span class="unit">家</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.pandect {
  .top {
    width: 100%;
    height: 83px;
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
      float: left;
      width: 212px;
      height: 83px;
      margin-right: 3px;
      background: url("~@/assets/image/dataView/gridding.png") no-repeat center
        center;
    }
    .grid-into {
      float: left;
      width: 205px;
      height: 83px;
      margin-right: 3px;
      background: url("~@/assets/image/dataView/gridding1.png") no-repeat center
        center;
    }
    .grid-condition {
      float: right;
      width: 419px;
      height: 83px;
      background: url("~@/assets/image/dataView/webCon.png") no-repeat center
        center;
      display: flex;
      flex-direction: row;
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
          color: #fff;
          margin: 0px;
          padding: 0px;
          line-height: 30px;
          font-size: 28px;
          span {
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
  .center {
    .real-left {
      float: left;
      width: 431px;
      height: 121px;
      background: url("~@/assets/image/dataView/unit.png") no-repeat center
        center;
      h1 {
        text-align: left;
        font-size: 16px;
        color: #7ebcff;
        padding: 0px;
        margin: 7px 0px 0px 22px;
      }
    }
    .real-right {
      float: right;
      width: 420px;
      height: 121px;
      background: url("~@/assets/image/dataView/incident.png") no-repeat center
        center;
      h1 {
        text-align: right;
        font-size: 16px;
        color: #7ebcff;
        padding: 0px;
        margin: 7px 22px 0px 0px;
      }
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
        background: url("~@/assets/image/dataView/bg.png") no-repeat center
          bottom;
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
  .bottom {
    .population-left {
      float: left;
      width: 420px;
      height: 342px;
      .video {
        width: 420px;
        height: 172px;
        background: url("~@/assets/image/dataView/video-bg.png") no-repeat
          center center;
        background-position: 100% 100%;
        h1 {
          font-size: 16px;
          color: #7ebcff;
          padding: 7px 0px 0px 22px;
          margin: 0px;
        }
        ul {
          margin: 20px;
          padding: 0px;
          margin-left: 21px;
          list-style: none;
          li {
            line-height: 31px;
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;
            cursor: pointer;
            .icon {
              width: 16px;
              height: 16px;
              i {
                font-size: 16px;
                color: #80f4e7;
              }
            }
            .line {
              flex: 1;
              flex-basis: auto;
              display: block;
              height: 22px;
              border-bottom: 1px dashed #3c859a;
            }
            .title {
              display: inline-block;
              margin: 0px 10px;
              color: #fff;
              font-size: 16px;
            }
            .num {
              color: #a9daff;
              font-size: 20px;
              display: inline-block;
              margin: 0px 10px;
            }
            .unit {
              color: #a9daff;
              font-size: 10px;
            }
          }
        }
      }
      .govern {
        margin-top: 8px;
        width: 420px;
        height: 170px;
        background: url("~@/assets/image/dataView/govern-bg.png") no-repeat
          center center;
        background-position: 100% 100%;
        h1 {
          font-size: 16px;
          color: #7ebcff;
          padding: 7px 0px 0px 22px;
          margin: 0px;
        }
        ul {
          margin: 20px 0px 15px 15px;
          padding: 0px;
          list-style: none;
          li {
            float: left;
            margin-right: 15px;
            width: calc(50% - 15px);
            margin-bottom: 12px;
            cursor: pointer;
            .icon {
              width: 16px;
              height: 16px;
              i {
                font-size: 16px;
                color: #a9daff;
              }
            }
            .title {
              display: inline-block;
              flex: 1;
              margin: 0px 10px;
              color: #fff;
              font-size: 16px;
            }
            .total {
              float: right;
            }
            .num {
              color: #80f4e7;
              font-size: 20px;
            }
            .unit {
              color: #3a6d9b;
              font-size: 10px;
            }
          }
        }
      }
    }
    .population-right {
      float: right;
      width: 420px;
      height: 349px;
      background: url("~@/assets/image/dataView/network-bg.png") no-repeat
        center center;
      h1 {
        float: right;
        display: inline-block;
        font-size: 16px;
        color: #7ebcff;
        padding: 0px;
        margin: 7px 22px 0px 0px;
      }
      h2 {
        text-align: left;
        display: inline-block;
        font-size: 16px;
        color: #7ebdff;
        padding: 0px;
        margin: 7px 0px 0px 22px;
      }
      .data {
        margin: 18px 20px 0px 20px;
        padding: 0px;
        height: 110px;
        list-style: none;
        li {
          float: left;
          width: calc(100% / 3);
          height: 100px;
          text-align: center;
          padding-top: 34px;
          &.security {
            background: url("~@/assets/image/dataView/security.png") no-repeat
              center top;
          }
          &.civil {
            background: url("~@/assets/image/dataView/civil.png") no-repeat
              center top;
          }
          &.club {
            background: url("~@/assets/image/dataView/club.png") no-repeat
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
            font-size: 20px;
            line-height: 30px;
            color: #199aff;
          }
        }
      }
      .reseau {
        margin: 10px 20px;
        padding: 0px;
        margin-left: 21px;
        list-style: none;
        li {
          float: left;
          width: calc(100% / 3);
          line-height: 30px;
          margin-bottom: 5px;
          text-align: center;
          .icon {
            width: 16px;
            height: 16px;
            i {
              font-size: 16px;
              color: #a9daff;
            }
          }
          .line {
            flex: 1;
            flex-basis: auto;
            display: block;
            height: 15px;
            border-bottom: 1px dashed #3c859a;
          }
          .title {
            display: inline-block;
            margin: 0px 5px;
            color: #fff;
            font-size: 16px;
          }
          .pClass {
            padding-left: 13px;
          }
          .num {
            color: #a9daff;
            font-size: 20px;
            display: inline-block;
            margin: 0px 10px;
          }
        }
      }
      .connected {
        margin: 0px 21px;
        padding: 0px;
        .title {
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
        }
        .img {
          display: inline-block;
          width: 170px;
          height: 14px;
          margin: 0px 10px;
          background: url("~@/assets/image/dataView/schedule.png") no-repeat
            center center;
        }
        .num {
          font-size: 24px;
          color: #aadaff;
          margin-right: 5px;
        }
        .unit {
          font-size: 12px;
          color: #aadaff;
        }
      }
    }
  }
}
</style>
