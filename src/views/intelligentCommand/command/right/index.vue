<template>
  <div class="block-box">
    <div class="box-title">责任领导</div>
    <TopTable :tableData="tableData" />
    <InternetOfVision />
    <HandlePerson :personList="personList" />
  </div>
</template>

<script>
import TopTable from './TopTable'
import InternetOfVision from './InternetOfVision'
import HandlePerson from './HandlePerson'
import { selectGridAdminByGridCode } from '@/api/intelligentCommand/command'
const pointEnumeration = {
  前湖迎宾馆: '360106004003001',
  市综治中心: '360106004006001',
  南昌县综治中心: '360121100024004',
  青山湖南钢街办: '360111004002006',
  青山湖区法院: '360111100012007',
  红谷滩凤凰家园: '360106005005002',
  市公安局: '360106002002006',
  省行政中心: '360106004007001',
  南昌市综治中心: '360106004006001',
  青山湖区人民法院: '360111100012007',
  青山湖南钢街道综治中心: '360111004002006'
}
export default {
  props: {
    departmentList: {
      type: Array,
      default: () => []
    },
    activeMes: {
      type: Object
    },
    gridName: {
      type: String
    }
  },
  components: {
    TopTable,
    InternetOfVision,
    HandlePerson
  },
  data() {
    return {
      personList: [{}],
      tableData: []
    }
  },
  watch: {
    activeMes(newVal) {
      if (newVal) {
        // 更新责任领导列表
        this.tableData = this.activeMes.activityLeaders
      }
    },
    gridName: {
      immediate: true,
      handler: function(val) {
        // 更新现场处置人员列表
        if (pointEnumeration[val]) {
          this.getPersonList(pointEnumeration[val])
        }
      }
    }
  },
  methods: {
    // 动态更新指挥人员
    getPersonList(gridCode) {
      selectGridAdminByGridCode({ gridCodeList: gridCode }).then((res) => {
        if (res.status === 200) {
          this.personList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-box {
  position: relative;
  width: 420px;
  height: 100%;
  background: url('~@/assets/image/command/block-bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 50px 10px 10px 10px;
  .box-title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: 600;
  }
}
</style>
