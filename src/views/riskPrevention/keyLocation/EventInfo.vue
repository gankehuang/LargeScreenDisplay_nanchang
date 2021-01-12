<template>
  <div class="info-block">
    <div class="block-title">实时预警</div>
    <div class="list-container">
      <el-scrollbar style="height: 100%">
        <div class="list-item" v-for="item in eventAllList" :key="item.id">
          <p class="item-title">
            {{ item.happenedTime }}
          </p>
          <div class="item-con">
            <div class="item-status">{{ item.statusText }}</div>
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
              class="content-row"
              v-if="item.eventName === '人员布控告警'"
              @click="showDialog(item)"
            >
              <div class="row-label">
                <span>{{ item.peopleName | hideName }}{{ item.peopleLabel }}布控</span>
              </div>
              <!-- <div class="row-label">
               <span>{{ item.eventName }}</span>
              </div> -->
              <div class="row-label">
                <span class="row-content">{{ item.location }}</span>
                <img
                  src="@/assets/image/KeyThrong/position.png"
                  class="position-icon"
                  @click.stop="focusEvent(item)"
                />
              </div>
            </div>
            <div class="content-row" v-else @click="showDialog(item)">
              <div class="row-label">
                <span>{{ item.eventName }}</span>
              </div>
              <div class="row-label">
                <span class="row-content">{{ item.location }}</span>
                <img
                  src="@/assets/image/KeyThrong/position.png"
                  class="position-icon"
                  @click.stop="focusEvent(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    eventAllList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    focusEvent(item) {
      this.$emit('focusEvent', {
        ...item,
        position: [item.longitude, item.latitude]
      })
    },
    showDialog(item) {
      console.log(item)
      this.$emit('detailsEvent', {
        ...item,
        position: [item.longitude, item.latitude]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  width: 420px;
  height: 347px;
  background: url('~@/assets/image/keyLocation/rightThree.png') no-repeat;
  background-size: 100% 100%;
  padding: 38px 20px 15px 20px;
  .block-title {
    position: absolute;
    top: 10px;
    left: 39px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: bold;
  }
  .list-container {
    height: 100%;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .list-item {
      width: 100%;
      height: 140px;
      padding: 0 11px;
      cursor: pointer;
      .item-title {
        background: url('~@/assets/image/rentalHousing/组 82.png') no-repeat;
        width: 100%;
        height: 20px;
        padding-left: 30px;
        color: #00ffff;
        margin-bottom: 10px;
        span {
          display: inline-block;
        }
      }
      .item-con {
        margin-left: 10%;
        width: 90%;
        height: 110px;
        border: 1px solid #0c62a0;
        display: flex;
        flex-direction: row;
        position: relative;
        .item-status {
          position: absolute;
          top: 6px;
          right: 8px;
          width: 67px;
          height: 20px;
          line-height: 20px;
          margin-left: 10px;
          text-align: center;
          background: url('~@/assets/image/rentalHousing/矩形 1299.png')
            no-repeat;
          background-size: 100% 100%;
          color: #ffffff;
        }
      }
      .img-row {
        width: 74px;
        height: 110px;
        background-color: #091847;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-row {
        margin: 4px 0 0 10px;
        padding-top: 10px;
        width: calc(100% - 84px);
        height: 99px;
      }
      .row-label {
        color: #a9daff;
        margin-bottom: 7px;
        position: relative;
        .grade-text {
          color: #fd573b;
        }
        .position-icon {
          position: absolute;
          width: 16px;
          height: 20px;
          cursor: pointer;
          bottom: -36px;
          right: 8px;
        }
        .time {
          display: inline-block;
          margin-left: 45px;
          color: #7ef1f3;
        }
      }
    }
  }
}
</style>
