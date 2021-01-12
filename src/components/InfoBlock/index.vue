<template>
  <div class="info-block" :style="blockStyleObj">
    <div class="title">
      {{ title }}
    </div>
    <div class="top-right">
      <slot name="topRight" />
    </div>
    <div class="content" :style="contentStyleObj">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String],
      default: '默认标题'
    },
    width: {
      type: [String],
      default: '422px'
    },
    height: {
      type: [String],
      default: '280px'
    },
    bgUrl: {
      type: [String],
      default: require('@/assets/image/common/info-block-bg.png')
    },
    contentStyleObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    blockStyleObj() {
      return {
        width: this.width,
        height: this.height,
        background: 'url(' + this.bgUrl + ')',
        backgroundSize: '100% 100%'
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  padding: 40px 10px 10px 10px;
  .title {
    position: absolute;
    left: 20px;
    top: 16px;
    color: #fff;
    font-size: 16px;
  }

  .top-right {
    position: absolute;
    right: 12px;
    top: 12px;
  }

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
