<template>
  <div class="key-place-container">
    <div class="title">公共视频</div>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        <svg-icon :icon-class="item.icon" class="icon" />
        <span class="label">{{ item.label }}</span>
        <div class="data">
          <span class="number">{{ item.number }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          icon: 'summary-sxt',
          label: '天网',
          number: 6429,
          unit: '个'
        },
        {
          icon: 'key-place-hospital',
          label: '地网',
          number: 7318,
          unit: '个'
        },
        {
          icon: 'key-place-gas-station',
          label: '社会资源',
          number: 10897,
          unit: '个'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.key-place-container {
  width: 430px;
  height: 172px;
  margin-top: 10px;
  background: url("~@/assets/image/dataView/summary-pubilc-video.png") center
    center / 100% 100% no-repeat;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 5px 0 0 25px;
  }
  ul {
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
    padding: 0 36px 0 24px;
  }
  li {
    width: 100%;
    color: #80f4e7;
    margin: 22px 0;
    &:nth-of-type(1) {
      .label {
        &::after {
          // #0E3A65
          content: "···············································";
        }
      }
    }
    &:nth-of-type(2) {
      .label {
        &::after {
          // #0E3A65
          content: "···············································";
        }
      }
    }
    &:nth-of-type(3) {
      .label {
        &::after {
          // #0E3A65
          content: "·······································";
        }
      }
    }
    .icon {
      color: #80f4e7;
      font-size: 18px;
    }
    .data {
      float: right;
      position: relative;
      z-index: 2;
    }
    .label {
      font-size: 16px;
      color: #ffffff;
      display: inline-block;
      font-size: 18px;
      margin-left: 5px;
      line-height: 18px;
      &::after {
        // #0E3A65
        content: "·······························";
        color: #4a9daa;
        margin: 0 5px 0 10px;
      }
    }
    .number {
      display: inline-block;
      margin-right: 5px;
      line-height: 24px;
      font-size: 20px;
      color: #a9daff;
    }
    .unit {
      font-size: 12px;
      color: #a9daff;
    }
  }
}
</style>
