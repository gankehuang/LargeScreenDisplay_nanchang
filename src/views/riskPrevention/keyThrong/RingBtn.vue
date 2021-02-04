<template>
  <div class="ring-btn">
    <button
      v-for="(item, index) in btnlist"
      :key="index"
      :class="{ 'ring-active': item.ifShow }"
      @click="showCircle(index)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      btnlist: [
        { title: '第一圈层', ifShow: false },
        { title: '第二圈层', ifShow: false },
        { title: '第三圈层', ifShow: false }
      ]
    }
  },
  methods: {
    // 点击地图按钮
    showCircle (index) {
      this.btnlist[index].ifShow = !this.btnlist[index].ifShow
      this.$emit('ringBtnSelect', this.btnlist)
    },
    // 刷新圈层list
    refreshBtns () {
      this.btnlist.forEach(item => {
        item.ifShow = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ring-btn {
  position: absolute;
  width: 100px;
  height: 130px;
  top: 130px;
  right: 500px;
  button {
    width: 100px;
    height: 42px;
    line-height: 42px;
    background: url("~@/assets/image/KeyThrong/btn_bgm.png") no-repeat 100% 100%;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: #a9daff;
    border: none;
    margin-bottom: 10px;
    outline: none; //消除默认点击蓝色边框效果
    cursor: pointer;
  }
  .ring-active {
    background: url("~@/assets/image/KeyThrong/onbtn_bgm.png") no-repeat 100% 100% !important;
  }
}
</style>
