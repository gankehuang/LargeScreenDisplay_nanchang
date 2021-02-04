<template>
  <div class="matter-public-video">
    <div class="title">
      公共视频
    </div>
    <div class="total">
      <span>视频资源总数：</span>
      <span>{{ videoResourceTotal }}</span>
      <span>个</span>
    </div>
    <ul>
      <li
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="label-container">
          <div class="icon" />
        </div>
        <div class="data">
          <div class="label">
            {{ item.label }}
          </div>
          <div class="number">
            <span>{{ item.number }}</span>
            <span>{{ item.unit }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { queryVideo } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      videoResourceTotal: 0,
      code: '3601',
      dataList: [
        { icon: 'key-place-hotel', label: '天网', number: 0, unit: '个' },
        {
          icon: 'key-place-Internet-cafe',
          label: '社会资源',
          number: 0,
          unit: '个'
        },
        { icon: 'key-place-KTV', label: '地网', number: 0, unit: '个' },
        {
          icon: 'key-place-jiuxiao',
          label: '智慧云眼',
          number: 0,
          unit: '个'
        }
      ]
    }
  },
  // created() {
  //   this.handleQueryVideo()
  // },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted () {
    await this.handleQueryVideo()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryVideo()
    })
  },
  methods: {
    async handleQueryVideo () {
      try {
        const { status, data } = await queryVideo({ gridCode: this.code })
        if (status === 200) {
          this.videoResourceTotal = Object.values(data).reduce(
            (total, cur) => total + cur,
            0
          )
          this.dataList[0].number = data.tw
          this.dataList[1].number = data.shzy
          this.dataList[2].number = data.dw
          this.dataList[3].number = data.zhyy
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.matter-public-video {
  width: 425px;
  height: 280px;
  // margin: 5px;
  background: url("~@/assets/image/dataView/public-video-modal.png") center
    center / 100% 100% no-repeat;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 5px 0 0 25px;
  }
  .total {
    margin: 0 0 0 195px;

    .icon {
      font-size: 16px;
      color: #3497fb;
    }
    span:nth-of-type(1) {
      color: #3497fb;
      line-height: 24px;
      margin-left: 5px;
    }
    span:nth-of-type(2) {
      display: inline-block;
      line-height: 24px;
      font-weight: bold;
      font-size: 28px;
      margin: 0 5px 0 0;
      color: #aadaff;
    }
    span:nth-of-type(3) {
      color: #aadaff;
    }
  }
  ul {
    padding: 0;
    width: 100%;
  }
  li {
    width: 50%;
    margin-bottom: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:nth-of-type(1) {
      .icon {
        background: url("~@/assets/image/dataView/public-video-tianwang.png")
          center center / 100% 100% no-repeat;
      }
    }
    &:nth-of-type(2) {
      .icon {
        background: url("~@/assets/image/dataView/public-video-shehuiziyuan.png")
          center center / 100% 100% no-repeat;
      }
    }
    &:nth-of-type(3) {
      .icon {
        background: url("~@/assets/image/dataView/public-video-diwang.png")
          center center / 100% 100% no-repeat;
      }
    }
    &:nth-of-type(4) {
      .icon {
        background: url("~@/assets/image/dataView/public-video-zhihui.png")
          center center / 100% 100% no-repeat;
      }
    }
    .icon {
      display: inline-block;
      width: 65px;
      height: 82px;
    }
    .label {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      display: inline-block;
      margin: 0 50px 0 10px;
      line-height: 24px;
    }
    .data {
      color: #a9d9ff;
      .number {
        span:nth-of-type(1) {
          font-size: 26px;
          display: inline-block;
          margin: 10px 5px 0 0;
          font-size: bold;
          line-height: 24px;
        }
        span:nth-of-type(2) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
