<template>
  <InfoBlock
    title="责任领导"
    height="100%"
    :bg-url="require('@/assets/image/common/info-block-big-bg.png')"
    :content-style-obj="{paddingTop: '15px'}"
  >
    <TopTable :table-data="tableData" />
    <InternetOfVision />
    <HandlePerson :person-list="personList" />
  </InfoBlock>
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
  components: {
    TopTable,
    InternetOfVision,
    HandlePerson
  },
  props: {
    activeMes: {
      type: Object,
      default: () => {}
    },
    gridName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      personList: [{}],
      tableData: []
    }
  },
  watch: {
    activeMes (newVal) {
      if (newVal) {
        // 更新责任领导列表
        this.tableData = this.activeMes.activityLeaders
      }
    },
    gridName: {
      immediate: true,
      handler: function (val) {
        // 更新现场处置人员列表
        if (pointEnumeration[val]) {
          this.getPersonList(pointEnumeration[val])
        }
      }
    }
  },
  methods: {
    // 动态更新指挥人员
    getPersonList (gridCode) {
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

</style>
