// 废弃组件

// iframe 播放器组件
import { getToken } from '@/api/smartData/gridView'

/**
 * @param cameraIndexCode required: true, type: String || Number
 * @param url required: false, type: String
 * @param width required: false, type: String || Number, default value: 100%
 * @param height required: false, type: String || Number, default value: 100%
 */

export default {
  props: {
    cameraIndexCode: {
      type: [String, Number],
      default: '',
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    }
  },
  dart () {
    return {
      token: '',
      needUrl: ''
    }
  },
  render () {
    return (
      <div
        style={{ width: this.width, height: this.height }}
      >
        <iframe
          src={this.needUrl ? this.needUrl : this.url }
          width={this.width}
          height={this.height}
          frameborder="0"
          allowfullscreen
          allow="autoplay; fullscreen"
        />
      </div>
    )
  },
  watch: {
    cameraIndexCode: {
      immediate: true,
      handler () {
        this.queryToken()
      }
    }
  },
  methods: {
    queryToken () {
      getToken().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.token = data
          this.needUrl = `http://172.11.16.61:10000/play.html?serial=36010000002002019807&code=${this.cameraIndexCode}&aspect=fullscreen&token=${this.token}`
        }
      })
    }
  }
}
