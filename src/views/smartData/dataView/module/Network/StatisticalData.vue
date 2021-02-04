<template>
  <div class="statistical-data-container">
    <div class="title">
      网汇数据
    </div>
    <ul>
      <li
        v-for="(item, index) in dataList"
        :key="index"
      >
        <!-- <svg-icon
          :icon-class="item.icon"
          class="icon"
        /> -->
        <span class="label">{{ item.label }}</span>
        <div class="data">
          <CountTo
            :start-val="0"
            :end-val="Number(item.number)"
            :duration="300"
            class="number"
          />
          <!-- <span class="number">{{item.number}}</span> -->
          <!-- <span class="unit">{{item.unit}}</span> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDeptData } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      dataList: [
        {
          label: '公安',
          number: 0,
          unit: '条'
        },
        {
          label: '市政',
          number: 0,
          unit: '条'
        },
        {
          label: '自然资源',
          number: 0,
          unit: '条'
        },
        {
          label: '法院',
          number: 0,
          unit: '条'
        },
        {
          label: '市监',
          number: 0,
          unit: '条'
        }
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getDeptData().then(res => {
        console.log(res)
        if (res.status === 200) {
          this.loading = false
          this.dataList[0].number = res.data.filter(
            item => item.name.indexOf('公安') !== -1
          )[0].sum
          this.dataList[1].number = res.data.filter(
            item => item.name.indexOf('燃气') !== -1
          )[0].sum
          // this.mesList[1].sum =+ res.data.filter(item=>item.name.indexOf('水') !== -1)[0].sum
          this.dataList[2].number = res.data.filter(
            item => item.name.indexOf('自然资源') !== -1
          )[0].sum
          this.dataList[3].number = res.data.filter(
            item => item.name.indexOf('法院') !== -1
          )[0].sum
          this.dataList[4].number = res.data.filter(
            item => item.name.indexOf('市') !== -1
          )[0].sum
        }
      })
      console.log(this.dataList)
    }
  }
}
</script>

<style lang="scss" scoped>
.statistical-data-container {
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
          content: "·····································";
        }
      }
    }
    &:nth-of-type(2) {
      .label {
        &::after {
          // #0E3A65
          content: "·············································";
        }
      }
    }
    &:nth-of-type(3) {
      .label {
        &::after {
          // #0E3A65
          content: "········································";
        }
      }
    }
    &:nth-of-type(4) {
      .label {
        &::after {
          // #0E3A65
          content: "·················································";
        }
      }
    }
    &:nth-of-type(5) {
      .label {
        &::after {
          // #0E3A65
          content: "·················································";
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
