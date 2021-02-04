<template>
  <div
    class="page-container"
    :style="containerStyleObj"
  >
    <slot />
    <transition
      v-if="!isCustomPage"
      name="ani-left"
      mode="out-in"
      appear
    >
      <div
        class="page-left"
      >
        <slot name="pageLeft" />
      </div>
    </transition>
    <div
      v-if="isNeedPageCenter && !isCustomPage"
      class="page-center"
    >
      <slot name="pageCenter" />
    </div>
    <transition
      v-if="!isCustomPage"
      name="ani-right"
      mode="out-in"
      appear
    >
      <div
        class="page-right"
      >
        <slot name="pageRight" />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    // 自定义容器样式
    containerStyleObj: {
      type: Object,
      default: () => {}
    },
    /* 是否需要pageCenter部分，建议需要地图的页面不要使用，
     不需要地图的页面可以使用，样式层级冲突无法解决 */
    isNeedPageCenter: {
      type: Boolean,
      default: false
    },
    // 是否需要自定义页面
    isCustomPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
