<template>
  <div class="sxz">
    <div class="title">市行政中心信息</div>
    <div class="item-top">
      占地面积
      <span>
        72000㎡
      </span>
    </div>
    <div class="item-center">
      <div class="all-video">
        <p class="all-video-num">82</p>
        <p>视频监控</p>
      </div>
      <div v-for="(item, index) in videoList" class="one-video" :key="index">
        <p class="one-video-name">{{ item.name }}</p>
        <p>{{ item.num }}</p>
      </div>
    </div>
    <div class="item-bottom">
      <div class="item-bottom-one">
        <svg-icon icon-class="metro" class="svg-icon" />
        地铁口
        <span>
          1个
        </span>
      </div>
      <div class="item-bottom-one">
        <svg-icon icon-class="gjzt-1" class="svg-icon" />
        公交车站
        <span>
          1个
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoList: [
        {
          name: '全结构化',
          num: '43'
        },
        {
          name: '人脸抓拍',
          num: '28'
        },
        {
          name: '非结构化',
          num: '11'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.sxz {
  width: 420px;
  height: 275px;
  position: relative;
  padding: 50px 30px 0 30px;
  background: url("~@/assets/image/KeyThrong/left0ne.png") no-repeat 100% 100%;
  .title {
    position: absolute;
    top: 12px;
    left: 30px;
    z-index: 99;
    color: #7dbcff;
    font-weight: bold;
    font-size: 16px;
  }
  .item-top {
    width: 100%;
    height: 55px;
    //background: url("~@/assets/image/KeyThrong/topOne.png") no-repeat;
    background-position: right;
    font-size: 16px;
    //font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a9daff;
    line-height: 55px;
    span {
      display: inline-block;
      margin-left: 30px;
    }
  }
  .item-center {
    width: 100%;
    height: 87px;
    background: rgba(0, 11, 34, 0.46);
    border: 1px solid #3c94f1;
    display: flex;
    padding: 15px 0;
    justify-content: center; /* 水平居中 */
    .all-video,
    .one-video {
      width: 80px;
      height: 55px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #a9daff;
      text-align: center;
      line-height: 26px;
      p {
        margin: 0;
        padding: 0;
      }
    }
    .all-video {
      border-right: 1px solid #1c589c;
      .all-video-num {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #00ffff;
      }
    }
    .one-video {
      font-size: 18px;
      .one-video-name {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #3b9afe;
      }
    }
  }
  .item-bottom {
    width: 100%;
    height: 65px;
    padding: 10px 0;
    display: flex;
    justify-content: center; /* 水平居中 */
    .item-bottom-one {
      width: 165px;
      height: 100%;
      text-align: center;
      line-height: 45px;
      background: url("~@/assets/image/KeyThrong/bottom-one.png") no-repeat;
      background-position: 36px 30px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #a9daff;
      .svg-icon {
        font-size: 16px;
        color: #3b9afe;
      }
      span {
        display: inline-block;
        margin-left: 15px;
      }
    }
  }
}
</style>
