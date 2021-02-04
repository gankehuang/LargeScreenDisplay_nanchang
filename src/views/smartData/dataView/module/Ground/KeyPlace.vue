<template>
  <div class="key-place-container">
    <div class="title">
      重点场所
    </div>
    <ul>
      <li
        v-for="(item, index) in dataList"
        :key="index"
      >
        <svg-icon
          :icon-class="item.icon"
          class="icon"
        />
        <span class="label">{{ item.label }}</span>
        <div class="data">
          <span class="number">{{ item.number }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { queryKeyPlaceCount } from '@/api/smartData/dataView'
import { queryWeightPlace } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      code: '3601',
      dataList: [
        {
          icon: 'key-place-school',
          label: '学校',
          number: 0,
          unit: '所'
        },
        {
          icon: 'key-place-hospital',
          label: '医院',
          number: 0,
          unit: '个'
        },
        {
          icon: 'key-place-gas-station',
          label: '加油站',
          number: 0,
          unit: '个'
        },
        {
          icon: 'key-place-building',
          label: '建筑工地',
          number: 0,
          unit: '个'
        },
        {
          icon: 'suxiao-1',
          label: '风景区',
          number: 0,
          unit: '个'
        }
      ]
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted () {
    this.handleQueryKeyPlaceCount()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryKeyPlaceCount()
    })
  },
  methods: {
    async handleQueryKeyPlaceCount () {
      try {
        // const { status, data } = await queryKeyPlaceCount({
        //   gridCode: this.code
        // })
        // if (status === 200) {
        //   this.dataList[0].number = data['school']
        //   this.dataList[1].number = data['hospital']
        //   this.dataList[2].number = data['gas']
        //   this.dataList[3].number = data['constructionSite']
        //   this.dataList[4].number = data['fjq']
        // }
        const { status, data } = await queryWeightPlace({
          gridCode: this.code
        })
        if (status === 200) {
          this.dataList[0].number = data.school
          this.dataList[1].number = data.hospital
          this.dataList[2].number = data.gas
          this.dataList[3].number = data.build
          this.dataList[4].number = data.view
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.key-place-container {
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
    display: block;
    width: 100%;
    padding: 0 36px 0 24px;
  }
  li {
    width: 100%;
    color: #80f4e7;
    margin: 22px 0;
    &:nth-of-type(1) {
      .label {
        &::after {
          // #0E3A65
          content: "···········································";
        }
      }
    }
    &:nth-of-type(2) {
      .label {
        &::after {
          // #0E3A65
          content: "···············································";
        }
      }
    }
    &:nth-of-type(3) {
      .label {
        &::after {
          // #0E3A65
          content: "···········································";
        }
      }
    }
    &:nth-of-type(4) {
      .label {
        &::after {
          // #0E3A65
          content: "·······································";
        }
      }
    }
    &:nth-of-type(5) {
      .label {
        &::after {
          // #0E3A65
          content: "·······································";
        }
      }
    }
    .icon {
      color: #80f4e7;
      font-size: 18px;
    }
    .data {
      float: right;
      position: relative;
      z-index: 2;
    }
    .label {
      font-size: 16px;
      color: #ffffff;
      display: inline-block;
      font-size: 18px;
      margin-left: 5px;
      line-height: 18px;
      &::after {
        // #0E3A65
        content: "·······························";
        color: #4a9daa;
        margin: 0 5px 0 10px;
      }
    }
    .number {
      display: inline-block;
      margin-right: 5px;
      line-height: 24px;
      font-size: 20px;
      color: #a9daff;
    }
    .unit {
      font-size: 12px;
      color: #a9daff;
    }
  }
}
</style>
