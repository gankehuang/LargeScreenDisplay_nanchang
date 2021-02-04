// 视频弹框拖动组件

import './styles.css'

import VideoPlayerModal from '../VideoPlayerModal/index.vue'

/**
 * @param playList required: true, type: Array, 需要播放视频的信息数据列表
 * @param maxPlayer required: false, type: Number, default: 4, 允许最大弹框数量
 */

export default {
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
  data () {
    return {
    }
  },
  render () {
    return (
      <div class={'mvp-father-box'} ref={'father'}>
        {
          this.playList && this.playList.map((item, index) => {
            if (this.maxPlayer - 1 < index) return null
            return (
              <VideoPlayerModal
                key={index}
                ref={index}
                zIndex={index}
                visible={true}
                backValue={this.backValue}
                info={item}
                close={this.close}
                width={600}
                height={400}
              />
            )
          })
        }
      </div>
    )
  },
  methods: {
    backValue (left, top, zIndex) {
      this.$refs[zIndex].$el.style.top = `${top}px`
      this.$refs[zIndex].$el.style.left = `${left}px`
    },
    close (index) {
      this.$EventBus.$emit('delete:playerIndex', index)
    }
  }
}
