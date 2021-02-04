<template>
  <div class="realhousing-container">
    <div class="title">
      事件概况
    </div>
    <ul>
      <li>
        <div class="icon" />
        <div class="data">
          <!-- <span>{{report}}</span> -->
          <CountTo
            :start-val="0"
            :end-val="report"
            :duration="300"
          />
        </div>
        <div class="label">
          上报数
        </div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <!-- <span>{{receive}}</span> -->
          <CountTo
            :start-val="0"
            :end-val="receive"
            :duration="300"
          />
        </div>
        <div class="label">
          分派数
        </div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <!-- <span>{{reject}}</span> -->
          <CountTo
            :start-val="0"
            :end-val="reject"
            :duration="300"
          />
        </div>
        <div class="label">
          驳回数
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { queryEventGeneral } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      code: '3601',
      report: 0,
      receive: 0,
      reject: 0
    }
  },
  mounted () {
    this.getAsyncData()
    this.$EventBus.$on('update:dataViewSeleItem', async ({ code }) => {
      this.code = code
      await this.getAsyncData()
    })
  },
  methods: {
    async getAsyncData () {
      try {
        const { status, data } = await queryEventGeneral({
          gridCode: this.code
        })
        if (status === 200) {
          for (const key in data) {
            switch (key) {
              case 'report':
                this.report = data[key]
                break
              case 'receive':
                this.receive = data[key]
                break
              case 'abort':
                this.reject = data[key]
                break
              default:
                break
            }
          }
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
      width: 97px;
      height: 90px;
      margin: 30px 0 10px;
    }
    .data {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      line-height: 24px;
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
      background: url("~@/assets/image/dataView/thing-report.png") center center /
        100% 100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #189aff;
      }
    }
  }
  li:nth-of-type(2) {
    .icon {
      background: url("~@/assets/image/dataView/fps.png") center center / 100%
        100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #80f4e7;
      }
    }
  }
  li:nth-of-type(3) {
    .icon {
      background: url("~@/assets/image/dataView/bhls.png") center center / 100%
        100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #a9daff;
      }
    }
  }
}
</style>
