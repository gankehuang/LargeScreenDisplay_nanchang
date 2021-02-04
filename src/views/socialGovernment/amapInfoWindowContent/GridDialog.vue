<template>
  <div class="nc-dialog">
    <div class="title">
      {{ select0ne.name }}{{ select0ne.type }}
    </div>
    <div class="line" />

    <div class="dialog-content">
      <div class="total-list">
        <div class="total-item">
          <div class="total-num">
            {{ grid.gridMember }}
          </div>
          <div class="total-name">
            网格员
          </div>
        </div>
        <div class="total-item">
          <div class="total-num">
            {{ grid.grid }}
          </div>
          <div class="total-name">
            网格数
          </div>
        </div>
        <div class="total-item">
          <div class="total-num">
            {{ grid.gridFuse }}
          </div>
          <div class="total-name">
            网格融入
          </div>
        </div>
      </div>

      <div class="division-line">
        <span class="small-title">网格融入</span>
      </div>

      <div class="info-list">
        <div class="info-item">
          <span class="item-label">公安：</span>
          <span class="item-value">{{ gridFuse.policeManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">消防：</span>
          <span class="item-value">{{ gridFuse.fireManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">城管：</span>
          <span class="item-value">{{ gridFuse.cityManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">生态环境：</span>
          <span class="item-value">{{ gridFuse.environment }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">司法：</span>
          <span class="item-value">{{ gridFuse.lawManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">住建：</span>
          <span class="item-value">{{ gridFuse.cityLiveManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">市监：</span>
          <span class="item-value">{{ gridFuse.superviseManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">房管：</span>
          <span class="item-value">{{ gridFuse.houseManage }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">卫健委：</span>
          <span class="item-value">{{ gridFuse.healthManager }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">交管：</span>
          <span class="item-value">{{ gridFuse.trafficManager }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">信访：</span>
          <span class="item-value">{{ gridFuse.petitionManager }}</span>
        </div>
        <div class="info-item">
          <span class="item-label">其他：</span>
          <span class="item-value">{{ gridFuse.otherManager }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    select0ne: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {}
  },
  computed: {
    grid () {
      return this.select0ne && this.select0ne.data
        ? this.select0ne.data.grid
        : {
          gridMember: '',
          grid: '',
          gridFuse: ''
        }
    },
    gridFuse () {
      return this.select0ne && this.select0ne.data
        ? this.select0ne.data.gridFuse
        : {
          policeManage: '',
          fireManage: '',
          cityManage: '',
          superviseManage: '',
          houseManage: '',
          healthManager: '',
          trafficManager: '',
          petitionManager: '',
          otherManager: ''
        }
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .dialog-content {
    margin-left: 46px;
  }

  .total-list {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .total-item {
      width: 64px;
      height: 64px;
      padding-top: 10px;
      text-align: center;
      color: #a9daff;
      background: url("~@/assets/image/socialGovernment/grid-total-item-bg.png")
        center center / 100% 100% no-repeat;
    }
  }

  .division-line {
    width: 80%;
    margin: 10px auto;
    height: 6px;
    text-align: center;
    background: url("~@/assets/image/socialGovernment/grid-modal-line.png")
      center center / 100% 100% no-repeat;
    .small-title {
      position: relative;
      top: -5px;
      color: #a9daff;
    }
  }

  .info-list {
    display: flex;
    flex-wrap: wrap;
    background: url("~@/assets/image/socialGovernment/grid-item-bg.png") center
      center / 100% 100% no-repeat;
    padding: 15px;
    .info-item {
      flex: 0 0 50%;
      margin-bottom: 12px;
      .item-label {
        color: #a9daff;
      }

      .item-value {
        color: #07fbfc;
      }
    }
  }
}
</style>
