<template>
  <div class="gov-organizing-container">
    <div class="title">综治组织</div>
    <ul>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ center }}</span>
          <span>个</span>
        </div>
        <div class="label">综治中心</div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ unit }}</span>
          <span>个</span>
        </div>
        <div class="label">综治责任单位</div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { queryOrgGeneral } from '@/api/smartData/dataView'
import { getZZOrg } from '@/api/smartData/dataView'
export default {
  data() {
    return {
      center: 2956,
      unit: 6072,
      code: '3601'
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted() {
    this.handleQueryOrgGeneral()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryOrgGeneral()
    })
  },
  methods: {
    async handleQueryOrgGeneral() {
      try {
        // const { status, data } = await queryOrgGeneral({ gridCode: this.code })
        // if (status === 200) {
        //   this.center = data['govCenter']
        //   this.unit = data['govOrg']
        // }
        const { status, data } = await getZZOrg({ gridCode: this.code })
        if (status === 200) {
          this.center = data['zzzx']
          this.unit = data['zzzrdw']
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.gov-organizing-container {
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
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      width: 115px;
      height: 115px;
      margin: 20px 0 5px;
    }
    .data {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      line-height: 23px;
      span:nth-of-type(1) {
        font-size: 26px;
        font-weight: bold;
        line-height: 24px;
        display: inline-block;
        margin-right: 5px;
      }
    }
    .label {
      color: #ffffff;
      font-size: 17px;
      line-height: 28px;
    }
  }
  li:nth-of-type(1) {
    .icon {
      background: url("~@/assets/image/dataView/gov-organizing-center.png")
        center center / 100% 100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #007ef2;
      }
    }
  }
  li:nth-of-type(2) {
    .icon {
      background: url("~@/assets/image/dataView/gov-organizing-unit.png") center
        center / 100% 100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #86fff0;
      }
    }
  }
}
</style>
