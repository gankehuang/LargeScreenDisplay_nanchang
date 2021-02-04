<template>
  <Container :is-custom-page="true">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="1"
    />

    <!--搜索人员名称-->
    <Search
      v-if="curPageType !== 'frustrated'"
      :cur-page-type="curPageType"
      @searchPersonMarker="onSearchPersonMarker"
    />

    <!--地图-->
    <Map
      ref="map"
      :cur-page-type="curPageType"
    />

    <!--切换页面-->
    <PageSwitch @switchPage="switchPage" />

    <!-- 失意人员弹框 -->
    <MessTable
      ref="messTableModal"
      :info="messTableInfo"
    />

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <keep-alive>
        <component :is="curLeftComponent" />
      </keep-alive>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <keep-alive>
        <component :is="curRightComponent" />
      </keep-alive>
    </transition>
  </Container>
</template>
<script>
import commonMixin from '../commonMixin'
import Map from './map'
import PageSwitch from './PageSwitch'
import Search from './Search'
import MessTable from './messTable'

import MentalDiseaseLeft from './mentalDisease/Left/index'
import MentalDiseaseRight from './mentalDisease/Right/index'
import PetitionLetterLeft from './petitionLetter/Left/index'
import PetitionLetterRight from './petitionLetter/Right/index'
import RetireLeft from './retire/Left/index'
import RetireRight from './retire/Right/index'
import CorrectLeft from './correct/Left/index'
import CorrectRight from './correct/Right/index'
import ReleasedLeft from './released/Left/index'
import ReleasedRight from './released/Right/index'

const enumPersonType = {
  mentalDisease: {
    key: 'mentalDisease',
    type: 3,
    curLeftComponent: 'MentalDiseaseLeft',
    curRightComponent: 'MentalDiseaseRight'
  },
  petitionLetter: {
    key: 'petitionLetter',
    type: 4,
    curLeftComponent: 'PetitionLetterLeft',
    curRightComponent: 'PetitionLetterRight'
  },
  retire: {
    key: 'retire',
    type: 5,
    curLeftComponent: 'RetireLeft',
    curRightComponent: 'RetireRight'
  },
  released: {
    key: 'released',
    type: 1,
    curLeftComponent: 'ReleasedLeft',
    curRightComponent: 'ReleasedRight'
  },
  correct: {
    key: 'correct',
    type: 2,
    curLeftComponent: 'CorrectLeft',
    curRightComponent: 'CorrectRight'
  }
}

export default {
  components: {
    Map,
    PageSwitch,
    Search,
    MessTable,
    MentalDiseaseLeft,
    MentalDiseaseRight,
    PetitionLetterLeft,
    PetitionLetterRight,
    RetireLeft,
    RetireRight,
    CorrectLeft,
    CorrectRight,
    ReleasedLeft,
    ReleasedRight
  },
  mixins: [commonMixin],
  data () {
    return {
      curLeftComponent: 'MentalDiseaseLeft',
      curRightComponent: 'MentalDiseaseRight',
      curPageType: 'mentalDisease',
      messTableInfo: null
    }
  },
  methods: {
    // 切换页面
    switchPage (pageTitle) {
      this.curPageType = pageTitle.title
      if (this.curPageType === 'frustrated') {
        // 失意人员
        this.$refs.messTableModal.openModal()
      } else {
        // 更新地图标记
        this.$refs.map.updateKeyPersonnelMarker(enumPersonType[this.curPageType].type, enumPersonType[this.curPageType].key)
        // 切换不同页面相应的组件
        this.curLeftComponent = enumPersonType[this.curPageType].curLeftComponent
        this.curRightComponent = enumPersonType[this.curPageType].curRightComponent
      }
    },
    // 监听搜索标记功能
    onSearchPersonMarker (list) {
      this.$refs.map.showSearchMakerList(list, enumPersonType[this.curPageType].key)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
