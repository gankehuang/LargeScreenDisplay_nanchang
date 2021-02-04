<template>
  <div class="conTop">
    <p class="title">
      辖区事件概况<span>（实时数据）</span>
    </p>
    <div class="conTop-one">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="right-one"
        @click="handleItem(item)"
      >
        <p>{{ item.name }}</p>
        <p class="nums">
          {{ item.num }}
        </p>
      </div>
    </div>
    <p class="title">
      事件来源<span>（实时数据）</span>
    </p>
    <div class="conTop-two">
      <div
        v-for="(item, index) in dataList1"
        :key="index"
        class="right-one"
        @click="handleItem(item)"
      >
        <p>{{ item.name }}</p>
        <p class="nums">
          {{ item.num }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        {
          name: '待办事件',
          num: '6397件'
        },
        {
          name: '事件总数',
          num: '820642件'
        },
        {
          name: '办结率',
          num: '99.22%'
        }
      ],
      dataList1: [
        {
          name: '网格员',
          num: '461124件'
        },
        {
          name: '南昌社会治理APP',
          num: '202446件'
        },
        {
          name: '平安志愿者APP',
          num: '1164件'
        },
        {
          name: '职能部门',
          num: '44件'
        },
        {
          name: '城管案件',
          num: '4526124件'
        },
        {
          name: '创文明城市系统数',
          num: '2915件'
        }
      ]
    }
  },
  methods: {
    handleItem (item) {
      if (
        item.name === '事件总数' ||
        item.name === '待办事件' ||
        item.name === '南昌社会治理APP' ||
        item.name === '平安志愿者APP' ||
        item.name === '创文明城市系统数' ||
        item.name === '网格员'
      ) {
        this.$EventBus.$emit('backPage', {
          pageName: item.name,
          pageType: 'EventListTable'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.conTop {
  width: 100%;
  height: 100%;
  .title {
    margin: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    line-height: 18px;
    span {
      color: #7ff2f4;
    }
  }
  .conTop-one,
  .conTop-two {
    padding-left: 15px;
    display: flex;
    .right-one {
      width: 195px;
      height: 84px;
      text-align: center;
      padding-top: 10px;
      margin: 0 20px 15px 0;
      background: url("~@/assets/image/intelligentService/b-box.png");
      background-size: 100% 100%;
      cursor: pointer;
      p {
        margin: 0;
        padding: 0;
        font-weight: bold;
        color: #a9daff;
        line-height: 30px;
      }
      .nums {
        font-size: 20px;
      }
    }
  }
}
</style>
