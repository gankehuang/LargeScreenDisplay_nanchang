<template>
  <div
    class="info-block"
    :style="blockStyleObj"
  >
    <div
      class="info-block-head"
      :class="{'info-block-title-bg': showTitleBg}"
    >
      <div class="top-left">
        <i class="title-icon" />
        <span class="info-title">{{ title }}</span>
      </div>
      <slot name="topRight" />
    </div>

    <div
      class="info-block-content"
      :style="contentStyleObj"
    >
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
      default: '420px'
    },
    height: {
      type: [String],
      default: '275px'
    },
    bgUrl: {
      type: [String],
      default: require('@/assets/image/common/info-block-middle-bg.png')
    },
    contentStyleObj: {
      type: Object,
      default: () => {}
    },
    // 是否显示头部背景图
    showTitleBg: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    blockStyleObj () {
      return {
        width: this.width,
        height: this.height,
        background: 'url(' + this.bgUrl + ') no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block-title-bg {
  background: url('~@/assets/image/common/info-block-title-bg.png') no-repeat;
  background-size: 100% 100%;
}
.info-block {
  position: relative;
  .info-block-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    padding: 0 15px;
    .info-title {
      color: #7DBCFF;
      font-size: 16px;
    }
  }

  .info-block-content {
    width: 100%;
    height: calc(100% - 42px);
    padding: 0 15px 15px 15px;
    overflow: hidden;
  }
}
</style>
