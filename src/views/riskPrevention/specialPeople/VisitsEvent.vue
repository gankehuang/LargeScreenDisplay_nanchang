<template>
  <div class="win-info">
    <div class="title">
      信访事件
    </div>
    <div class="content">
      <el-scrollbar style="height:100%;">
        <div
          v-for="(item, index) in eventList"
          :key="index"
          class="event-item"
        >
          <div class="item-top">
            <span class="event-name">
              <svg-icon
                icon-class="item-dot"
                class="icon"
              />{{
                item.name
              }}</span>
            <span class="event-time">{{ item.time }}</span>
          </div>
          <div class="item-bottom">
            {{ item.content }}
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eventList: [
        {
          name: '省信访局',
          time: '2020-10-12 10:21:33',
          content: '百余名中华情受损人员到省信访局上访'
        },
        {
          name: '省信访局',
          time: '2020-10-13 14:43:20',
          content: '10余名中华情受损人员到省信访局上访。'
        },
        {
          name: '省信访局',
          time: '2020-10-14 09:55:54',
          content: '20余名中华情受损人员到省信访局上访。'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/specialPeople/right-bg3.png") no-repeat
    center;
  background-size: 100% 100%;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 10px;
    font-weight: bold;
  }

  /deep/ .el-scrollbar__wrap {
    overflow: auto;
  }
  .content {
    padding: 0 30px;
    height: 225px;
    .event-item {
      .icon {
        color: #3b9afe;
        font-size: 16px;
        margin-right: 10px;
      }
      padding: 15px 0;
      border-bottom: 1px solid #033b85;
      color: #a9daff;
      .item-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .event-name {
          font-size: 16px;
        }

        .event-time {
          color: #00ffff;
        }
      }
    }
  }
}
</style>
