<template>
  <InfoBlock title="实时预警">
    <div class="keyThrong-list">
      <el-scrollbar style="height: 100%">
        <div
          v-for="item in eventList"
          :key="item.id"
          class="list-item"
        >
          <div class="status_btn">
            {{ item.statusText }}
          </div>
          <div class="img-row">
            <el-image
              v-if="item.eventCode === '62053'"
              fit="fill"
              style="height:100%;"
              lazy
              :src="
                item.snapImageUrl
                  ? item.snapImageUrl
                  : require('@/assets/image/common/no-avatar.png')
              "
              :preview-src-list="[item.snapImageUrl]"
            />
            <CustomImage
              v-else
              fit="fill"
              style="height:100%;"
              lazy
              :src="
                item.snapImageUrl
                  ? item.snapImageUrl
                  : require('@/assets/image/common/no-avatar.png')
              "
              :preview-src-list="[item.snapImageUrl]"
            />
          </div>
          <div
            v-if="item.eventName === '人员布控告警'"
            class="content-row"
            @click="showDialog(item)"
          >
            <div class="row-label">
              <span>{{ item.peopleName }}{{ item.peopleLabel }}布控</span>
            </div>
            <div class="row-label">
              <span>{{ item.location }}</span>
            </div>
            <div class="row-label">
              <span>{{ item.happenedTime }}</span>
              <img
                src="@/assets/image/KeyThrong/position.png"
                class="position-icon"
                @click.stop="focusEvent(item)"
              >
            </div>
          </div>
          <div
            v-else
            class="content-row"
            @click="showDialog(item)"
          >
            <div class="row-label">
              <span>{{ item.eventName }}</span>
            </div>
            <div class="row-label">
              <span>{{ item.location }}</span>
            </div>
            <div class="row-label">
              <span>{{ item.happenedTime }}</span>
              <img
                src="@/assets/image/KeyThrong/position.png"
                class="position-icon"
                @click.stop="focusEvent(item)"
              >
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </InfoBlock>
</template>
<script>
import { selectByGeo } from '@/api/riskPrevention/KeyThrong'
export default {
  data () {
    return {
      eventList: [],
      pagination: {
        pageNum: 1,
        pageSize: 30,
        total: 0
      },
      advancedForm: {
        latitude: '28.640193',
        longitude: '115.816114',
        distance: '1'
      }
    }
  },
  created () {
    this.getAllEventList()
  },
  methods: {
    // 获取全部事件
    async getAllEventList () {
      const { data } = await selectByGeo(
        this.pagination.pageNum,
        this.pagination.pageSize,
        this.advancedForm
      )
      console.log(data)
      this.eventList = data.list.filter((item, index) => {
        item.isShow = true
        return (item.longitude && item.latitude) && (item.statusText !== '已处置' && item.statusText !== '已归档' && item.peopleLabel !== '退役人员')
      })

      this.eventList = this.eventList.slice(0, 50)
    },
    focusEvent (item) {
      this.$EventBus.$emit('focusEvent', item)
    },
    showDialog (item) {
      this.$emit('detailsEvent', item)
    }
  }
}
</script>

<style lang="scss" scoped>

  .keyThrong-list {
    height: 210px;
    margin-top: 10px;
    ::v-deep .el-scrollbar__wrap {
      overflow: auto;
    }
    .list-item {
      width: 100%;
      min-height: 100px;
      background: url('~@/assets/image/KeyThrong/zdqy-list.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: row;
      padding: 10px 10px 0 10px;
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
      .status_btn {
        position: absolute;
        top: 6px;
        right: 10px;
        width: 67px;
        height: 20px;
        line-height: 20px;
        margin-left: 10px;
        text-align: center;
        background: #3498fb;
        border-radius: 8px;
        color: #ffffff;
      }
      .img-row {
        width: 74px;
        height: 89px;
        background-color: #091847;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-row {
        margin-left: 10px;
        width: calc(100% - 84px);
        min-height: 99px;
      }
      .row-label {
        color: #a9daff;
        margin-top: 7px;
        position: relative;
        &:last-child {
          width: 90%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .grade-text {
          color: #fd573b;
        }
        .status {
          display: inline-block;
          width: 58px;
          height: 15px;
          line-height: 15px;
          background-color: #fd573b;
          color: #fff;
          border-radius: 6px;
          text-align: center;
          margin: 0;
          font-size: 12px;
        }
        .position-icon {
          position: absolute;
          right: -20px;
          top: 0;
          width: 16px;
          height: 20px;
          cursor: pointer;
        }
        .time {
          display: inline-block;
          margin-left: 45px;
          color: #7ef1f3;
        }
      }
    }
}
</style>
