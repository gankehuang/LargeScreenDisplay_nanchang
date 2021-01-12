<template>
  <div class="thing-handle-container">
    <div class="title">事件处置</div>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        <div class="label-container">
          <svg-icon :icon-class="item.icon" class="icon" />
          <span class="label">{{ item.label }}</span>
        </div>
        <div class="data">
          <CountTo :startVal="0" :endVal="item.number" :duration="300" />
          <!-- <span>{{item.number}}</span> -->
          <span>{{ item.unit }}</span>
        </div>
      </li>
    </ul>
    <ul class="ul">
      <li v-for="(item, index) in bottomDataList" :key="index" class="li">
        <RingPerChart
          :number="item.number"
          :total="item.total"
          :color="item.color"
          :isPerBool="false"
          :styleObj="item.styleObj"
        >
          <div class="data">
            <div>{{ item.label }}</div>
            <div>{{ ((item.number / item.total) * 100).toFixed(2) + "%" }}</div>
          </div>
        </RingPerChart>
      </li>
    </ul>
  </div>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
import { queryEventHandle } from '@/api/smartData/dataView'
export default {
  components: {
    RingPerChart
  },
  data() {
    return {
      code: '3601',
      dataList: [
        {
          icon: 'thing-done',
          label: '办结数',
          number: 0,
          unit: '件'
        },
        {
          icon: 'thing-overtime',
          label: '未办结数',
          number: 0,
          unit: '件'
        },
        { icon: 'thing-resign', label: '未办逾期数', number: 0, unit: '件' }
      ],
      bottomDataList: [
        {
          label: '办结率',
          number: 0,
          total: 0,
          color: '#3497fb',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-one.png')})`
          }
        },
        {
          label: '未办逾期率',
          number: 0,
          total: 0,
          color: '#80f4e7',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-two.png')})`
          }
        }
      ]
    }
  },
  mounted() {
    this.getAsyncData()
    this.$EventBus.$on('update:dataViewSeleItem', async({ code }) => {
      this.code = code
      await this.getAsyncData()
    })
  },
  methods: {
    async getAsyncData() {
      try {
        const { status, data } = await queryEventHandle({
          gridCode: this.code
        })
        if (status === 200) {
          this.dataList[0].number = data['complete']
          this.dataList[1].number = data['unComplete']
          this.dataList[2].number = data['overdue']
          this.bottomDataList[0].number = data['complete']
          this.bottomDataList[0].total = data['complete'] + data['unComplete']
          this.bottomDataList[1].number = data['overdue']
          this.bottomDataList[1].total =
            data['overdue'] + data['unComplete'] + data['complete']
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.thing-handle-container {
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
    padding: 0 20px;
    margin-top: 20px;
    width: 100%;
  }
  li {
    width: 32%;
    margin: 20px 0;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:nth-of-type(3) {
      margin: 10px 0;
      .label {
        margin: 0 0 0 10px;
      }
    }
    &:nth-of-type(2) {
      .label {
        margin: 0 15px 0 15px;
      }
    }
    .icon {
      font-size: 20px;
      color: #a9daff;
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
      margin: 0 30px 0 10px;
      line-height: 24px;
    }
    .data {
      color: #a9daff;
      margin-left: 2px;
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
  .ul {
    padding: 0 20px;
    margin-top: 5px;
    width: 100%;
    .data {
      position: absolute;
      text-align: center;
      top: 5px;
      right: 10px;
    }
    .li {
      width: 45%;
      margin: 10px 0;
      &:nth-of-type(1) {
        .data {
          div:nth-of-type(2) {
            color: #3497fb;
          }
        }
      }
      &:nth-of-type(2) {
        .data {
          div:nth-of-type(2) {
            color: #80f4e7;
          }
        }
      }
      .data {
        div:nth-of-type(1) {
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          line-height: 36px;
        }
        div:nth-of-type(2) {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
