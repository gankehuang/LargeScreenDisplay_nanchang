// iframe video player 组件

import './styles.css'
import IframeVideoPlay from '../IframeVideoPlay'

/**
 * @param visible required: true, type: Boolean 控制组件是否显示
 * @param info required: true, type: Object iframe的配置信息
 * @param close required: false, type: Function 关闭组件的回调
 * @param backValue required: true, type: Function(left: Number, top: Number, zIndex: Number) 回调函数，把弹框的移动距离传递给父组件
 * @param width required: false, type: String || Number, default value: 350px 视频弹框宽度
 * @param height required: false, type: String || Number, default value: 270px 视频弹框高度
 * @param zIndex required: false, type: Number, default value: 1 元素顺序
 */

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    info: {
      type: Object,
      required: true,
      default: () => {}
    },
    close: {
      type: Function,
      default: () => {}
    },
    backValue: {
      type: Function,
      required: true
    },
    width: {
      type: Number,
      default: 350
    },
    height: {
      type: Number,
      default: 270
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      show: this.visible,
      moveFlag: false,
      startLeft: 0,
      startTop: 0,
      left: 0,
      top: 0
    }
  },
  render () {
    if (!this.show) return null
    return (
      <div
        class={'vpm-father-box'}
        onMousedown={(event) => this.mouseDown(event)}
        onMousemove={(event) => this.move(event)}
        onMouseout={(event) => this.mouseOut(event)}
        onMouseup={(event) => this.mouseUp(event)}
        ref={'fatherBox'}
        style={{ width: `${this.width}px`, height: `${this.height}px`, zIndex: 2000 }}
      >
        <div class={'vpm-title-box'}>
          <div class={'vpm-title'}>
            {this.info?.positionName ? this.info.positionName : '测试用例'}
          </div>
          <div class={'vpm-close-box'} onClick={(event) => this.closeModal(event)} />
        </div>
        <div class={'vpm-centent-box'} >
          <IframeVideoPlay
            cameraIndexCode={
              this.info ? (this.info.gbIndexCode ? this.info.gbIndexCode : this.info.cameraIndexCode) : ''
            }
            url={''}
            width={'100%'}
            height={'88%'}
          />
        </div>
      </div>
    )
  },
  mounted () {
    this.left = this.$refs.fatherBox.offsetLeft
    this.top = this.$refs.fatherBox.offsetTop
  },
  methods: {
    closeModal (e) {
      // 禁止事件冒泡
      e.stopPropagation()
      if (this.close) {
        this.close(this.zIndex)
      }
      this.show = false
    },
    // 鼠标按下时
    mouseDown (e) {
      // 设置允许弹窗移动的 flag
      this.moveFlag = true
      // 保存鼠标开始位置
      this.startLeft = e.clientX - this.left
      this.startTop = e.clientY - this.top
    },
    // 鼠标在组件中移动时
    move (e) {
      // 判断 flag 是否允许移动
      if (!this.moveFlag) return

      // 判断回调函数是否存在
      if (!this.backValue) return

      // 判断是否超出左边视图
      if (this.$refs.fatherBox.offsetLeft < this.width / 2) {
        // 禁止弹框移动
        this.moveFlag = false
        // 设置弹框左边位置
        this.left = this.width / 2 + 10
        // 调用回调函数
        this.backValue(this.left, this.top, this.zIndex)
        return
      }

      // 判断是否超出右边视图
      if (this.$refs.fatherBox.offsetLeft > document.body.clientWidth - this.width / 2) {
        // 禁止弹框移动
        this.moveFlag = false
        // 设置弹框右边位置
        this.left = document.body.clientWidth - this.width / 2 - 10
        // 调用回调函数
        this.backValue(this.left, this.top, this.zIndex)
        return
      }

      // 判断是否超出顶部视图
      if (this.$refs.fatherBox.offsetTop < this.height / 2 + 70) {
        // 禁止弹框移动
        this.moveFlag = false
        // 设置弹框顶部位置
        this.top = this.height / 2 + 70 + 10
        // 调用回调函数
        this.backValue(this.left, this.top, this.zIndex)
        return
      }

      // 判断是否超出底部视图
      if (this.$refs.fatherBox.offsetTop > document.body.clientHeight - this.height / 2 - 50) {
        // 禁止弹框移动
        this.moveFlag = false
        // 设置弹框底部位置
        this.top = document.body.clientHeight - this.height / 2 - 50 - 10
        // 调用回调函数
        this.backValue(this.left, this.top, this.zIndex)
        return
      }

      // 设置弹框左边位置
      this.left = e.clientX - this.startLeft
      // 设置弹框右边位置
      this.top = e.clientY - this.startTop

      // 调用回调函数
      this.backValue(this.left, this.top, this.zIndex)
    },
    // 鼠标按键弹起时
    mouseOut (e) {
      // 禁止弹框移动
      this.moveFlag = false
    },
    // 鼠标移出组件时
    mouseUp (e) {
      // 禁止弹框移动
      this.moveFlag = false
    }
  }
}
