<template>
  <div class="data-cockpit-bottom">
    <div class="title">
      当月平安指数排名
    </div>
    <div class="top-three-list">
      <div class="tip" />
      <div class="list">
        <div
          v-for="(item, index) in topThreeList"
          :key="index"
          class="list-item"
        >
          <span
            :class="[
              { first: index === 0 },
              { second: index === 1 },
              { third: index === 2 }
            ]"
          />
          <span>{{ item.name }}</span>
          <span>{{ item.score }}</span>
        </div>
      </div>
    </div>
    <div class="last-three-list">
      <div class="tip" />
      <div class="list">
        <div
          v-for="(item, index) in lastThreeList"
          :key="index"
          class="list-item"
        >
          <span
            :class="[
              { first: index === 0 },
              { second: index === 1 },
              { third: index === 2 }
            ]"
          />
          <span>{{ item.name }}</span>
          <span>{{ item.score }}</span>
        </div>
      </div>
    </div>
    <div class="up-three-list">
      <div class="tip" />
      <div class="list">
        <div
          v-for="(item, index) in upThreeList"
          :key="index"
          class="list-item"
        >
          <span
            :class="[
              { first: index === 0 },
              { second: index === 1 },
              { third: index === 2 }
            ]"
          />
          <span>{{ item.name }}</span>
          <span>{{ item.score }}</span>
        </div>
      </div>
    </div>
    <div class="dowm-three-list">
      <div class="tip" />
      <div class="list">
        <div
          v-for="(item, index) in downThreeList"
          :key="index"
          class="list-item"
        >
          <span
            :class="[
              { first: index === 0 },
              { second: index === 1 },
              { third: index === 2 }
            ]"
          />
          <span>{{ item.name }}</span>
          <span>{{ item.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topThreeList: [
        {
          name: '湾里局',
          score: 90.81
        },
        {
          name: '安义县',
          score: 89.94
        },
        {
          name: '进贤县',
          score: 89.63
        }
      ],
      lastThreeList: [
        {
          name: '南昌县',
          score: 85.99
        },
        {
          name: '高新区',
          score: 87.21
        },
        {
          name: '经开区',
          score: 87.26
        }
      ],
      upThreeList: [
        {
          name: '湾里局',
          score: 90.81
        },
        {
          name: '东湖区',
          score: 89.3
        },
        {
          name: '红谷滩',
          score: 87.7
        }
      ],
      downThreeList: [
        {
          name: '经开区',
          score: 87.26
        },
        {
          name: '高新区',
          score: 87.21
        },
        {
          name: '南昌县',
          score: 85.99
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.data-cockpit-bottom {
  position: absolute;
  bottom: 18px;
  left: 50%;
  width: 950px;
  // height: 230px;
  margin-left: -475px;
  z-index: 999;
  padding: 60px 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.title {
  position: absolute;
  top: 25px;
  left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
  line-height: 18px;
}
.top-three-list,
.last-three-list,
.up-three-list,
.dowm-three-list {
  flex: 0.2;
}
.tip {
  width: 174px;
  height: 10px;
  position: relative;
  background: url("~@/assets/image/dataCockpit/组 117.png") center center / 100%
    100% no-repeat;
  &::before {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    position: absolute;
    top: -15px;
  }
}

.last-three-list,
.dowm-three-list {
  flex: 0.2;
  .tip {
    width: 174px;
    height: 10px;
    position: relative;
    background: url("~@/assets/image/dataCockpit/组 117-1.png") center center /
      100% 100% no-repeat;
    &::before {
      display: block;
      font-size: 16px;
      font-weight: bold;
      color: #00ffff;
      position: absolute;
      top: -15px;
    }
  }
}

.top-three-list {
  .tip::before {
    content: "前3名";
  }
  .list {
    margin-top: 20px;
  }
  .list-item {
    width: 174px;
    display: flex;
    color: #a9daff;
    line-height: 36px;
    span:nth-of-type(2) {
      flex: 0.8;
      font-size: 16px;
    }
    span:nth-of-type(3) {
      flex: 0.2;
      font-size: 16px;
    }
  }
  .first {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/第一名 (1).png") center center /
      100% 100% no-repeat;
  }
  .second {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 115.png") center center /
      100% 100% no-repeat;
  }
  .third {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 115(1).png") center center /
      100% 100% no-repeat;
  }
}

.last-three-list,
.up-three-list,
.dowm-three-list {
  .list {
    margin-top: 20px;
  }
  .list-item {
    width: 174px;
    display: flex;
    color: #00ffff;
    line-height: 36px;
    font-size: 16px;
    span:nth-of-type(2) {
      flex: 0.8;
      font-size: 16px;
    }
    span:nth-of-type(3) {
      flex: 0.2;
      font-size: 16px;
    }
  }
  .first {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/下降.png") center center / 100%
      100% no-repeat;
  }
  .second {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 115(2).png") center center /
      100% 100% no-repeat;
  }
  .third {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 115(3).png") center center /
      100% 100% no-repeat;
  }
}
.last-three-list {
  .tip::before {
    content: "后3名";
  }
}
.up-three-list {
  .tip::before {
    content: "提升前3名";
  }
  .list-item {
    color: #a9daff;
  }
  .first {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 153.png") center center /
      100% 100% no-repeat;
  }
  .second {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 115_2.png") center center /
      100% 100% no-repeat;
  }
  .third {
    width: 17px;
    height: 22px;
    margin: 5px 10px 0 0;
    background: url("~@/assets/image/dataCockpit/组 115_3.png") center center /
      100% 100% no-repeat;
  }
}
.dowm-three-list {
  .tip::before {
    content: "下降前3名";
  }
}
</style>
