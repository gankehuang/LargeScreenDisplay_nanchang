<template>
  <div class="social-government-contianer">
    <div
      :class="[
        'contianer-half-left-bg',
        { 'contianer-half-left-bg-none': halfLeftNone }
      ]"
    >
      <div class="left">
        <div class="max-left">
          <span>三层治理框架</span>
        </div>
      </div>
    </div>
    <LeftPopup
      :right-click-item-index.sync="rightClickItemIndex"
      :visible.sync="leftPopupVisible"
      :item.sync="rightItem"
    />
    <div :class="['contianer-half-left', halfLeftAnimation]">
      <div class="left">
        <div class="max-left">
          <span>三层治理框架</span>
        </div>
      </div>
    </div>
    <div :class="['left-list', leftListAnimation]">
      <!-- 'breathe-animation' -->
      <div
        v-for="(item, index) in leftList"
        :key="index"
        :class="[
          'left-list-item',
          { 'breathe-animation': handleInnerCircle(index) }
        ]"
        @mouseover="mouOveLeftItem(index)"
        @mouseleave="mouLeaItem"
        @click="tabLeftItem({ item, index })"
      >
        <div
          :class="[
            'left-list-item-before',
            { active: leftItemIndex === index || leftClickItemIndex === index }
          ]"
        >
          <span>{{ item.name }}</span>
        </div>
        <!-- <div class="left-list-item-after">
          <span>{{item.name}}</span>
        </div> -->
      </div>
    </div>
    <div :class="['contianer-half-right', halfRightAnimation]">
      <div class="right">
        <div class="max-right">
          <span>九条治理路径</span>
        </div>
        <RightPopup
          :visible.sync="rightPopupVisible"
          :left-click-item-index.sync="leftClickItemIndex"
          :item.sync="leftItem"
        />
      </div>
    </div>
    <div :class="['right-list', rightListAnimation]">
      <div
        v-for="(item, index) in rightList"
        :key="index"
        :class="[
          'right-list-item',
          { 'breathe-animation': handleOuterCircle(index) }
        ]"
        @mouseover="mouOveRightItem(index)"
        @mouseleave="mouLeaItem"
        @click="tabRightItem({ item, index })"
      >
        <div
          :class="[
            'right-list-item-before',
            {
              active: rightItemIndex === index || rightClickItemIndex === index
            }
          ]"
        >
          <span>{{ item.name }}</span>
        </div>
        <!-- <div class="right-list-item-after">
          <span>{{item.name}}</span>
        </div> -->
      </div>
    </div>
    <div :class="['top', topAnimation]" />
    <CenterTurntable
      :left-list-animation.sync="leftListAnimation"
      :right-list-animation.sync="rightListAnimation"
      :half-left-animation.sync="halfLeftAnimation"
      :half-right-animation.sync="halfRightAnimation"
      :top-animation.sync="topAnimation"
      :bottom-animation.sync="bottomAnimation"
      :left-item-index.sync="leftItemIndex"
      :left-click-item-index.sync="leftClickItemIndex"
      :right-item-index.sync="rightItemIndex"
      :right-click-item-index.sync="rightClickItemIndex"
      :inner-circle-index.sync="innerCircleIndex"
      :outer-circle-index.sync="outerCircleIndex"
      :half-left-none.sync="halfLeftNone"
      :left-popup-visible.sync="leftPopupVisible"
      :right-popup-visible.sync="rightPopupVisible"
    />
    <div :class="['bottom', bottomAnimation]" />
  </div>
</template>

<script>
import { leftList, rightList } from './mock'
import CenterTurntable from './CenterTurntable'
import RightPopup from './RightPopup'
import LeftPopup from './LeftPopup'
export default {
  components: {
    CenterTurntable,
    LeftPopup,
    RightPopup
  },
  data () {
    return {
      leftListAnimation: '',
      rightListAnimation: '',
      halfLeftAnimation: '',
      halfRightAnimation: '',
      topAnimation: '',
      bottomAnimation: '',
      leftItemIndex: undefined,
      rightItemIndex: undefined,
      rightClickItemIndex: undefined,
      rightItem: {},
      leftClickItemIndex: undefined,
      leftPopupVisible: false,
      leftItem: {},
      rightPopupVisible: false,
      innerCircleIndex: undefined,
      outerCircleIndex: undefined,
      leftList: leftList,
      rightList: rightList,
      halfLeftNone: false
    }
  },
  methods: {
    mouOveLeftItem (index) {
      this.rightItemIndex = undefined
      this.leftItemIndex = index
    },
    mouOveRightItem (index) {
      this.leftItemIndex = undefined
      this.rightItemIndex = index
    },
    mouLeaItem () {
      this.rightItemIndex = undefined
      this.leftItemIndex = undefined
    },
    tabRightItem ({ item, index }) {
      if (this.rightClickItemIndex === index) {
        this.leftPopupVisible = false
      } else {
        this.leftPopupVisible = false
        setTimeout(() => {
          this.leftPopupVisible = true
        }, 100)
      }
      this.rightClickItemIndex =
        this.rightClickItemIndex === index ? undefined : index
      this.rightItem = item
    },
    tabLeftItem ({ item, index }) {
      if (this.leftClickItemIndex === index) {
        this.rightPopupVisible = false
      } else {
        this.rightPopupVisible = true
      }
      this.leftClickItemIndex =
        this.leftClickItemIndex === index ? undefined : index
      this.leftItem = item
    },
    handleInnerCircle (index) {
      if (typeof this.innerCircleIndex === 'undefined') return false
      if (this.innerCircleIndex === 0 && index === 8) {
        return true
      } else if (this.innerCircleIndex === 1 && index < 8 && index > 4) {
        return true
      } else if (this.innerCircleIndex === 2 && index <= 4 && index >= 0) {
        return true
      } else {
        return false
      }
    },
    handleOuterCircle (index) {
      if (typeof this.outerCircleIndex === 'undefined') return false
      else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.social-government-contianer {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: block;
  position: relative;
}
.contianer-half-left-bg {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("~@/assets/image/socialGovernment/contianer-half-left.png")
    center center / 100% 100% no-repeat;
  z-index: 99;
  // background-size: cover;
}
.contianer-half-left-bg-none {
  display: none;
}
.contianer-half-left {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("~@/assets/image/socialGovernment/contianer-half-left-circle.png")
    center center / 100% 100% no-repeat;
  z-index: 98;
  // background-size: cover;
}
.half-left-animation {
  animation: half_left_translateX 2s linear 1.5s forwards;
}
.contianer-half-right {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: url("~@/assets/image/socialGovernment/contianer-half-right.png")
    center center / 100% 100% no-repeat;
  // background-size: cover;
}
.half-right-animation {
  animation: half_right_translateX 2s linear 1.5s forwards;
}
.top {
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  right: 0;
  background: url("~@/assets/image/socialGovernment/top.png") center center /
    100% 100% no-repeat;
  z-index: 100;
}
.top-animation {
  animation: top_translateY 2s linear 1.5s forwards;
}
.bottom {
  width: 100%;
  height: 185px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url("~@/assets/image/socialGovernment/bottom.png") center center /
    100% 100% no-repeat;
  z-index: 100;
}
.bottom-animation {
  animation: bottom_translateY 2s linear 1.5s forwards;
}
.max-left,
.max-right {
  width: 95px;
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    line-height: 20px;
    text-shadow: 0px 3px 1px rgba(38, 35, 35, 0.61);
    writing-mode: vertical-lr;
  }
}
.max-left {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -230px;
  padding-right: 60px;
  background: url("~@/assets/image/socialGovernment/left.png") center center /
    100% 100% no-repeat;
}
.max-right {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -230px;
  padding-left: 40px;
  background: url("~@/assets/image/socialGovernment/right.png") center center /
    100% 100% no-repeat;
}
.left-list,
.right-list {
  width: 600px;
  height: 580px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  z-index: 102;
}
.left-list {
  position: absolute;
  left: 95px;
  top: 50%;
  margin-top: -290px;
}
.left-list-animation {
  animation: left_list_item_scale 1s linear 0s forwards;
}
.right-list {
  position: absolute;
  right: 95px;
  top: 50%;
  margin-top: -290px;
}
.right-list-animation {
  animation: right_list_item_scale 1s linear 0s forwards;
}
.left-list-item,
.right-list-item {
  cursor: pointer;
  width: 196px;
  height: 98px;
  transform-style: preserve-3d;
  perspective: 500px;
  // &:hover {
  //   z-index: 10;
  // }
  // &:hover .left-list-item-before {
  //   transform: rotateY(180deg);
  //   transition: all 0.5s linear;
  // }
  // &:hover .left-list-item-after {
  //   transform: rotateY(0deg);
  //   z-index: 10;
  // }
  // &:hover .right-list-item-before {
  //   transform: rotateY(180deg);
  //   transition: all 0.5s linear;
  // }
  // &:hover .right-list-item-after {
  //   transform: rotateY(0deg);
  //   z-index: 10;
  // }
}
.left-list-item-before,
.right-list-item-before {
  width: 196px;
  height: 98px;
  background: url("~@/assets/image/socialGovernment/list-item.png") center
    center/ 100% 100% no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 0 25px;
  z-index: 1;
  backface-visibility: hidden;
  transition: all 0.5s linear;
  span {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
  }
  // &:hover {
  //   background: url('~@/assets/image/socialGovernment/list_item_active.png')
  //     center center/ 100% 100% no-repeat;
  // }
}
.left-list-item-before.active,
.right-list-item-before.active {
  background: url("~@/assets/image/socialGovernment/list_item_active.png")
    center center/ 100% 100% no-repeat;
}
.left-list-item-after,
.right-list-item-after {
  transform: rotateY(-180deg);
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 0;
  width: 196px;
  height: 238px;
  backface-visibility: hidden;
  transition: all 0.5s linear;
  background: url("~@/assets/image/socialGovernment/list-item-after.png") center
    center/ 100% 100% no-repeat;
  span {
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
  }
}
.left-list-item {
  &:nth-child(6) {
    margin-top: 120px;
  }
  &:nth-child(7) {
    .left-list-item-before {
      padding: 0 50px;
    }
  }
  &:nth-child(8) {
    margin-bottom: 120px;
  }
}
.right-list-item {
  &:nth-child(1) {
    margin: 200px 0;
  }
  &:nth-child(2) {
    margin-top: 120px;
  }
  &:nth-child(4) {
    margin-bottom: 120px;
  }
}

.breathe-animation {
  animation-timing-function: ease-in-out;
  animation-name: breathe;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes half_left_translateX {
  from {
    left: 0;
    // background: url('~@/assets/image/socialGovernment/contianer-half-left-circle.png')
    //   center center / 100% 100% no-repeat;
  }
  to {
    left: -50%;
    // background: url('~@/assets/image/socialGovernment/contianer-half-left-circle.png')
    //   center center / 100% 100% no-repeat;
  }
}
@keyframes half_right_translateX {
  from {
    right: 0;
  }
  to {
    right: -50%;
  }
}
@keyframes top_translateY {
  from {
    top: 0;
  }
  to {
    top: -267px;
  }
}
@keyframes bottom_translateY {
  from {
    bottom: 0;
  }
  to {
    bottom: -185px;
  }
}
@keyframes left_list_item_scale {
  from {
    left: 95px;
    top: 50%;
    transform: scale(1);
  }
  to {
    left: 655px;
    top: 50%;
    transform: scale(0);
  }
}
@keyframes right_list_item_scale {
  from {
    right: 95px;
    top: 50%;
    transform: scale(1);
  }
  to {
    right: 655px;
    top: 50%;
    transform: scale(0);
  }
}
// 呼吸灯闪烁
@keyframes breathe {
  0% {
    // opacity: 0.5;
    // box-shadow: 0 1px 1px rgba(255, 255, 255, 0.1) inset;
  }
  100% {
    // opacity: 1;
    // background: url('~@/assets/image/socialGovernment/list_item_active.png')
    //   center center/ 100% 100% no-repeat;
    box-shadow: 0 0 200px rgba(59, 255, 255, 1) inset;
  }
}
</style>
