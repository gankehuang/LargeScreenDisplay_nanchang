<template>
  <InfoBlock :title="infoTitle">
    <div class="item-top">
      占地面积
      <span>
        {{ infos.area }}㎡
      </span>
    </div>
    <div class="item-center">
      <div class="all-video">
        <p class="all-video-num">
          {{ infos.videoAll }}
        </p>
        <p>视频监控</p>
      </div>
      <div
        v-for="(item, index) in infos.videoList"
        :key="index"
        class="one-video"
      >
        <p class="one-video-name">
          {{ item.name }}
        </p>
        <p>{{ item.num }}</p>
      </div>
    </div>
    <div class="item-bottom">
      <div class="item-bottom-one">
        <svg-icon
          icon-class="metro"
          class="svg-icon"
        />
        地铁口
        <span>
          {{ infos.subway }}个
        </span>
      </div>
      <div class="item-bottom-one">
        <svg-icon
          icon-class="gjzt-1"
          class="svg-icon"
        />
        公交车站
        <span>
          {{ infos.bus }}个
        </span>
      </div>
    </div>
  </InfoBlock>
</template>
<script>
export default {
  data () {
    return {
      infoTitle: '省行政中心信息',
      infos: {
        area: 166000,
        videoAll: 146,
        videoList: [
          {
            name: '全结构化',
            num: '45'
          },
          {
            name: '人脸抓拍',
            num: '26'
          },
          {
            name: '非结构化',
            num: '75'
          }
        ],
        subway: 1,
        bus: 4
      }

    }
  },
  methods: {
    refreshInfo (curItem) {
      console.log(curItem)
      switch (curItem.title) {
        case 'province':
          this.infoTitle = '省行政中心信息'
          this.infos = {
            area: 166000,
            videoAll: 146,
            videoList: [
              {
                name: '全结构化',
                num: '45'
              },
              {
                name: '人脸抓拍',
                num: '26'
              },
              {
                name: '非结构化',
                num: '75'
              }
            ],
            subway: 1,
            bus: 4
          }
          break
        case 'administration':
          this.infoTitle = '市行政中心信息'
          this.infos = {
            area: 72000,
            videoAll: 82,
            videoList: [
              {
                name: '全结构化',
                num: '42'
              },
              {
                name: '人脸抓拍',
                num: '28'
              },
              {
                name: '非结构化',
                num: '11'
              }
            ],
            subway: 1,
            bus: 1
          }
          break
        case 'square':
          this.infoTitle = '八一广场信息'
          this.infos = {
            area: 78000,
            videoAll: 212,
            videoList: [
              {
                name: '全结构化',
                num: '105'
              },
              {
                name: '人脸抓拍',
                num: '56'
              },
              {
                name: '非结构化',
                num: '51'
              }
            ],
            subway: 1,
            bus: 1
          }
          break
        case 'qiushui':
          this.infoTitle = '秋水广场信息'
          this.infos = {
            area: 86000,
            videoAll: 69,
            videoList: [
              {
                name: '全结构化',
                num: '25'
              },
              {
                name: '人脸抓拍',
                num: '20'
              },
              {
                name: '非结构化',
                num: '24'
              }
            ],
            subway: 1,
            bus: 1
          }
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
