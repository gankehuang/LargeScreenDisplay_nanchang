<template>
  <div class="society-oragnzing-container">
    <div class="title">
      社会组织
    </div>
    <ul>
      <li>
        <p class="connected">
          <span class="unit">心防组织</span><strong class="num">{{ count }}<span>个</span></strong>
        </p>
      </li>
      <li>
        <p class="connected">
          <span class="unit">法律援助组织</span><strong class="num">{{ count1 }}<span>个</span></strong>
        </p>
      </li>
      <li>
        <p class="connected">
          <span class="unit">人民调解组织</span><strong class="num">{{ count2 }}<span>个</span></strong>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCommunityOrg } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      code: '3601',
      count: 0,
      count1: 0,
      count2: 0
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted () {
    await this.handleGetCommunityOrg()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleGetCommunityOrg()
    })
  },
  methods: {
    async handleGetCommunityOrg () {
      try {
        const { status, data } = await getCommunityOrg({ gridCode: this.code })
        if (status === 200) {
          this.videoResourceTotal = Object.values(data).reduce(
            (total, cur) => total + cur,
            0
          )
          this.count = data.xf
          this.count1 = data.fl
          this.count2 = data.tj
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.society-oragnzing-container {
  width: 425px;
  height: 280px;
  //   margin: 5px;
  background: url("~@/assets/image/dataView/data-view-ground-modal.png") center
    center / 100% 100% no-repeat;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 5px 0 0 25px;
  }
  h1 {
    font-size: 16px;
    color: #7ebcff;
    padding: 7px 0px 0px 22px;
  }
  ul {
    margin-top: 30px;
    padding: 0 15px;
  }
  li {
    height: 55px;
    margin-bottom: 10px;
    &:nth-of-type(1) {
      background: url("~@/assets/image/dataView/society-oragnzing-xinfang.png")
        center center / 100% 100% no-repeat;
    }
    &:nth-of-type(2) {
      background: url("~@/assets/image/dataView/society-oragnzing-raw.png")
        center center / 100% 100% no-repeat;
    }
    &:nth-of-type(3) {
      background: url("~@/assets/image/dataView/society-oragnzing-solve.png")
        center center / 100% 100% no-repeat;
    }
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
        span {
          display: inline-block;
          margin-left: 5px;
          vertical-align: bottom;
        }
      }
    }
  }
}
</style>
