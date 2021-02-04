<template>
  <div class="public-safety-container">
    <div class="title">
      公共场所
    </div>
    <ul>
      <li
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="label-container">
          <svg-icon
            :icon-class="item.icon"
            class="icon"
          />
          <span class="label">{{ item.label }}</span>
        </div>
        <div class="data">
          <span>{{ item.number }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { queryKeyPlaceCount } from '@/api/smartData/dataView'
import { queryCommonPlace } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      dataList: [
        {
          icon: 'hcz-1',
          label: '火车站',
          number: 0,
          unit: '个'
        },
        {
          icon: 'gjzt-1',
          label: '公交车站',
          number: 0,
          unit: '个'
        },
        { icon: 'qczz-1', label: '汽车站', number: 0, unit: '个' },
        {
          icon: 'jct-1',
          label: '机场',
          number: 0,
          unit: '个'
        }
      ],
      code: '3601'
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted () {
    this.handleQueryPubSafetyCount()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryPubSafetyCount()
    })
  },
  methods: {
    // async handleQueryPubSafetyCount() {
    //   try {
    //     const { status, data } = await queryKeyPlaceCount({
    //       gridCode: this.code
    //     })
    //     if (status === 200) {
    //       this.dataList[0].number = data['hcz']
    //       this.dataList[1].number = data['gjdt']
    //       this.dataList[2].number = data['mt']
    //       this.dataList[3].number = data['jc']
    //     }
    //   } catch (error) {}
    // }
    async handleQueryPubSafetyCount () {
      try {
        const { status, data } = await queryCommonPlace({
          gridCode: this.code
        })
        if (status === 200) {
          this.dataList[0].number = data.hcz
          this.dataList[1].number = data.gjcz
          this.dataList[2].number = data.qcz
          this.dataList[3].number = data.jc
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.public-safety-container {
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
    padding: 0;
    margin-top: 20px;
    width: 100%;
  }
  li {
    width: 50%;
    margin: 20px 0;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:nth-of-type(1) {
      .label {
        margin: 0 50px 0 10px;
      }
    }
    &:nth-of-type(4) {
      .label {
        margin: 0 80px 0 10px;
      }
    }
    .icon {
      font-size: 20px;
      color: #80f4e7;
      //&:last-child{
      //  margin-right: 20px;
      //}
    }
    .label-container {
      // align-items: flex-start;
      justify-content: flex-start;
    }
    .label {
      font-size: 18px;
      font-weight: 400;
      color: #ffffff;
      display: inline-block;
      margin: 0 50px 0 10px;
      line-height: 24px;
    }
    .data {
      color: #a9daff;
      span:nth-of-type(1) {
        font-size: 26px;
        display: inline-block;
        margin: 10px 15px 0 0;
        line-height: 24px;
      }
      span:nth-of-type(2) {
        font-size: 12px;
      }
    }
  }
}
</style>
