<template>
  <div class="leftOneSchool">
    <div class="title">学校数量</div>
    <div class="items">
      <p class="alls">学校总数 <span>1213</span>所</p>
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
  data() {
    return {
      nums: null,
      leftTopList: [
        {
          title: '幼儿园',
          num: 217
        },
        {
          title: '小学',
          num: 599
        },
        {
          title: '中学',
          num: 162
        },
        {
          title: '高中',
          num: 97
        }
      ]
    }
  },
  watch: {
    clientDetails: {
      immediate: true,
      handler: curValue => {}
    }
  },
  mounted() {}
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
      background: url("~@/assets/image/keyLocation/school-num.png") no-repeat;
      line-height: 90px;
      padding-left: 210px;
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
        width: 88px;
        height: 79px;
        padding-top: 10px;
        background: url("~@/assets/image/keyLocation/school-type.png");
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
