<template>
  <div class="key-place-container">
    <div class="title">公共设施</div>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        <svg-icon :icon-class="item.icon" class="icon" />
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
import { queryCommonPlay } from '@/api/smartData/dataView'
export default {
  data() {
    return {
      code: '3601',
      dataList: [
        {
          icon: 'xiaofang',
          label: '消防设施',
          number: 0,
          unit: '个'
        },
        {
          icon: 'axcp-1',
          label: '爱心车棚',
          number: 0,
          unit: '个'
        },
        {
          icon: 'txjjx-1',
          label: '通信交接箱',
          number: 0,
          unit: '个'
        },
        {
          icon: 'chongdian',
          label: '充电桩',
          number: 0,
          unit: '个'
        },
        {
          icon: 'bdz-1',
          label: '变电站',
          number: 0,
          unit: '个'
        }
      ]
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted() {
    await this.handleQueryCommonCarNum()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryCommonCarNum()
    })
  },
  methods: {
    async handleQueryCommonCarNum() {
      try {
        const { status, data } = await queryCommonPlay({
          gridCode: this.code
        })
        if (status === 200) {
          this.dataList[0].number = data['xfss']
          this.dataList[1].number = data['axcp']
          this.dataList[2].number = data['txjjx']
          this.dataList[3].number = data['cdz']
          this.dataList[4].number = data['bdz']
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
    padding: 10px 36px 0 24px;
  }
  li {
    width: 100%;
    color: #80f4e7;
    margin: 22px 0;
    &:nth-of-type(1) {
      .label {
        &::after {
          // #0E3A65
          content: "·····································";
        }
      }
    }
    &:nth-of-type(2) {
      .label {
        &::after {
          // #0E3A65
          content: "···································";
        }
      }
    }
    &:nth-of-type(3) {
      .label {
        &::after {
          // #0E3A65
          content: "······························";
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
          content: "······································";
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
