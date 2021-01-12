<template>
  <div class="center-turntable-container">
    <div class="circle-mask"></div>
    <div :class="['circle', { spread: isSpread }]">
      <div class="circle_img" ref="circleImgDom"></div>
      <!-- { 'click-pause': typeof pauseRightIndex !== 'undefined' } -->
      <div
        :class="[
          'outer',
          { 'click-pause': typeof pauseRightIndex !== 'undefined' }
        ]"
        ref="outerDom"
      >
        <div
          class="arc_div"
          @mouseenter="handleRightClickItemIndex(index)"
          @mouseleave="handleRightClickItemIndex(undefined)"
          :class="{ active: handleOuterCirlce(index) }"
          v-for="(item, index) in arcList"
          :key="index"
        >
          <div class="text">
            <svg height="100" width="236">
              <defs>
                <path id="myTextPath" d="M20,55 C400,0 -20,240 150,0"></path>
              </defs>
              <a>
                <text x="55" y="80">
                  <textPath href="#myTextPath" style="font-size:18px">
                    {{ item.name }}
                  </textPath>
                </text>
              </a>
            </svg>
          </div>
        </div>
      </div>
      <!-- { 'click-pause': typeof pauseLeftIndex !== 'undefined' } -->
      <div
        ref="newSecCircleDom"
        :class="[
          'new_sec_circle',
          { 'click-pause': typeof pauseLeftIndex !== 'undefined' }
        ]"
      >
        <div
          class="new_sec_animate"
          @mouseenter="handleLeftClickItemIndex(index)"
          @mouseleave="handleLeftClickItemIndex(undefined)"
          :class="{ active: handleInnerCircle(index) }"
          v-for="(item, index) in newSecList"
          :key="index"
        >
          <div class="sec_circle_text">
            <svg height="100" width="300" class="openSvg">
              <defs>
                <path id="path_1" d="M-84,114 C560,-100 0,420 400,70"></path>
              </defs>
              <a>
                <text x="180" y="80">
                  <textPath href="#path_1" style="font-size:24px">
                    {{ item.name }}
                  </textPath>
                </text>
              </a>
            </svg>
          </div>
        </div>
      </div>
      <div class="ring" ref="ringDom"></div>
      <div @click="routeTo" :class="['inner_ring', innerCircleAnimation]"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftListAnimation: {
      type: String,
      default: ''
    },
    rightListAnimation: {
      type: String,
      default: ''
    },
    halfLeftAnimation: {
      type: String,
      default: ''
    },
    halfRightAnimation: {
      type: String,
      default: ''
    },
    topAnimation: {
      type: String,
      default: ''
    },
    bottomAnimation: {
      type: String,
      default: ''
    },
    leftItemIndex: {
      type: Number || undefined,
      default: undefined
    },
    leftClickItemIndex: {
      type: Number || undefined,
      default: undefined
    },
    innerCircleIndex: {
      type: Number || undefined,
      default: undefined
    },
    outerCircleIndex: {
      type: Number || undefined,
      default: undefined
    },
    rightItemIndex: {
      type: Number || undefined,
      default: undefined
    },
    rightClickItemIndex: {
      type: Number || undefined,
      default: undefined
    },
    halfLeftNone: {
      type: Boolean,
      default: false
    },
    leftPopupVisible: {
      type: Boolean,
      default: false
    },
    rightPopupVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isSpread: false,
      innerCircleAnimation: '',
      pauseLeftIndex: undefined,
      pauseRightIndex: undefined,
      arcList: [
        {
          name: '党建领安'
        },
        {
          name: '法治固安'
        },
        {
          name: '德育润安'
        },
        {
          name: '改革兴安'
        },
        {
          name: '社会协安'
        },
        {
          name: '解纷促安'
        },
        {
          name: '底线守安'
        },
        {
          name: '强本筑安'
        },
        {
          name: '科技智安'
        }
      ],
      newSecList: [
        { name: '一核引领' },
        { name: '三制并举' },
        { name: '五治融合' }
      ]
    }
  },
  methods: {
    routeTo() {
      this.isSpread = true
      this.pauseRightIndex = undefined
      this.pauseLeftIndex = undefined
      this.innerCircleAnimation = 'inner-circle-animation'
      this.$emit('update:leftListAnimation', 'left-list-animation')
      this.$emit('update:rightListAnimation', 'right-list-animation')
      this.$emit('update:halfLeftAnimation', 'half-left-animation')
      this.$emit('update:halfRightAnimation', 'half-right-animation')
      this.$emit('update:topAnimation', 'top-animation')
      this.$emit('update:bottomAnimation', 'bottom-animation')
      this.$emit('update:leftItemIndex', undefined)
      this.$emit('update:rightItemIndex', undefined)
      this.$emit('update:leftClickItemIndex', undefined)
      this.$emit('update:rightClickItemIndex', undefined)
      this.$emit('update:leftPopupVisible', false)
      this.$emit('update:rightPopupVisible', false)
      setTimeout(() => {
        // newSecCircleDom ringDom
        this.$refs.circleImgDom.style.display = 'none'
      }, 800)
      setTimeout(() => {
        // newSecCircleDom ringDom
        this.$refs.outerDom.style.display = 'none'
        this.$refs.newSecCircleDom.style.display = 'none'
      }, 900)
      setTimeout(() => {
        this.$refs.ringDom.style.display = 'none'
        this.$emit('update:halfLeftNone', true)
        this.$EventBus.$emit('update:showGif', true)
      }, 1000)
      setTimeout(() => {
        this.$EventBus.$emit('update:socialGovernmentVisible', false)
      }, 4500)
    },
    judgeNewSecActive(index) {
      if (typeof index === 'undefined') return
      if (index === 8) {
        return 0
      } else if (index < 8 && index > 4) {
        return 1
      } else {
        return 2
      }
    },
    judgeNewSecActiveByClick(clickIndex) {
      if (typeof clickIndex === 'undefined') return
      if (clickIndex === 8) {
        return 0
      } else if (clickIndex < 8 && clickIndex > 4) {
        return 1
      } else {
        return 2
      }
    },
    handleLeftClickItemIndex(index) {
      if (typeof index === 'undefined') {
        this.pauseLeftIndex = undefined
      } else {
        this.pauseLeftIndex = this.pauseLeftIndex === index ? undefined : index
      }

      this.pauseRightIndex = undefined
      this.$emit('update:outerCircleIndex', undefined)
      this.$emit('update:innerCircleIndex', this.pauseLeftIndex)
    },
    handleRightClickItemIndex(index) {
      if (typeof index === 'undefined') {
        this.pauseRightIndex = undefined
      } else {
        this.pauseRightIndex =
          this.pauseRightIndex === index ? undefined : index
      }

      this.pauseLeftIndex = undefined
      this.$emit('update:innerCircleIndex', undefined)
      this.$emit('update:outerCircleIndex', this.pauseRightIndex)
    },
    // 判断三层治理框架
    handleInnerCircle(index) {
      if (this.pauseLeftIndex === index) {
        return true
      } else {
        return (
          this.judgeNewSecActive(this.leftItemIndex) === index ||
          this.judgeNewSecActiveByClick(this.leftClickItemIndex) === index
        )
      }
    },
    // 判断九条治理路径
    handleOuterCirlce(index) {
      if (
        this.pauseRightIndex === index ||
        this.rightItemIndex === index ||
        this.rightClickItemIndex === index
      ) {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-height: 900px) {
  .circle {
    top: 66px;
  }
}
@media (min-height: 1079px) {
  .circle {
    top: 115px;
  }
}
.center-turntable-container {
  width: 100%;
  height: 882px;
  position: relative;
  overflow: hidden;
  margin-top: 25px;
  z-index: 100;
}
.circle {
  width: 806px;
  height: 806px;
  position: absolute;
  left: calc(50% - 403px);
  // top: 66px;
  transform: scale(0.69);
}
.circle.spread .arc_div {
  pointer-events: none !important;
}
.circle.spread .new_sec_circle .new_sec_animate {
  pointer-events: none !important;
}
.circle_img {
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/socialGovernment/circle_img.png") center
    center / 100% 100% no-repeat;
  position: absolute;
  left: 0;
  top: 0;
  animation: animate_circle_img 60s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.outer {
  border-radius: 50%;
  position: absolute;
  height: 1920px;
  width: 1920px;
  left: -557px;
  top: -557px;
  z-index: 1000;
  pointer-events: none;
  animation: animateouter 0.1s cubic-bezier(0.2, 0.2, 1, 1) 0.1s forwards,
    animate_outer_rotate 60s linear 0.8s infinite forwards;
}
.outer .text {
  position: absolute;
  left: 0;
  top: 0;
}
.arc_div {
  animation: animatemove 0.1s cubic-bezier(0.2, 0.2, 1, 1) 0.1s forwards;
  width: 236px;
  height: 1920px;
  background-image: url("~@/assets/image/socialGovernment/arc-item.png");
  background-size: contain;
  background-repeat: no-repeat;
  clip: rect(0 236px 100px 0);
  pointer-events: auto;
  opacity: 0;
  position: absolute;
  left: 842px;
  transform-origin: center center;
}
.outer .arc_div.active {
  width: 236px;
  height: 1920px;
  background-image: url("~@/assets/image/socialGovernment/arc_item_active.png");
  background-size: contain;
  background-repeat: no-repeat;
  clip: rect(0 236px 100px 0);
  pointer-events: auto;
  opacity: 0;
  position: absolute;
  left: 842px;
  transform-origin: center center;
}

.arc_div:first-child {
  transform: rotate(0deg);
}
/* 0 40 80 120 160 200 240 280 320 */
.arc_div:nth-child(2) {
  transform: rotate(40deg);
}
.arc_div:nth-child(3) {
  transform: rotate(80deg);
}
.arc_div:nth-child(4) {
  transform: rotate(120deg);
}
.arc_div:nth-child(5) {
  transform: rotate(160deg);
}
.arc_div:nth-child(6) {
  transform: rotate(200deg);
}
.arc_div:nth-child(7) {
  transform: rotate(240deg);
}
.arc_div:nth-child(8) {
  transform: rotate(280deg);
}
.arc_div:nth-child(9) {
  transform: rotate(320deg);
}
.outer svg text {
  letter-spacing: 4px;
  fill: #7ff2f7;
  font-size: 20px;
  text-shadow: 0 0 10px #00c0ff;
  pointer-events: none !important;
}
.outer .arc_div.active svg text {
  letter-spacing: 4px;
  fill: #092f61;
  font-size: 20px;
  text-shadow: 0 0 10px #00c0ff;
}
.new_sec_circle {
  position: absolute;
  width: 1920px;
  height: 1920px;
  left: -557px;
  top: -557px;
  z-index: 999;
  // pointer-events: none;
  animation: animate_new_sec_circle 0.1s linear forwards,
    animate_new_sec_circle_rotate 60s linear infinite forwards;
  opacity: 0;
}
.new_sec_circle .new_sec_animate {
  cursor: pointer;
  position: absolute;
  width: 530px;
  height: 530px;
  height: 1920px;
  left: 695px;
  background-image: url("~@/assets/image/socialGovernment/sec_cricle_item.png");
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: center;
  animation: animate_new_sec_circle_a 0.1s linear forwards;
  clip: rect(0 530px 180px 0);
  pointer-events: auto;
}
.new_sec_circle .new_sec_animate.active {
  position: absolute;
  width: 530px;
  height: 530px;
  height: 1920px;
  left: 695px;
  background-image: url("~@/assets/image/socialGovernment/sec_cricle_item_active.png");
  background-size: contain;
  background-repeat: no-repeat;
  transform-origin: center;
  clip: rect(0 530px 180px 0);
}

/* 0 120 240 */
.new_sec_circle .new_sec_animate:first-child {
  transform: rotate(0);
}
.new_sec_circle .new_sec_animate:nth-child(2) {
  transform: rotate(120deg);
}
.new_sec_circle .new_sec_animate:nth-child(3) {
  transform: rotate(240deg);
}
.sec_circle_text,
.sec_circle_text svg {
  pointer-events: none;
}
.sec_circle_text {
  width: 300px;
  margin: 0 auto;
}
.sec_circle_text text {
  fill: #fff;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 10px;
}
.new_sec_animate.active .sec_circle_text text {
  fill: #083778;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 10px;
}
.ring {
  width: 359px;
  height: 359px;
  background-image: url("~@/assets/image/socialGovernment/ring.png");
  background-size: 100% 100%;
  background-position: 50%;
  position: absolute;
  left: 223.5px;
  top: 223.5px;
}
.inner_ring {
  background-size: 102% 102%;
  background-position: 50%;
  position: absolute;
  height: 232px;
  width: 232px;
  background-image: url("~@/assets/image/socialGovernment/login_button.png");
  display: block;
  left: 287px;
  top: 287px;
  cursor: pointer;
  z-index: 1001;
  // animation: animate_inner_ring 0.1s linear 0s forwards;
}
@keyframes animate_circle_img {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes animate_outer_rotate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes animateouter {
  from {
    height: 1920px;
    width: 1920px;
    left: calc((806px - 1920px) / 2);
    top: calc((806px - 1920px) / 2);
  }
  to {
    height: 700px;
    width: 700px;
    left: 53.5px;
    top: 53.5px;
  }
}
@keyframes animatemove {
  from {
    height: 1920px;
    left: 842px;
    opacity: 0;
  }
  to {
    height: 700px;
    left: 232px;
    opacity: 1;
  }
}
@keyframes animate_new_sec_circle {
  from {
    width: 1920px;
    height: 1920px;
    left: -557px;
    top: -557px;
    opacity: 0;
  }
  to {
    width: 530px;
    height: 530px;
    left: 138px;
    top: 138px;
    opacity: 1;
  }
}
@keyframes animate_new_sec_circle_rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes animate_new_sec_circle_a {
  from {
    height: 1920px;
    left: 695px;
    opacity: 0;
  }
  to {
    height: 530px;
    left: 0px;
    opacity: 1;
  }
}
@keyframes animate_inner_ring {
  from {
    height: 0;
    width: 0;
  }
  to {
    height: 232px;
    width: 232px;
  }
}

.paused:hover {
  animation-play-state: paused;
}

.click-pause {
  animation-play-state: paused !important;
}
// 环吸效果
.spread .circle_img {
  animation: circle_img_spread 1s linear 0s forwards;
}
@keyframes circle_img_spread {
  from {
    width: 806px;
    height: 806px;
    left: 0px;
    top: 0px;
    transform: rotate(360deg);
  }
  to {
    width: 0px;
    height: 0px;
    left: 403px;
    top: 403px;
    transform: rotate(0deg);
    display: none;
  }
}
.spread .outer {
  height: 700px;
  width: 700px;
  left: 53.5px;
  top: 53.5px;
  animation: outer_spread 1s cubic-bezier(0.2, 0.2, 1, 1) 0s forwards;
}
@keyframes outer_spread {
  from {
    height: 700px;
    width: 700px;
    left: 53.5px;
    top: 53.5px;
  }
  to {
    height: 0px;
    width: 0px;
    left: 403px;
    top: 403px;
    z-index: -10;
  }
}
@keyframes move_spread {
  from {
    height: 700px;
    width: 236px;
    left: 232px;
    opacity: 1;
  }
  to {
    height: 0px;
    width: 0px;
    left: 0px;
    opacity: 0;
  }
}
@keyframes move_text_spread {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    width: 0;
  }
}
.spread .arc_div {
  opacity: 1;
  height: 700px;
  left: 232px;
  animation: move_spread 1s cubic-bezier(0.2, 0.2, 1, 1) 0s forwards;
}
.spread .arc_div .text {
  animation: move_text_spread 0.1s cubic-bezier(0.2, 0.2, 1, 1) 0s forwards;
}
@keyframes new_sec_circle_spread {
  from {
    width: 530px;
    height: 530px;
    left: 138px;
    top: 138px;
    opacity: 1;
  }
  to {
    width: 0px;
    height: 0px;
    left: calc(806px / 2);
    top: calc(806px / 2);
    opacity: 0;
  }
}
@keyframes new_sec_circle_a_spread {
  from {
    height: 530px;
    width: 530px;
    left: 0px;
    opacity: 1;
  }
  to {
    height: 0px;
    width: 0px;
    left: 0px;
    opacity: 0;
  }
}
@keyframes new_sec_circle_text_spread {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
    display: none;
  }
}
@keyframes inner_ring_spread {
  from {
    height: 232px;
    width: 232px;
    left: 287px;
    top: 287px;
  }
  to {
    height: 0px;
    width: 0px;
    left: 403px;
    top: 403px;
  }
}

// 内圆消失
// .spread .inner_ring {
//   animation: inner_ring_spread 0.3s linear 0.1s forwards;
//   transform-origin: center;
// }

@keyframes ring_spread {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.spread .ring {
  animation: ring_spread 0.3s linear 0.3s forwards;
}
@keyframes innerOuter_spread {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.3);
  }
}
.spread .line,
.spread .solid_line {
  animation: innerOuter_spread 0.3s linear 1s forwards;
}
.spread .new_sec_circle {
  animation: new_sec_circle_spread 1s cubic-bezier(0.2, 0.2, 1, 1) 0s forwards;
  z-index: 1002;
}
.spread .new_sec_animate {
  animation: new_sec_circle_a_spread 1s cubic-bezier(0.2, 0.2, 1, 1) 0s forwards;
}
.spread .new_sec_animate .sec_circle_text {
  animation: new_sec_circle_text_spread 0.8s cubic-bezier(0.2, 0.2, 1, 1) 0s
    forwards;
}
.inner-circle-animation {
  animation: inner_circle_translateX 2s linear 1.5s forwards,
    inner_circle_opacity 0.1s linear 3.5s forwards;
}
// 内圆移动
@keyframes inner_circle_translateX {
  from {
    left: 287px;
  }
  to {
    left: 1700px;
  }
}
// 内圆消失
@keyframes inner_circle_opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
