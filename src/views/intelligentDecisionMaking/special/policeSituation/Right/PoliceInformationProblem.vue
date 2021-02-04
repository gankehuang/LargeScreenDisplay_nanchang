<template>
  <InfoBlock title="警情问题突出领域">
    <div class="list">
      <ul>
        <li
          v-for="(item, index) in top5"
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
            {{ item.value }}
          </div>
        </li>
      </ul>
    </div>
  </InfoBlock>
</template>

<script>
import { alertTop5 } from '@/api/intelligentDecisionMaking/special'
export default {
  data () {
    return {
      top5: []
    }
  },
  mounted () {
    this.getTop5()
  },
  methods: {
    getTop5 () {
      alertTop5().then(res => {
        if (res.status === 200) {
          this.top5 = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.list {
  height: 212px;
  margin: 35px 0 0 0px;
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

</style>
