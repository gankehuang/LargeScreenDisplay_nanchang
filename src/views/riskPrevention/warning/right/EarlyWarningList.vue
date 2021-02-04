<template>
  <InfoBlock
    title="预警列表"
    height="58%"
  >
    <div class="search-box">
      <el-input
        v-model="searchForm.eventName"
        placeholder="关键字"
        class="input-with-select"
      >
        <el-select
          slot="prepend"
          v-model="searchForm.status"
          placeholder="请选择"
          class="select-style"
        >
          <el-option
            label="全部"
            value=""
          />
          <el-option
            label="未受理"
            value="1"
          />
          <el-option
            label="已派发"
            value="2"
          />
          <el-option
            label="超时"
            value="4"
          />
          <el-option
            label="催单"
            value="5"
          />
        </el-select>
      </el-input>
      <svg-icon
        icon-class="search"
        class="svg-icon"
        @click="searchBtn"
      />
    </div>
    <div class="event-list">
      <el-scrollbar style="height:100%;">
        <div
          v-for="(item, index) in eventList"
          :key="index"
          class="item"
        >
          <div class="status-btn">
            {{ item.statusText }}
          </div>
          <div class="event-img">
            <el-image
              v-if="item.eventCode === '62053'"
              lazy
              :src="
                item.snapBakUrl
                  ? item.snapBakUrl
                  : item.snapImageUrl
                    ? item.snapImageUrl
                    : require('@/assets/image/common/no-avatar.png')
              "
              :preview-src-list="[
                item.snapBakUrl
                  ? item.snapBakUrl
                  : item.snapImageUrl
                    ? item.snapImageUrl
                    : require('@/assets/image/common/no-avatar.png')
              ]"
            />
            <CustomImage
              v-else
              lazy
              :src="
                item.snapBakUrl
                  ? item.snapBakUrl
                  : item.snapImageUrl
                    ? item.snapImageUrl
                    : require('@/assets/image/common/no-avatar.png')
              "
              :preview-src-list="[
                item.snapBakUrl
                  ? item.snapBakUrl
                  : item.snapImageUrl
                    ? item.snapImageUrl
                    : require('@/assets/image/common/no-avatar.png')
              ]"
            />
          </div>
          <div
            v-if="item.eventName === '人员布控告警'"
            class="event-info"
            @click="showEventDetail(item)"
          >
            <div class="event-name">
              <span>{{ item.peopleName | hideName }}{{ item.peopleLabel }}布控</span>
            </div>
            <div
              class="detail text-overflow"
              :title="item.address"
            >
              {{ item.address }}
            </div>
            <div
              class="detail text-overflow"
            >
              {{ item.date }}
            </div>
          </div>
          <div
            v-else
            class="event-info"
            @click="showEventDetail(item)"
          >
            <div class="event-name">
              <span>{{ item.name }}</span>
            </div>
            <div
              class="detail text-overflow"
              :title="item.address"
            >
              {{ item.address }}
            </div>
            <div
              class="detail text-overflow"
            >
              {{ item.date }}
            </div>
          </div>
          <img
            src="@/assets/image/common/position-icon.png"
            class="position"
            @click.stop="focusEvent(item)"
          >
        </div>
      </el-scrollbar>
    </div>
  </InfoBlock>
</template>

<script>
import { toArrRepeat } from '@/utils/common'
import { getEventArr } from '@/api/intelligentCommand/warning'
const enumEventStatus = {
  1: '未受理',
  2: '已派发',
  3: '已处置',
  4: '超时',
  5: '催单',
  6: '已归档'
}

export default {
  data () {
    return {
      eventList: [],
      searchForm: {
        status: '',
        eventName: '',
        excludeEventCodeList: 'supervise'
      }
    }
  },
  created () {
    this.getAllEventList()
  },
  methods: {
    focusEvent (item) {
      this.$EventBus.$emit('focusEvent', item)
    },
    showEventDetail (item) {
      this.$EventBus.$emit('showEventDetail', item)
    },
    getAllEventList () {
      getEventArr(this.searchForm).then(res => {
        const needList = res.data
          .filter(
            item =>
              item.longitude &&
              item.latitude &&
              item.statusText !== '已处置' &&
              item.statusText !== '已归档' &&
              item.peopleLabel !== '退役人员'
          )
          .map(item => {
            return {
              ...item,
              status: enumEventStatus[item.status],
              name: item.eventName,
              date: item.happenedTime,
              detail: item.eventName + '预警，请及时处理！',
              address: item.location,
              position: [item.longitude, item.latitude]
            }
          })

        this.eventList = toArrRepeat(needList, 'deviceSerialNo')
      })
    },
    searchBtn () {
      this.getAllEventList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}

.search-box {
  position: relative;
  width: 100%;
  margin-top: 10px;
  height: 36px;
  background: url('~@/assets/image/importPeople/special-search-bg.png')
  no-repeat center center;
  background-size: 100% 100%;
  ::v-deep .el-select .el-input {
    width: 100px;
    font-size: 14px;
    color: #fff;
  }
  ::v-deep .el-input__inner {
    font-size: 14px;
    height: 36px !important;
    line-height: 36px !important;
    border: none;
    background: rgba(0, 0, 0, 0);
    color: #fff;
  }
  ::v-deep .el-input-group__prepend {
    border-radius: 10px 0 0 10px;
    background: rgba(0, 0, 0, 0);
    border: none;
  }
  .svg-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: #2971c2;
    cursor: pointer;
  }
}

.event-list {
  height: calc(100% - 60px);
  .item {
    position: relative;
    display: flex;
    background: url('~@/assets/image/warning/item-bg.png') no-repeat center;
    background-size: 100% 100%;
    margin: 10px auto;
    cursor: pointer;
    .status-btn {
      position: absolute;
      top: 6px;
      right: 10px;
      width: 67px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #3498fb;
      border-radius: 8px;
      color: #ffffff;
    }
    .event-img {
      width: 90px;
      height: 80px;
      .el-image {
        width: 90px;
        height: 80px;
      }
    }
    .event-info {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      flex-grow: 1;
      .event-name {
        color: #ffffff;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
      }
      .detail {
        width: 240px;
        color: #b2e3fc;
        margin-top: 6px;
      }
    }
    .position {
      position: absolute;
      width: 16px;
      height: 20px;
      bottom: 12px;
      right: 20px;
      cursor: pointer;
    }
  }
}
</style>
