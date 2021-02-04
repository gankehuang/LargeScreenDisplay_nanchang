<template>
  <div
    ref="father"
    class="mvp-father-box"
  >
    <VideoPlayerModal
      v-for="(item, index) in playList"
      :key="index"
      :ref="index"
      :visible="true"
      :z-index="index"
      :back-value="backValue"
      :info="item"
      :close="close"
      :width="600"
      :height="400"
    />
  </div>
</template>

<script>

import VideoPlayerModal from '../VideoPlayerModal/index.vue'

/**
 * @param playList required: true, type: Array, 需要播放视频的信息数据列表
 * @param maxPlayer required: false, type: Number, default: 4, 允许最大弹框数量
 */

export default {
  components: {
    VideoPlayerModal
  },
  props: {
    playList: {
      type: Array,
      required: true
    },
    maxPlayer: {
      type: Number,
      default: 4
    }
  },
  methods: {
    backValue (left, top, zIndex) {
      this.$refs[zIndex][0].$el.style.top = `${top}px`
      this.$refs[zIndex][0].$el.style.left = `${left}px`
    },
    close (index) {
      this.$EventBus.$emit('delete:playerIndex', index)
    }
  }
}
</script>

<style scoped>
@import "./styles.css";
</style>
