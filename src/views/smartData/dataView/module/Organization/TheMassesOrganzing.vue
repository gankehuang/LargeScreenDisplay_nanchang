<template>
  <div class="the-masses-organzing-container">
    <div class="title">
      群防群治组织
    </div>
    <ul>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ volunteer }}</span>
        </div>
        <div class="label">
          志愿者队伍
        </div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ duty }}</span>
        </div>
        <div class="label">
          义务巡逻队
        </div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ fullTime }}</span>
        </div>
        <div class="label">
          专职巡逻队
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { queryOrgGeneral } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      volunteer: 0,
      duty: 0,
      fullTime: 0,
      code: '3601'
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted () {
    this.handleQueryOrgGeneral()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryOrgGeneral()
    })
  },
  methods: {
    async handleQueryOrgGeneral () {
      try {
        const { status, data } = await queryOrgGeneral({ gridCode: this.code })
        if (status === 200) {
          this.volunteer = data.volunteerTeam
          this.duty = data.obligationTeam
          this.fullTime = data.fullTeam
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.the-masses-organzing-container {
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
    margin: 5px 0 0 10px;
  }
  ul {
    margin-top: 20px;
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
      width: 108px;
      height: 108px;
      margin: 20px 0 10px;
    }
    .data {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      line-height: 24px;
      position: relative;
      top: -60px;
      z-index: 2;
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
      position: relative;
      top: -30px;
      z-index: 2;
    }
  }
  li:nth-of-type(1) {
    .icon {
      background: url("~@/assets/image/dataView/the-masses-organzing-volunteer.png")
        center center / 100% 100% no-repeat;
      margin-left: 10px;
    }
  }
  li:nth-of-type(2) {
    .icon {
      background: url("~@/assets/image/dataView/the-masses-organzing-duty.png")
        center center / 100% 100% no-repeat;
    }
  }
  li:nth-of-type(3) {
    .icon {
      background: url("~@/assets/image/dataView/zzxld.png") center center / 100%
        100% no-repeat;
      margin-right: 10px;
    }
  }
}
</style>
