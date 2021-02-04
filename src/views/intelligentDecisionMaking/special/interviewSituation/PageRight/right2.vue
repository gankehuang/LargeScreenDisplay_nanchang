<template>
  <div class="win-info-center">
    <div class="title">
      信访问题突出领域
    </div>
    <div class="list">
      <ul>
        <li
          v-for="(item, index) in itemList"
          :key="index"
        >
          <div class="icon">
            <svg-icon
              icon-class="ranking"
              class="svg-icon"
            />
            <div class="serial">
              {{ index + 1 }}
            </div>
          </div>
          <div class="names">
            {{ item.name }}
          </div>
          <div class="line" />
          <div class="num">
            {{ item.data }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getTop5 } from '@/api/intelligentDecisionMaking/mood'
export default {
  data () {
    return {
      itemList: []
    }
  },
  created () {
    this.getTop5()
  },
  methods: {
    getTop5 () {
      getTop5().then(res => {
        console.log(res)
        this.itemList = [
          {
            name: '城乡建设',
            data: res.data.data[0].number
          },
          {
            name: '房地产',
            data: res.data.data[1].number
          },
          {
            name: '安置补偿',
            data: res.data.data[2].number
          },
          {
            name: '社会保障',
            data: res.data.data[3].number
          },
          {
            name: '房屋拆迁',
            data: res.data.data[4].number
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.win-info-center {
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/interviewSituation/right-center.png")
    no-repeat center;
  background-size: 100% 100%;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 29px;
    font-weight: bold;
  }
  .list {
    height: 212px;
    ul {
      margin: 0px 30px;
      padding: 0px;
      li {
        display: flex;
        flex-direction: row;
        margin: 20px 0px;
        .icon {
          width: 19px;
          height: 19px;
          margin-right: 10px;
          position: relative;
          .svg-icon {
            font-size: 19px;
            color: #3b9afe;
          }
          .serial {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 19px;
            height: 19px;
            line-height: 19px;
            text-align: center;
            color: #00225c;
          }
        }
        .names {
          color: #a9daff;
          font-size: 16px;
        }
        .line {
          flex: 1;
          height: 17px;
          border-bottom: 1px dashed #1e539a;
          margin: 0px 13px 0px 2px;
        }
        .num {
          color: #a9daff;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
