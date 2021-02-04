<template>
  <InfoBlock
    title="实时预警"
    height="326px"
  >
    <el-scrollbar style="height:100%;">
      <div
        v-for="(item, index) in listArr"
        :key="index"
        class="item-list"
      >
        <p class="item-title">
          {{ item.time }}
        </p>
        <div class="item-con">
          <div class="things">
            <div>{{ item.title }}</div>
            <div>群租人数：{{ item.num }}</div>
            <div>
              群租地址：{{ item.address }}
              <svg-icon
                icon-class="position"
                class="position-icon"
              />
            </div>
            <div class="types">
              已审核
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      listArr: [
        {
          time: '2020-11-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/image/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '13',
          address: '青山湖区北京东路258号京东小区A区7栋3单元301',
          type: '未核查'
        },
        {
          time: '2020-10-24 12:01:45',
          alemType: '二级警报',
          img: require('@/assets/image/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '16',
          address: '青云谱区井冈山大道533号锦绣花园9号楼1单元604',
          type: '已核查'
        },
        {
          time: '2020-10-15 17:45:26',
          alemType: '二级警报',
          img: require('@/assets/image/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '18',
          address: '红谷滩区会展路89号丰和花园A区6栋1单元401',
          type: '已核查'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}

.item-list {
  width: 100%;
  margin-bottom: 20px;
  .item-title {
    background-size: 100% 100%;
    color: #00ffff;
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 67px;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      text-align: center;
      background: url("~@/assets/image/rentalHousing/矩形 1299.png") no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
    }
  }
  .item-con {
    display: flex;
    padding: 10px;
    background: rgba(0, 85, 255, 0.26);
    border: 1px solid #0b61a0;
    .imgs {
      align-self: center;
    }
    .things {
      font-size: 14px;
      font-weight: 400;
      color: #a9daff;
      line-height: 25px;
      position: relative;
      .position-icon {
        font-size: 18px;
        color: #3397fb;
        cursor: pointer;
        display: inline-block;
        margin-left: 50px;
      }
      .types {
        position: absolute;
        top: 6px;
        right: 0;
        width: 56px;
        height: 19px;
        line-height: 19px;
        background: rgba(48, 85, 146, 0);
        border: 1px solid #e6b00e;
        border-radius: 4px;
        color: #e6b00e;
        text-align: center;
      }
    }
  }
}
</style>
