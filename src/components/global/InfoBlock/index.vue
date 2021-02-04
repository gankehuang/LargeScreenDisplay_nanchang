<template>
  <div
    class="info-block"
    :style="blockStyleObj"
  >
    <div
      class="info-block-head"
      :style="blockTitleStyleObj"
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
    titleBgUrl: {
      type: [String],
      default: require('@/assets/image/common/info-block-title-bg.png')
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
    },
    // 是否显示信息框背景图片
    showInfoBlockBg: {
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
        background: this.showInfoBlockBg ? 'url(' + this.bgUrl + ') no-repeat' : 'none',
        backgroundSize: '100% 100%'
      }
    },
    blockTitleStyleObj () {
      return {
        background: this.showTitleBg ? 'url(' + this.titleBgUrl + ') no-repeat' : 'none',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
