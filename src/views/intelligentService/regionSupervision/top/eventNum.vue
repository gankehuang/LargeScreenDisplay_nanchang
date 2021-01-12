<template>
  <div class="eventNum">
    <div class="title">督导数量分析</div>
    <div class="contain">
      <div class="lefts"></div>
      <div class="middles">
        <p class="alls">{{ num }}</p>
        <p>督导事件总数</p>
      </div>
      <div class="rights">
        <div class="pending">
          <p>3</p>
          <p>待督导</p>
        </div>
        <div class="disposed">
          <p>{{ num ? num - 3 : "--" }}</p>
          <p>已督导</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: Number
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.eventNum {
  width: 618px;
  height: 275px;
  background-color: #1d293b;
  background: url("~@/assets/image/intelligentService/con_top_bgm.png")
    no-repeat;
  background-size: 100% 100%;
  padding: 15px;
  .title {
    margin: 0 0 15px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    line-height: 18px;
  }
  .contain {
    width: 100%;
    height: 227px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lefts {
      width: 117px;
      height: 116px;
      background: url("~@/assets/image/intelligentService/nums-bgm.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .middles {
      width: 150px;
      height: 80px;
      text-align: center;
      p {
        margin: 0;
        padding: 0;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: #a9daff;
      }
      .alls {
        font-size: 30px;
        font-weight: bold;
        color: #00ffff;
      }
    }
    .rights {
      width: 240px;
      height: 195px;
      padding-left: 40px;
      .pending,
      .disposed {
        width: 195px;
        height: 84px;
        text-align: center;
        padding-top: 20px;
        margin-bottom: 15px;
      }
      .pending {
        background: url("~@/assets/image/intelligentService/r-box.png")
          no-repeat;
        background-size: 100% 100%;
        p {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: bold;
          color: #fe693b;
          line-height: 25px;
        }
      }
      .disposed {
        background: url("~@/assets/image/intelligentService/b-box.png")
          no-repeat;
        background-size: 100% 100%;
        p {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: bold;
          color: #a9daff;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
