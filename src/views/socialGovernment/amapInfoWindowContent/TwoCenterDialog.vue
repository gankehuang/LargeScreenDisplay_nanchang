<template>
  <div class="nc-dialog">
    <div class="title">
      {{ select0ne.name }}{{ select0ne.type }}
    </div>
    <div class="line" />
    <div
      v-if="select0ne && select0ne.data"
      class="info-list"
    >
      <el-scrollbar style="height:300px;">
        <div class="list-item">
          <div class="item-title">
            <i class="item-icon" />
            <span>司法所</span>
          </div>

          <div class="item-info">
            <span>提升改造数量</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[0].value }}</span>
              <span>个</span>
            </div>
          </div>

          <div class="item-info">
            <span>提升改造资金</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[1].value }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-title">
            <i class="item-icon" />
            <span>派出所</span>
          </div>

          <div class="item-info">
            <span>提升改造数量</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[2].value }}</span>
              <span>个</span>
            </div>
          </div>

          <div class="item-info">
            <span>提升改造资金</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[3].value }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="item-title">
            <i class="item-icon" />
            <span>法庭</span>
          </div>

          <div class="item-info">
            <span>提升改造数量</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[4].value }}</span>
              <span>个</span>
            </div>
          </div>

          <div class="item-info">
            <span>提升改造资金</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[5].value }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-title">
            <i class="item-icon" />
            <span>乡镇（街道）信访接待中心</span>
          </div>

          <div class="item-info">
            <span>提升改造数量</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[6].value }}</span>
              <span>个</span>
            </div>
          </div>

          <div class="item-info">
            <span>提升改造资金</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[7].value }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="item-title">
            <i class="item-icon" />
            <span>乡镇（街道）综治中心</span>
          </div>

          <div class="item-info">
            <span>提升改造数量</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[8].value }}</span>
              <span>个</span>
            </div>
          </div>

          <div class="item-info">
            <span>提升改造资金</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[9].value }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-title">
            <i class="item-icon" />
            <span>交警中队营房</span>
          </div>

          <div class="item-info">
            <span>提升改造数量</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[10].value }}</span>
              <span>个</span>
            </div>
          </div>

          <div class="item-info">
            <span>提升改造资金</span>
            <div class="item-right">
              <span class="item-num">{{ select0ne.data[11].value }}</span>
              <span>元</span>
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
    dialogVisable: {
      type: Boolean,
      default: false
    },
    select0ne: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-scrollbar__view {
  display: block !important;
  padding: 5px;
}

.nc-dialog {
  width: 100%;
  height: 100%;
  .title {
    padding: 10px 0 0 48px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: rgb(103, 211, 241);
    font-weight: 400;
  }
  .line {
    width: 100%;
    height: 4px;
    margin: 20px 0 0 50px;
    background: url("~@/assets/image/dataView/ncMap-modal-line-bg.png") center
      center / 100% 100% no-repeat;
  }
  .close {
    cursor: pointer;
    position: absolute;
    z-index: 2002;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: url("~@/assets/image/dataView/pop-modal-close.png") center
      center / 100% 100% no-repeat;
  }
}

.info-list {
  width: 100%;
  height: 100%;
  margin-left: 46px;
  color: #a9daff;

  .list-item {
    width: 237px;
    margin-top: 18px;
    .item-title {
      margin-bottom: 11px;
      display: flex;
      align-items: center;
      .item-icon {
        width: 13px;
        height: 13px;
        background-image: url("~@/assets/image/socialGovernment/dot-bg.png");
        background-size: 100% 100%;
        margin-right: 6px;
      }
    }

    .item-info {
      margin-bottom: 10px;
      padding: 8px 11px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-image: url("~@/assets/image/dataView/ncMap-modal-item-bg.png");
      background-size: 100% 100%;

      .item-right {
        color: #01fff9;
        .item-num {
          font-size: 16px;
          padding-right: 6px;
        }
      }
    }
  }
}
</style>
