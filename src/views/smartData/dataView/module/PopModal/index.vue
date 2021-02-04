<template>
  <div
    v-if="visible"
    class="mask-box"
  >
    <div class="mask" />
    <div class="pop-modal-container">
      <div
        class="pop-modal-close"
        @click="close"
      />
      <h1 class="pop-modal-title">
        人口统计
      </h1>
      <nanchang-map />
      <Left />
      <Right />
    </div>
  </div>
</template>

<script>
import NanchangMap from './NanchangMap.vue'
import Left from './Left'
import Right from './Right'
export default {
  components: {
    NanchangMap,
    Left,
    Right
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 2001;
  width: 1810px;
  height: 866px;
  background: url("~@/assets/image/dataView/pop-modal-bg.png") center center /
    100% 100% no-repeat;
}
.pop-modal-close {
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
.pop-modal-title {
  text-align: center;
  color: #00dde2;
  line-height: 70px;
}
</style>
