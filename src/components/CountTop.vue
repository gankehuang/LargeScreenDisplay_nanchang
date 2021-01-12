<template>
  <div class="vertical-num-to">
    <span
      :class="[
        'number',
        {
          wid:
            index === totalNumArr.length - 4 || index === totalNumArr.length - 7
        }
      ]"
      v-for="(item, index) in totalNumArr"
      :key="index"
    >
      <i class="num" ref="numberItem">0123456789</i>
      <i
        class="count"
        v-if="
          index === totalNumArr.length - 4 || index === totalNumArr.length - 7
        "
        >,</i
      >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // 传入数值
    total: {
      type: Number,
      default: () => 453840
    },
    // 是否开启数字一个一个滚动动画
    oneByOne: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      totalNumArr: [],
      setTimeOutId: 0,
      timer: null
    }
  },
  watch: {
    total: {
      immediate: true,
      handler(total) {
        this.handleTotalNumber(total)
      }
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.timer = setInterval(() => {
    //     this.setOneByOneNumberTransform()
    //   }, 5000)
    // })
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  },
  methods: {
    // 处理数字成字符串
    handleTotalNumber(total) {
      // const that = this
      const totalLength = String(total).split('').length
      const length = String(total).split('').length
      const totalArr = String(total).split('')
      for (let index = 0; index < totalLength - length; index++) {
        totalArr.unshift('0')
      }
      this.totalNumArr = totalArr.map(item => Number(item))
      this.$nextTick(() => {
        this.setAllNumberTransform()
      })
    },
    // 动画
    // 数字全部滚动
    async setAllNumberTransform() {
      const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量\
      if (!numberItems) return
      // debugger
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]
        this.setTimeOutId = setTimeout(() => {
          elem.style.transform = `translate(-50%, -${this.totalNumArr[index] *
            10}%)`
          clearTimeout(this.setTimeoutOutId)
        }, 100)
      }
    },
    // 数字一个一个滚动
    setOneByOneNumberTransform() {
      const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量\
      if (!numberItems) return
      // debugger
      // 结合CSS 对数字字符进行滚动,显示订单数量
      console.log('num', this.$refs.numberItem)
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]
        this.setTimeOutId = setTimeout(() => {
          elem.style.transform = `translate(-50%, -${this.totalNumArr[index] *
            10}%)`
          clearTimeout(this.setTimeoutOutId)
        }, (numberItems.length - index) * 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-num-to {
  display: inline-block;
}
.number {
  position: relative;
  top: 10px;
  display: inline-block;
  width: 18px;
  height: 35px;
  text-align: center;
  background: rgba(0, 40, 124, 0.05);
  // border: 1px solid rgba(69, 157, 247, 0.55);
  border-radius: 2px;
  padding-right: 5px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  overflow: hidden;
  i {
    font-style: normal;
    font-size: 28px;
    font-weight: bold;
    color: #e6b00e;
  }
  .num {
    position: absolute;
    top: 6px;
    left: 38%;
    transform: translate(-50%, 0);
    transition: transform 1s ease-in-out;
    letter-spacing: 10px;
  }
}
.wid {
  width: 25px;
  .num {
    left: 30%;
  }
  .count {
    width: 10px;
    z-index: 2000;
    position: absolute;
    bottom: -5%;
    left: 110%;
  }
}
</style>
