<template>
  <div class="win-info">
    <div class="search-box">
      <el-input
        placeholder="搜索特殊人员"
        v-model="searchVal"
        class="input-with-select"
      >
      </el-input>
      <svg-icon icon-class="search" class="svg-icon" />
    </div>
    <div class="list">
      <el-scrollbar style="height: 100%;">
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <div class="left">
            <el-image
              v-if="item.xp"
              :src="'data:image/png;base64,' + item.xp"
              :preview-src-list="['data:image/png;base64,' + item.xp]"
            />
          </div>
          <div class="right">
            <div class="title">{{ item.xm }} {{ item.phone }}</div>
            <div class="tip">
              {{ item.memo }}
            </div>
            <div class="idNumber">身份证号: {{ item.gmsfhm }}</div>
            <div class="address">地址: {{ item.residenceaddr }}</div>
          </div>
          <div class="position" @click="changeEvent(item)">
            <img src="@/assets/image/importPeople/position.png" alt="" />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { getZhqList } from '@/api/riskPrevention/specialPeople'
export default {
  data() {
    return {
      searchVal: '',
      list: [
        {
          img: require('@/assets/image/importPeople/z78.png'),
          name: '*敏',
          phone: '138-****-4845',
          tip: '特殊利益人群',
          idNumber: '3601544********2526',
          address: '江西省南昌市红谷滩新区国体中心1001室'
        },
        {
          img: require('@/assets/image/importPeople/z78.png'),
          name: '王*文',
          phone: '138-****-4845',
          tip: '特殊利益人群',
          idNumber: '3601544********2526',
          address: '江西省南昌市红谷滩新区国体中心1001室'
        },
        {
          img: require('@/assets/image/importPeople/z78.png'),
          name: '*勋',
          phone: '138-****-4845',
          tip: '特殊利益人群',
          idNumber: '3601544********2526',
          address: '江西省南昌市红谷滩新区国体中心1001室'
        },
        {
          img: require('@/assets/image/importPeople/z78.png'),
          name: '龙*松',
          phone: '138-****-4845',
          tip: '特殊利益人群',
          idNumber: '3601544********2526',
          address: '江西省南昌市红谷滩新区国体中心1001室'
        },
        {
          img: require('@/assets/image/importPeople/z78.png'),
          name: '熊*生',
          phone: '138-****-4845',
          tip: '特殊利益人群',
          idNumber: '3601544********2526',
          address: '江西省南昌市红谷滩新区国体中心1001室'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getZhqList({ name: '中华情' }).then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
      })
    },
    changeEvent(item) {
      this.$EventBus.$emit('update: selectedItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 494px;
  background: url("~@/assets/image/specialPeople/left-bg2.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 17px;
  .search-box {
    position: relative;
    margin: 0 auto;
    width: 383px;
    height: 36px;
    background: url("~@/assets/image/importPeople/special-search-bg.png")
      no-repeat center center;
    background-size: 100% 100%;
    /deep/ .input-with-select {
      background: rgba(0, 0, 0, 0);
      border: 0px;
      border-radius: 10px;
    }
    /deep/ .el-select .el-input {
      width: 100px;
      font-size: 14px;
      color: #fff;
    }
    /deep/ .el-input__inner {
      font-size: 14px;
      height: 36px !important;
      line-height: 36px !important;
      border: none;
      background: rgba(0, 0, 0, 0);
      color: #fff;
    }
    /deep/ .el-input-group__prepend {
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
  .list {
    height: 440px;
    margin: 0 14px;
    .list-item {
      display: flex;
      position: relative;
      padding: 25px 0;
      border-bottom: 1px solid #0e408e;
      .left {
        .el-image {
          display: block;
          width: 76px;
          height: 96px;
        }
      }
      .right {
        padding-left: 12px;
        line-height: 22px;
        font-size: 14px;
        color: #58a7fe;
        .title {
          font-size: 16px;
          font-weight: bold;
        }
        .tip {
          font-size: 14px;
          color: #f2bd1b;
        }
      }
      .position {
        position: absolute;
        bottom: 27px;
        right: 5px;
        cursor: pointer;
        img {
          width: 19px;
          height: 25px;
        }
      }
    }
  }
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
</style>
