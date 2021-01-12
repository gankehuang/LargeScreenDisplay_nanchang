<template>
  <div class="rightTwo">
    <div class="title">热门事件</div>
    <div class="con">
      <el-scrollbar style="height:100%;width:100%;">
        <div
          class="con-list"
          v-for="(item, index) in list"
          :key="index"
          @click="showEventDetail(item)"
        >
          <div class="con-list-left">{{ index + 1 }}</div>
          <div class="con-list-right">
            <div class="details">
              <img
                src="@/assets/image/warning/position.png"
                class="position"
                @click.stop="focusEvent(item)"
              />
            </div>
            <div class="name">{{ item.eventName }}</div>
            <div class="Introduction">
              <p>{{ item.happenedTime }}</p>
              <p>{{ item.emergencyLevelText }}</p>
              <span>{{ item.typeText }}</span>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { queryEventList } from '@/api/intelligentService/earlyWarningDisposal'
import { yuqingList } from './mock'
export default {
  data() {
    return {
      list: [],
      advancedForm: {
        excludeEventCodeList: 'supervise',
        type: 5
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    showEventDetail(item) {
      this.$emit('showDetail', item)
    },
    getList() {
      this.list = []
      queryEventList(1, 100, this.advancedForm)
        .then(res => {
          this.isLoading = false
          const { status, data } = res
          if (status === 200) {
            this.list = data.list.map((item, index) => {
              const objs = yuqingList.find(
                one => item.eventName.indexOf(one.name) > -1
              )
              if (objs !== undefined) {
                return {
                  ...item,
                  media: objs.media,
                  comments: objs.comments
                }
              } else {
                return {
                  ...item,
                  media: yuqingList[0].media,
                  comments: yuqingList[0].comments
                }
              }
            })
          }
        })
        .catch(() => {})
    },
    focusEvent(item) {
      this.$emit('focusEvent', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.rightTwo {
  position: relative;
  width: 420px;
  height: 496px;
  background: url("~@/assets/image/politicalLaw/rightTwo.png") no-repeat center
    center;
  background-size: 100% 100%;
  padding: 50px 15px 10px 15px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
  .con {
    width: 390px;
    height: 430px;
    overflow: auto;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .con-list {
      width: 100%;
      height: 74px;
      margin-bottom: 13px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .con-list-left {
        width: 26px;
        height: 26px;
        font-size: 14px;
        font-weight: 400;
        color: #a9daff;
        line-height: 26px;
        text-align: center;
        background: url("~@/assets/image/politicalLaw/椭圆 965.png") no-repeat
          center center;
        background-size: 100% 100%;
      }
      .con-list-right {
        width: 348px;
        height: 74px;
        margin-left: 16px;
        padding-top: 15px;
        background: url("~@/assets/image/politicalLaw/矩形 971.png") no-repeat
          center center;
        background-size: 100% 100%;
        position: relative;
        p {
          margin: 0;
          padding: 0 10px;
        }
        .details {
          position: absolute;
          top: 10px;
          right: 18px;
          font-size: 12px;
          font-weight: 400;
          color: #1c7ce1;
          line-height: 21px;
          cursor: pointer;
          img {
            width: 16px;
          }
        }
        .name {
          width: 250px;
          padding: 0 10px;
          font-size: 16px;
          font-weight: 400;
          color: #a9daff;
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .Introduction {
          display: flex;
          font-size: 14px;
          font-weight: 400;
          color: #72aad4;
          line-height: 28px;
          position: relative;
          span {
            position: absolute;
            right: 10px;
          }
        }
      }
    }
  }
}
</style>
