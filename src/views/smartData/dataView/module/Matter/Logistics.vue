<template>
  <div class="logistics-container">
    <div class="title">寄递物流</div>
    <div class="total">
      <span>总数：</span>
      <span>{{ expressTotal }}</span>
      <span>个</span>
    </div>
    <ul>
      <el-scrollbar
        style="height:200px"
        ref="list"
        @handleScroll="handleQueryExpressInfo"
      >
        <li v-for="(item, index) in dataList" :key="index">
          <div class="company-name">{{ item.name }}</div>
          <div class="info">
            <span class="text-overflow" :title="item.addr">
              <svg-icon icon-class="location" class="icon" />
              <span>{{ item.addr }}</span>
            </span>
            <span class="text-overflow"
:title="item.type ? item.type : '其它'"
              >快递类型：{{ item.type ? item.type : "其它" }}</span
            >
          </div>
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script>
import { queryExpressInfo } from '@/api/smartData/dataView'
export default {
  data() {
    return {
      expressTotal: 0,
      dataList: [],
      code: '3601'
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted() {
    this.handleQueryExpressInfo()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryExpressInfo()
    })
  },
  methods: {
    async handleQueryExpressInfo() {
      try {
        const { status, data } = await queryExpressInfo(1, 100, {
          gridCode: this.code
        })
        if (status === 200) {
          this.dataList = data.list
          this.expressTotal = data.total
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.logistics-container {
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
    margin: 0 0 0 255px;

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
    width: 100%;
    padding: 0 10px;
    margin: 0;
  }
  li {
    width: 100%;
    height: 56px;
    padding: 0 10px;
    margin-bottom: 10px;
    background-color: rgba(76, 145, 231, 0.2);
    .company-name {
      font-size: 16px;
      color: #ffffff;
      line-height: 32px;
    }
    .icon {
      color: "#3497FB";
      font-size: 12px;
    }
    .info {
      color: #3497fb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      span:nth-of-type(1) {
        text-align: left;
      }
      span:nth-of-type(2) {
        text-align: right;
      }
    }
  }
}
</style>
