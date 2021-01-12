<template>
  <div class="page-container">
    <Tabs :tab-list="tabList" width="300px" :cur-index="0" />
    <PageLeft :visible.sync="popupVisible" />
    <PageCenter />
    <PageRight :visible.sync="popupRightVisible" @watchBaogao="watchBaogao" />
    <Popup
      :visible.sync="popupVisible"
      :buttonVisible.sync="popupButtonVisible"
      :index="index"
    />
    <PopupRight :visible.sync="popupRightVisible" :index="index" />
    <PdfDialog :visible.sync="pdfModalVisible" :pdfFile="pdfFile" />
  </div>
</template>

<script>
import PageLeft from './PageLeft'
import PageRight from './PageRight'
import PageCenter from './PageCenter/indexMap'
import Popup from './Popup'
import PopupRight from './PopupRight'
import commonMixin from '../commonMixin'
export default {
  components: {
    PageLeft,
    PageRight,
    PageCenter,
    Popup,
    PopupRight
  },
  mixins: [commonMixin],
  data() {
    return {
      pdfModalVisible: false,
      pdfFile: {
        file: require('@/assets/pdf/南昌市平安报告.pdf'),
        numPages: 17
      },
      isOpen: false,
      popupVisible: false,
      popupButtonVisible: false,
      popupRightVisible: false,
      totalScore: 90,
      index: 1
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:exponentIndex')
  },
  created() {
    this.$EventBus.$on('update:exponentIndex', index => {
      this.index = index
    })
  },
  methods: {
    watchBaogao(data) {
      this.pdfModalVisible = data
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: url("~@/assets/image/comprehensive/page-bg.png") no-repeat center
    center;
  background-size: 100% 100%;
}
.page-left,
.page-right {
  z-index: 10;
}
</style>
