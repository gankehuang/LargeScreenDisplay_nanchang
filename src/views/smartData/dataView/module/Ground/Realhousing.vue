<template>
  <div class="realhousing-container">
    <div class="title">实有房屋</div>
    <!-- <div class="total">
      <svg-icon
        icon-class="realhousing-total"
        class="icon"
      />
      <span>房屋总数：</span>
      <span>{{ housingTotal }}</span>
      <span>套</span>
    </div> -->
    <ul>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ housingTotal }}</span>
          <span>套</span>
        </div>
        <div class="label">房屋总数</div>
      </li>
      <!-- @click="handleOpenBuildModal" -->
      <li style="cursor: pointer;">
        <div class="icon" />
        <div class="data">
          <span>{{ renthousing }}</span>
          <span>套</span>
        </div>
        <div class="label">出租房屋</div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { queryRoomCount, queryRentRoomCount } from '@/api/smartData/dataView'
import { queryRoomGeneral } from '@/api/smartData/dataView'
export default {
  data() {
    return {
      housingTotal: 0,
      renthousing: 0,
      officeBuilding: 0,
      code: '3601'
      // name: '江西'
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted() {
    await this.handleQueryRoomCount()
    // await this.handleQueryRentRoomCount()
    this.$EventBus.$on('update:dataViewSeleItem', async({ code, name }) => {
      this.code = code
      this.name = name.slice(0, name.length - 1)
      console.log(name)
      await this.handleQueryRoomCount()
      // await this.handleQueryRentRoomCount()
    })
  },
  methods: {
    // async handleQueryRoomCount() {
    //   try {
    //     const { status, data } = await queryRoomCount({
    //       locate: this.name
    //     })
    //     if (status === 200) {
    //       this.housingTotal = data.data
    //     }
    //   } catch (error) {}
    // },
    // async handleQueryRentRoomCount() {
    //   try {
    //     const { status, data } = await queryRentRoomCount({
    //       gridCode: this.code
    //     })
    //     if (status === 200) {
    //       this.renthousing = data.data
    //     }
    //   } catch (error) {}
    // },
    // 打开人口弹窗
    handleOpenBuildModal() {
      this.$EventBus.$emit('update:buildModalVisible', true)
    },
    async handleQueryRoomCount() {
      try {
        const { status, data } = await queryRoomGeneral({
          gridCode: this.code
        })
        if (status === 200) {
          this.housingTotal = data['room']
          this.renthousing = data['rent']
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.realhousing-container {
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
  .total {
    margin: 0 0 0 195px;

    .icon {
      font-size: 16px;
      color: #3498fb;
    }
    span:nth-of-type(1) {
      color: #3498fb;
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
  li:nth-of-type(2) {
    .icon {
      background: url("~@/assets/image/dataView/ground-realhousing-renthousing.png")
        center center / 100% 100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #007ef2;
      }
    }
  }
  li:nth-of-type(1) {
    .icon {
      background: url("~@/assets/image/dataView/ground-realhousing-officeBuilding.png")
        center center / 100% 100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #86fff0;
      }
    }
  }
}
</style>
