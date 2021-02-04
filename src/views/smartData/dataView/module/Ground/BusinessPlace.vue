<template>
  <div class="business-place-container">
    <div class="title">
      经营场所
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
import { queryPayPlace } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      code: '3601',
      dataList: [
        { icon: 'key-place-hotel', label: '宾馆', number: 0, unit: '个' },
        {
          icon: 'key-place-Internet-cafe',
          label: '网吧',
          number: 0,
          unit: '个'
        },
        { icon: 'key-place-KTV', label: 'KTV', number: 0, unit: '个' },
        {
          icon: 'key-place-jiuxiao',
          label: '九小场所',
          number: 0,
          unit: '个'
        }
      ]
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted () {
    await this.handleQueryOperatingPlaceCount()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryOperatingPlaceCount()
    })
  },
  methods: {
    async handleQueryOperatingPlaceCount () {
      try {
        // const { status, data } = await queryKeyPlaceCount({
        //   gridCode: this.code
        // })
        // // console.log('`````````````````````', data)
        // if (status === 200) {
        //   this.dataList[0].number = data['hotel']
        //   this.dataList[1].number = data['internetCafe']
        //   this.dataList[2].number = data['sc']
        //   this.dataList[3].number = data['jiux']
        // }
        const { status, data } = await queryPayPlace({
          gridCode: this.code
        })
        // console.log('`````````````````````', data)
        if (status === 200) {
          this.dataList[0].number = data.bg
          this.dataList[1].number = data.wb
          this.dataList[2].number = data.ktv
          this.dataList[3].number = data.jx
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.business-place-container {
  width: 425px;
  height: 280px;
  // margin: 5px;
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
    &:nth-of-type(4) {
      .label {
        margin: 0 40px 0 10px;
      }
    }
    .icon {
      font-size: 20px;
      color: #80f4e7;
    }
    .label-container {
      // align-items: flex-start;
      justify-content: flex-start;
    }
    .label {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      display: inline-block;
      margin: 0 70px 0 10px;
      line-height: 24px;
    }
    .data {
      color: #80f4e7;
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
</style>
