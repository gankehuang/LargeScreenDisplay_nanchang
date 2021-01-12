<template>
  <div class="leftOneSchool">
    <div class="title">建筑工地数量</div>
    <div class="items">
      <p class="alls">建筑工地总数 <span>305</span>个</p>
      <div class="list">
        <div v-for="(item, index) in leftTopList" :key="index">
          <p>{{ item.title }}</p>
          <p class="list-nums">{{ item.num }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clientDetails: {
      type: Number
    }
  },
  watch: {
    clientDetails: {
      immediate: true,
      handler: curValue => {}
    }
  },
  data() {
    return {
      num: null,
      leftTopList: [
        {
          title: '建筑',
          num: 46
        },
        {
          title: '市政道路',
          num: 36
        },
        {
          title: '桥梁',
          num: 21
        },
        {
          title: '地铁',
          num: 68
        },
        {
          title: '其他',
          num: 36
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.leftOneSchool {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/KeyThrong/rentalHousing-left-four.png")
    center / 100% 100% no-repeat;
  padding-top: 40px;
  .title {
    position: absolute;
    top: 10px;
    left: 40px;
    z-index: 99;
    color: #7dbcff;
    font-weight: bold;
    font-size: 16px;
  }
  .items {
    width: 100%;
    height: 100%;
    .alls {
      width: 100%;
      height: 98px;
      background: url("~@/assets/image/keyLocation/constructionSite-num.png")
        no-repeat;
      line-height: 90px;
      padding-left: 170px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #aadaff;
      span {
        display: inline-block;
        padding: 0 8px;
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #e6b00e;
      }
    }
    .list {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        width: 72px;
        height: 80px;
        padding-top: 10px;
        background: url("~@/assets/image/keyLocation/constructionSite-type.png")
          no-repeat;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #aadaff;
        font-size: 14px;
        p {
          padding: 0;
          margin: 0;
          line-height: 30px;
        }
        .list-nums {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
