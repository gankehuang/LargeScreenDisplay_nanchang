<template>
  <div class="block-box">
    <div class="block-content">
      <div class="block-left">
        <div
          class="item-block"
          :class="{ active: regionInfo.gridLevel === 1 }"
        ></div>
        <div
          class="item-block"
          :class="{ active: regionInfo.gridLevel === 3 }"
        ></div>
        <div
          class="item-block"
          :class="{ active: regionInfo.gridLevel === 4 }"
        ></div>
        <div
          class="item-block"
          :class="{ active: regionInfo.gridLevel === 5 }"
        ></div>
        <div
          class="item-block"
          :class="{ active: regionInfo.gridLevel === 6 }"
        ></div>
      </div>
      <div class="region-list">
        <div class="list-item" :class="{ active: regionInfo.gridLevel === 1 }">
          <div class="item-name">
            市
          </div>
          <div
            class="item-value"
            @click.stop="handleRegionInfo(3601, 1, '南昌市')"
          >
            南昌市
          </div>
        </div>
        <div class="list-item" :class="{ active: regionInfo.gridLevel === 3 }">
          <div class="item-name">
            县区
          </div>
          <div
            class="item-value"
            @click.stop="
              handleRegionInfo(
                needRegionInfo.countyCode,
                needRegionInfo.countyGridLevel,
                needRegionInfo.county
              )
            "
          >
            {{
              regionInfo.gridLevel >= 3
                ? needRegionInfo.county
                : needRegionInfo.countyNum
            }}
          </div>
        </div>
        <div class="list-item" :class="{ active: regionInfo.gridLevel === 4 }">
          <div class="item-name">
            镇街
          </div>
          <div
            class="item-value"
            @click.stop="
              handleRegionInfo(
                needRegionInfo.streetCode,
                needRegionInfo.streetGridLevel,
                needRegionInfo.street
              )
            "
          >
            {{
              regionInfo.gridLevel >= 4
                ? needRegionInfo.street
                : needRegionInfo.streetNum
            }}
          </div>
        </div>
        <div class="list-item" :class="{ active: regionInfo.gridLevel === 5 }">
          <div class="item-name">
            村社
          </div>
          <div
            class="item-value"
            @click.stop="
              handleRegionInfo(
                needRegionInfo.communityCode,
                needRegionInfo.communityGridLevel,
                needRegionInfo.community
              )
            "
          >
            {{
              regionInfo.gridLevel >= 5
                ? needRegionInfo.community
                : needRegionInfo.communityNum
            }}
          </div>
        </div>
        <div class="list-item">
          <div class="item-name">
            网格
          </div>
          <div class="item-value">
            {{ needRegionInfo.gridNum }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryGridLevelNum } from '@/api/smartData/gridView'
export default {
  props: {},
  watch: {},
  data() {
    return {
      needRegionInfo: {
        county: '',
        countyCode: '',
        countyGridLevel: '',
        countyNum: 0,
        street: '',
        streetGridLevel: '',
        streetCode: '',
        streetNum: 0,
        community: '',
        communityGridLevel: '',
        communityCode: '',
        communityNum: 0,
        gridNum: 0
      },
      regionInfo: {
        name: '南昌市',
        gridLevel: -1,
        code: '3601'
      }
    }
  },
  created() {
    this.queryGridLevelNum(3601)
  },
  beforeDestroy() {
    this.$EventBus.$off('update:regionInfo')
  },
  mounted() {
    this.$EventBus.$on('update:regionInfo', res => {
      this.regionInfo = res
      this.queryGridLevelNum(res.code)
      if (res.gridLevel === 3) {
        this.needRegionInfo.county = res.name
        this.needRegionInfo.countyCode = res.code
        this.needRegionInfo.countyGridLevel = res.gridLevel
      } else if (res.gridLevel === 4) {
        this.needRegionInfo.street = res.name
        this.needRegionInfo.streetCode = res.code
        this.needRegionInfo.streetGridLevel = res.gridLevel
      } else if (res.gridLevel === 5) {
        this.needRegionInfo.community = res.name
        this.needRegionInfo.communityCode = res.code
        this.needRegionInfo.communityGridLevel = res.gridLevel
      }
    })
  },
  components: {},
  methods: {
    handleRegionInfo(code, level, name) {
      if (code && level) {
        this.$EventBus.$emit('update:changeRegionInfo', {
          code: code,
          gridLevel: level,
          name: name
        })
      }
    },
    queryGridLevelNum(gridCode) {
      queryGridLevelNum({
        gridCode: gridCode
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.needRegionInfo.countyNum = data.district
          this.needRegionInfo.streetNum = data.village
          this.needRegionInfo.communityNum = data.community
          this.needRegionInfo.gridNum = data.grid
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-box {
  position: relative;
  width: 425px;
  height: 565px;
  // background: url("~@/assets/image/gridView/left-block-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 50px 10px 10px 10px;
  .box-title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: 600;
  }
  .block-content {
    display: flex;
  }
  .block-left {
    margin-top: 15px;
    margin-left: 10px;
    .item-block {
      width: 177px;
      height: 116px;
      position: relative;
      &:first-child {
        background: url("~@/assets/image/gridView/item-block-city-bg.png")
          no-repeat;
        background-size: 100% 100%;
        z-index: 6;

        &.active {
          background: url("~@/assets/image/gridView/item-block-city-active-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(2) {
        background: url("~@/assets/image/gridView/item-block-area-bg.png")
          no-repeat;
        background-size: 100% 100%;
        top: -25px;

        &.active {
          background: url("~@/assets/image/gridView/item-block-area-active-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(3) {
        background: url("~@/assets/image/gridView/item-block-street-bg.png")
          no-repeat;
        background-size: 100% 100%;
        top: -45px;
        &.active {
          background: url("~@/assets/image/gridView/item-block-street-active-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(4) {
        background: url("~@/assets/image/gridView/item-block-grid-bg.png")
          no-repeat;
        background-size: 100% 100%;
        top: -70px;
        &.active {
          background: url("~@/assets/image/gridView/item-block-grid-active-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }

      &:nth-child(5) {
        background: url("~@/assets/image/gridView/item-block-bottom-bg.png")
          no-repeat;
        background-size: 100% 100%;
        top: -85px;

        &.active {
          background: url("~@/assets/image/gridView/item-block-bottom-active-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .region-list {
    margin-top: 50px;
    margin-left: 20px;
    flex: 0 0 calc(100% - 210px);
    .list-item {
      display: flex;
      // width: 152px;
      margin-bottom: 55px;
      background: url("~@/assets/image/gridView/left-line-bg.png") no-repeat
        center;
      background-size: 100% 100%;
      .item-name {
        width: 70px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: #fff;
      }

      .item-value {
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
      }

      &.active {
        .item-name,
        .item-value {
          color: #00ffff;
        }
      }
    }
  }
}
</style>
