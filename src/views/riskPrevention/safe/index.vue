<template>
  <div class="page-box">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="0"
    />
    <div class="content">
      <!-- <div class="annulus-box"> -->
      <!-- <div class="annulus"> -->
      <!-- <div class="torus"></div> -->
      <!-- <div class="line"> -->
      <!-- <div class="line-box"></div> -->
      <!-- <div class="line-list">
<!--              <ul>-->
      <!--                <li-->
      <!--                  v-for="(item, index) in selectList"-->
      <!--                  :key="index"-->
      <!--                  :class="setClass(index)"-->
      <!--                >-->
      <!--                  <div class="lines">{{ item.name }}</div>-->
      <!--                </li>-->
      <!--              </ul>-->
      <!-- </div> -->
    </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
export default {
  mixins: [commonMixin]
}
</script>

<style lang="scss" scoped>
.page-box{
  background: url("~@/assets/image/AI/safe-1.png") no-repeat center center;
  background-size: 100% 100%;
}
// .page-box {
//   background: url("~@/assets/image/AI/page-bg.png") no-repeat center center;
//   background-size: 100% 100%;
//   position: relative;
//   .custom-model {
//     z-index: 99;
//     position: absolute;
//     top: 150px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 392px;
//     height: 60px;
//     background: url("~@/assets/image/AI/custom-model-bg.png") no-repeat center
//       center;
//     background-size: 100% 100%;
//     /deep/ .input-with-select {
//       background: rgba(0, 0, 0, 0);
//       border: 0px;
//       border-radius: 10px;
//     }
//     /deep/ .el-select .el-input {
//       width: 120px;
//       font-size: 14px;
//       color: #fff;
//     }
//     /deep/ .el-input__inner {
//       font-size: 14px;
//       height: 60px !important;
//       line-height: 60px !important;
//       border: none;
//       background: rgba(0, 0, 0, 0);
//       color: #fff;
//     }
//     /deep/ .el-input-group__prepend {
//       border-radius: 10px 0 0 10px;
//       background: rgba(0, 0, 0, 0);
//       border: none;
//     }
//   }
//   .content {
//     position: absolute;
//     top: 70px;
//     left: 0px;
//     width: 100%;
//     height: calc(100% - 70px);
//     display: flex;
//     align-items: center;
//     .annulus-box {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       width: 620px;
//       height: 620px;
//       margin-top: -310px;
//       margin-left: -310px;
//       .annulus {
//         width: 100%;
//         height: 100%;
//         position: relative;
//         .torus {
//           position: absolute;
//           top: 35px;
//           left: 0px;
//           padding: 0px;
//           margin: 0px;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: url("~@/assets/image/AI/torus-bg.png") no-repeat center
//             center;
//           background-size: 600px;
//           -webkit-transform: translate3d(0, 0, 0);
//           -moz-transform: translate3d(0, 0, 0);
//           transform: translate3d(0, 0, 0);
//           animation: play1 20s linear infinite;
//           @keyframes play1 {
//             0% {
//               transform: rotate(0deg);
//             }
//             100% {
//               transform: rotate(-360deg);
//             }
//           }
//         }
//         h1 {
//           position: absolute;
//           top: 35px;
//           left: 0px;
//           padding: 0px;
//           margin: 0px;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: url("~@/assets/image/AI/annuius-h1-bg.png") no-repeat
//             center center;
//           background-size: 560px;
//         }
//         span {
//           font-size: 28px;
//           background: linear-gradient(to right, #d4fdff 0%, #4facfe 100%);
//           background-clip: text;
//           -webkit-background-clip: text;
//           text-fill-color: transparent;
//           -webkit-text-fill-color: transparent;
//         }
//       }
//       .line {
//         position: absolute;
//         left: 0px;
//         top: 35px;
//         width: 100%;
//         height: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         .line-box {
//           width: 620px;
//           height: 620px;
//           position: relative;
//           background: url("~@/assets/image/AI/annulus.png") no-repeat center
//             center;
//           background-size: 620px;
//           -webkit-transform: translate3d(0, 0, 0);
//           -moz-transform: translate3d(0, 0, 0);
//           transform: translate3d(0, 0, 0);
//           animation: play 20s linear infinite;
//           @keyframes play {
//             0% {
//               transform: rotate(0deg);
//             }
//             100% {
//               transform: rotate(360deg);
//             }
//           }
//         }
//         .line-list {
//           width: 620px;
//           height: 620px;
//           position: absolute;
//           ul {
//             margin: 0px;
//             padding: 0px;
//             list-style: none;
//           }
//           li {
//             position: absolute;
//             width: 90px;
//             height: 90px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #a9daff;
//             font-size: 14px;
//             background: url("~@/assets/image/AI/line.png") no-repeat center
//               center;
//             transform: translate3d(0, 0, 0);
//             animation: playAdd 1s;
//             @keyframes playAdd {
//               0% {
//                 opacity: 0.35;
//                 width: 200px;
//                 height: 200px;
//               }
//               100% {
//                 opacity: 0.5;
//                 width: 90px;
//                 height: 90px;
//               }
//             }
//             .lines {
//               display: flex;
//               width: 60px;
//               height: 60px;
//               font-weight: bold;
//               text-align: center;
//               justify-content: center;
//               align-items: center;
//             }
//           }
//           .line0 {
//             position: absolute;
//             top: 45px;
//             left: 50%;
//             margin-left: -45px;
//           }
//           .line1 {
//             position: absolute;
//             top: 110px;
//             left: 105px;
//           }
//           .line2 {
//             position: absolute;
//             top: 110px;
//             right: 105px;
//           }
//           .line3 {
//             position: absolute;
//             top: 260px;
//             left: 45px;
//           }
//           .line4 {
//             position: absolute;
//             top: 260px;
//             right: 45px;
//           }
//           .line5 {
//             position: absolute;
//             bottom: 110px;
//             left: 105px;
//           }
//           .line6 {
//             position: absolute;
//             bottom: 110px;
//             right: 105px;
//           }
//           .line7 {
//             position: absolute;
//             bottom: 40px;
//             left: 50%;
//             margin-left: -45px;
//           }
//         }
//       }
//     }
//     .content-box {
//       padding: 0px 100px;
//       width: 100%;
//       height: 600px;
//       display: flex;
//       flex-direction: row;
//     }
//     .left,
//     .right {
//       width: 395px;
//       height: 600px;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-around;
//       h1 {
//         margin: 0px;
//         padding: 0px;
//         height: 30px;
//         line-height: 30px;
//         text-align: center;
//         font-size: 16px;
//         color: #aadaff;
//       }
//       .box-ul {
//         padding: 0px;
//         margin: 0px 10px;
//         list-style: none;
//         height: 230px;
//         li {
//           float: left;
//           cursor: pointer;
//           width: 73px;
//           height: 60px;
//           word-break: break-all;
//           padding: 0px 5px;
//           margin: 0px 10px;
//           margin-top: 14px;
//           background: url("~@/assets/image/AI/list-bg.png") no-repeat center
//             center;
//           background-size: 100% 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           color: #aadaff;
//           text-align: center;
//           &.current {
//             background: url("~@/assets/image/AI/list-hover-bg.png") no-repeat
//               center center;
//             font-weight: bold;
//             color: #fff;
//           }
//           &.add {
//             font-size: 32px;
//             &:hover {
//               background: url("~@/assets/image/AI/list-hover-bg.png") no-repeat
//                 center center;
//               color: #fff;
//             }
//           }
//         }
//       }
//     }
//     .center {
//       flex: 1;
//       flex-basis: auto;
//     }
//     .box-left {
//       width: 395px;
//       height: 275px;
//       background: url("~@/assets/image/AI/page-title-left-bg.png") no-repeat
//         center center;
//       background-size: 100% 100%;
//     }
//     .box-right {
//       width: 395px;
//       height: 275px;
//       background: url("~@/assets/image/AI/page-title-right-bg.png") no-repeat
//         center center;
//       background-size: 100% 100%;
//     }
//     .options {
//       position: absolute;
//       width: 240px;
//       height: 37px;
//       left: 50%;
//       margin-left: -120px;
//       bottom: 0px;
//       display: flex;
//       flex-direction: row;
//       .model {
//         width: 120px;
//         height: 37px;
//         background: url("~@/assets/image/AI/model1.png") no-repeat center center;
//         background-size: 100% 100%;
//         cursor: pointer;
//         &:hover {
//           background: url("~@/assets/image/AI/model2.png") no-repeat center
//             center;
//           background-size: 100% 100%;
//         }
//       }
//       .reset {
//         width: 120px;
//         height: 37px;
//         background: url("~@/assets/image/AI/reset1.png") no-repeat center center;
//         background-size: 100% 100%;
//         cursor: pointer;
//         &:hover {
//           background: url("~@/assets/image/AI/reset2.png") no-repeat center
//             center;
//           background-size: 100% 100%;
//         }
//       }
//     }
//   }
// }
// .dialog-view {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0px;
//   left: 0px;
//   background: rgba(0, 0, 0, 0.7);
//   z-index: 999;
//   .modal-dialog {
//     width: 800px;
//     height: 630px;
//     background: url("~@/assets/image/AI/model.png") no-repeat center center;
//     background-size: 100% 100%;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     margin: auto;
//     z-index: 99;
//     .modal-title {
//       width: 100%;
//       height: 40px;
//       font-size: 14px;
//       color: #00ffff;
//       margin-top: 17px;
//       text-align: center;
//     }
//     .modal-close {
//       width: 16px;
//       height: 16px;
//       position: absolute;
//       top: 25px;
//       right: 30px;
//       .svg-icon {
//         width: 16px;
//         height: 16px;
//         color: #3b9afe;
//         font-weight: bold;
//       }
//     }
//   }
//   .big {
//     width: 1350px;
//     height: 828px;
//     z-index: 999;
//   }
// }
</style>
