<template>
  <div class="block-box">
    <div
      v-for="(item, index) in dataList"
      :key="index"
      class="ball"
    >
      <p>{{ item.value }}</p>
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          name: '天网总数',
          value: 62249
        },
        {
          name: '地网总数',
          value: 6803
        },
        {
          name: '社会资源',
          value: 14839
        },
        {
          name: '智慧云眼',
          value: 22391
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.block-box {
  position: relative;
  right: -200px;
  height: 500px;
  background-size: 100% 100%;
  padding: 0 10px 10px 30px;
  .ball {
    width: 110px;
    height: 110px;
    padding-top: 25px;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    color: #a9daff;
    margin-bottom: 12px;
    background-size: 100% 100%;
    background: url("~@/assets/image/gridView/circle-bg.png") no-repeat center;
    p {
      line-height: 40px;
      font-size: 24px;
      color: #00ffff;
      font-weight: bold;
      margin: 0;
    }
  }
}
</style>
