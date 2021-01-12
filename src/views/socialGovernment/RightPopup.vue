<template>
  <div class="time-line-container" v-if="visible">
    <div class="close" @click="close"></div>
    <el-scrollbar style="height: 800px;margin: 20px 46px 0 48px;">
      <div class="time-first" />
      <div
        class="time-first-block"
        :key="index"
        v-for="(item, index) in item.list"
        @click="tabPdf(item)"
      >
        <div class="line" />
        <div class="time-node-title">
          <div class="time">{{ item.time }}</div>
          <div class="node" />
          <div class="title">{{ item.name }}</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">{{ item.post }}</div>
        </div>
        <!-- <div class="info-node">
          <div class="node" />
          <div class="info">{{ item.info }}</div>
        </div>
        <div class="image-node" :class="{ none: !item.imageUrl }">
          <div class="node" />
          <el-image
            :src="item.imageUrl"
            :preview-src-list="[item.imageUrl]"
            class="el-image"
          />
        </div> -->
      </div>
    </el-scrollbar>
    <PdfModal :visible.sync="pdfModalVisible" :pdfFile="pdfFile" />
  </div>

  <!-- <div class="social-government-right-popup fadeIn" v-if="visible">
    <div class="close" @click="close"></div>
    <PdfModal :visible.sync="pdfModalVisible" :pdfFile="pdfFile" />
    <div class="start-img"></div>
    <el-scrollbar class="scrollbar-container">
      <div
        class="list-item"
        v-for="(item, index) in item.list"
        :key="index"
        @click="tabPdf(item)"
      >
        <div class="item-time">{{ item.time }}</div>
        <div class="item-col"></div>
        <div class="item-bg">
          {{ item.name }}
          <span>{{ item.post }}</span>
        </div> -->
  <!-- <span>
          {{ item.name }}
        </span> -->
  <!-- </div>
    </el-scrollbar>
  </div> -->
</template>

<script>
import PdfModal from './PdfModal'
export default {
  components: {
    PdfModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    },
    leftClickItemIndex: {
      type: Number || undefined,
      default: undefined
    }
  },
  data() {
    return { pdfModalVisible: false, pdfFile: {}}
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('update:leftClickItemIndex', undefined)
    },
    tabPdf(item) {
      this.pdfModalVisible = true
      this.pdfFile = item.pdfFile
    }
  }
}
</script>

<style lang="scss" scoped>
// /deep/.el-scrollbar__wrap {
//   overflow-x: hidden;
//   height: 94%;
// }
// .social-government-right-popup {
//   position: absolute;
//   z-index: 2010;
//   top: 50%;
//   right: 70px;
//   width: 630px;
//   height: 876px;
//   margin-top: -438px;
//   background: url("~@/assets/image/socialGovernment/popup_right_bg.png") center
//     center / 100% 100% no-repeat;
// }
// .fadeIn {
//   -webkit-animation: fadeInDown 0.3s;
//   animation: fadeInDown 0.3s;
// }
// .close {
//   cursor: pointer;
//   position: absolute;
//   top: 45px;
//   right: 40px;
//   width: 30px;
//   height: 30px;
//   z-index: 10;
//   background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
//     100% 100% no-repeat;
// }
// .scrollbar-container {
//   // margin-top: 30px;
//   position: relative;
//   top: -150px;
//   width: 100%;
//   height: 95%;
// }
// .start-img {
//   width: 376px;
//   height: 223px;
//   position: relative;
//   left: 40px;
//   top: 40px;
//   background: url("~@/assets/image/socialGovernment/start-img-bg.png") center
//     center / 100% 100% no-repeat;
// }
// .list-item,
// .list-item.active {
//   position: relative;
//   cursor: pointer;
//   width: 100%;
//   height: 180px;
// }
// .list-item {
//   .item-time {
//     position: relative;
//     left: 85px;
//     top: 70px;
//     width: 100px;
//     height: 50px;
//   }
//   .item-col {
//     width: 92px;
//     height: 180px;
//     background: url("~@/assets/image/socialGovernment/pdf-item-col.png") center
//       center / 100% 100% no-repeat;
//     position: relative;
//     left: 185px;
//     top: -50px;
//   }
//   .item-bg {
//     width: 320px;
//     height: 164px;
//     background: url("~@/assets/image/socialGovernment/pdf-item.png") center
//       center / 100% 100% no-repeat;
//     position: relative;
//     left: 280px;
//     top: -200px;
//     padding: 24px 16px 0;
//     font-size: 16px;
//     span {
//       position: absolute;
//       bottom: 20px;
//       right: 20px;
//     }
//   }
// }
// .list-item {
//   // background: url('~@/assets/image/socialGovernment/popup_list_item.png') center
//   //   center / 100% 100% no-repeat;
//   color: #a9daff;
// }
// .list-item:hover {
//   // background: url('~@/assets/image/socialGovernment/popup_list_item_active.png')
//   //   center center / 100% 100% no-repeat;
//   color: #fff;
// }
// .list-item.active {
//   background: url("~@/assets/image/socialGovernment/popup_list_item_active.png")
//     center center / 100% 100% no-repeat;
//   color: #fff;
// }
// @keyframes fadeInDown {
//   0% {
//     -webkit-transform: translate3d(0, -20%, 0);
//     -webkit-transform: translate3d(0, -20%, 0);
//     transform: translate3d(0, -20%, 0);
//     transform: translate3d(0, -20%, 0);
//     opacity: 0;
//   }
//   100% {
//     -webkit-transform: none;
//     transform: none;
//     opacity: 1;
//   }
// }

// @-webkit-keyframes fadeInDown {
//   0% {
//     -webkit-transform: translate3d(0, -20%, 0);
//     opacity: 0;
//   }
//   100% {
//     -webkit-transform: none;
//     opacity: 1;
//   }
// }
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-scrollbar__view {
  display: block !important;
  padding: 0 5px;
}
.time-line-container {
  width: 80%;
  height: 876px;
  position: absolute;
  top: 68px;
  right: 0;
  //   padding: 20px 46px 0 48px;
  z-index: 2001;
  background: url("~@/assets/image/socialGovernment/popup_right_bg.png") center
    center / 100% 100% no-repeat;
}
.close {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 55px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
.time-first {
  position: relative;
  width: 130px;
  height: 208px;
  margin: 20px 0 0 52px;
  z-index: 1;
  background: url("~@/assets/image/socialGovernment/time_line_modal(1).png")
    center center / 100% 100% no-repeat;
}
.time-first-block {
  cursor: pointer;
  width: 100%;
  height: 100%;
  color: #a9daff;
  margin: 0 0 20px;
  position: relative;
  top: -80px;
  .line {
    position: absolute;
    top: 20px;
    left: 115px;
    width: 3px;
    height: 150%;
    background: #228de0;
  }
  .time-node-title {
    display: flex;
    position: relative;
    z-index: 1;
    line-height: 28px;
    margin-bottom: 30px;
    padding-right: 15px;
    .time,
    .title {
      white-space: pre-line;
      font-weight: bold;
    }
    .time {
      width: 120px;
    }
    .title {
      width: 400px;
      font-size: 16px;
      // margin-left: 85px;
      color: #3beefe;
    }
    .node {
      // left: 85px;
      width: 26px;
      height: 26px;
      position: relative;
      right: 16px;
      margin: 0 10px 0 0;
      background: url("~@/assets/image/socialGovernment/time_line_modal(4).png")
        center center / 100% 100% no-repeat;
    }
  }
  .info-node {
    display: flex;
    position: relative;
    z-index: 1;
    margin-bottom: 30px;
    padding-right: 15px;
    .node {
      width: 15px;
      height: 15px;
      margin: 0 20px 0 110px;
      background: url("~@/assets/image/socialGovernment/time_line_modal(3).png")
        center center / 100% 100% no-repeat;
    }
    .info {
      width: 400px;
      font-size: 14px;
      line-height: 24px;
    }
  }
  .image-node {
    display: flex;
    position: relative;
    z-index: 10;
    margin-bottom: 30px;
    padding-right: 15px;
    .node {
      width: 15px;
      height: 15px;
      margin: 80px 20px 0 89px;
      background: url("~@/assets/image/socialGovernment/time_line_modal(3).png")
        center center / 100% 100% no-repeat;
    }
    .el-image {
      width: 260px;
      height: 173px;
      background: url("~@/assets/image/socialGovernment/time_line_modal(5).png")
        center center / 100% 100% no-repeat;
    }
  }
  .none {
    display: none;
  }
}
</style>
