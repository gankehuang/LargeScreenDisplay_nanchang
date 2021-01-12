<template>
  <div class="data-view-style">
    <div
      class="person-bg1"
      v-if="isShowPerson2"
      @click="handlePageShow('isShowPerson3')"
    />
    <div
      class="person-bg2"
      v-if="isShowPerson3"
      @click="handlePageShow('isShowPerson4')"
    />
    <div
      class="person-bg3"
      v-if="isShowPerson4"
      @click="handlePageShow('isShowPerson1')"
    />
    <div v-if="isShowPerson1" class="data-view-map">
      <img :src="bg" />
    </div>
    <div v-if="isShowPerson1" class="data-view-left">
      <ul>
        <li :class="active == 1 ? 'hover' : ''" @click="active = 1">
          <div><svg-icon icon-class="pandect" class="svg-icon" /></div>
          <div>总览</div>
        </li>
        <li :class="active == 2 ? 'hover' : ''" @click="active = 2">
          <div @click="handlePageShow('isShowPerson2')">
            <svg-icon icon-class="staff" class="svg-icon" />
          </div>
          <div @click="handlePageShow('isShowPerson2')">
            人
          </div>
        </li>
        <li :class="active == 3 ? 'hover' : ''" @click="active = 3">
          <div><svg-icon icon-class="fangchan" class="svg-icon" /></div>
          <div>地</div>
        </li>
        <li :class="active == 4 ? 'hover' : ''" @click="active = 4">
          <div><svg-icon icon-class="matter" class="svg-icon" /></div>
          <div>事</div>
        </li>
        <li :class="active == 5 ? 'hover' : ''" @click="active = 5">
          <div><svg-icon icon-class="goods" class="svg-icon" /></div>
          <div>物</div>
        </li>
        <li :class="active == 6 ? 'hover' : ''" @click="active = 6">
          <div><svg-icon icon-class="netSvg" class="svg-icon" /></div>
          <div>网</div>
        </li>
        <li :class="active == 7 ? 'hover' : ''" @click="active = 7">
          <div><svg-icon icon-class="organization" class="svg-icon" /></div>
          <div>组织</div>
        </li>
      </ul>
    </div>
    <div v-if="isShowPerson1" class="data-view-right">
      <div class="content">
        <div class="top">
          <div class="grid-point" @click="gridNumberVisible = true">
            <div class="grid-module">
              <h1>911</h1>
              <p>网格数</p>
            </div>
          </div>
          <div class="grid-point" @click="gridPersonVisible = true">
            <div class="grid-module">
              <h1>354</h1>
              <p>网格员</p>
            </div>
          </div>
          <div class="grid-into" @click="gridMixVisible = true">
            <div class="grid-module">
              <h1>2834</h1>
              <p>网格融合</p>
            </div>
          </div>
          <div class="grid-condition">
            <div class="condition">
              <p>实有网情</p>
            </div>
            <div class="condition-box">
              <ul>
                <li>
                  <h1>5<span>次</span></h1>
                  <p>政法舆情</p>
                </li>
                <li>
                  <h1>5<span>次</span></h1>
                  <p>政治谣言</p>
                </li>
                <li>
                  <h1>5<span>次</span></h1>
                  <p>突发事件</p>
                </li>
                <li>
                  <h1>5<span>次</span></h1>
                  <p>民情民意</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="real-left">
            <h1>实有单位</h1>
            <ul>
              <li @click="handleOpenModal1('governanceCenter')">
                <span class="svn"
                  ><svg-icon icon-class="v-dw" class="svg-icon"/></span
                ><span class="title">行政单位</span
                ><strong class="num">147</strong><span class="unit">个</span>
              </li>
              <li @click="handleOpenModal1('mechanism')">
                <span class="svn"
                  ><svg-icon icon-class="v-qt" class="svg-icon"/></span
                ><span class="title">群团组织</span
                ><strong class="num">147</strong><span class="unit">个</span>
              </li>
              <li @click="handleOpenModal1('governanceSafe')">
                <span class="svn"
                  ><svg-icon icon-class="v-qsy" class="svg-icon"/></span
                ><span class="title">企事业单位</span
                ><strong class="num">147</strong><span class="unit">个</span>
              </li>
              <li @click="handleOpenModal1('managementTeam')">
                <span class="svn"
                  ><svg-icon icon-class="v-qf" class="svg-icon"/></span
                ><span class="title">群防群治队伍</span
                ><strong class="num">3809</strong><span class="unit">人</span>
              </li>
              <li @click="handleOpenModal1('mechanism1')">
                <span class="svn"
                  ><svg-icon icon-class="v-zz" class="svg-icon"/></span
                ><span class="title">社会组织</span
                ><strong class="num">147</strong><span class="unit">个</span>
              </li>
              <li @click="handleOpenModal1('mechanism')">
                <span class="svn"
                  ><svg-icon icon-class="v-qsy" class="svg-icon"/></span
                ><span class="title">综治责任单位</span
                ><strong class="num">147</strong><span class="unit">个</span>
              </li>
            </ul>
          </div>
          <div class="real-right">
            <h1>实有事件</h1>
            <ul>
              <li @click="openMes(12)">
                <span class="title">AI识别</span><strong class="num">147</strong
                ><span class="unit">件</span>
              </li>
              <li @click="openMes(1)">
                <span class="title">事件接报</span
                ><strong class="num">147</strong><span class="unit">件</span>
              </li>
              <li @click="openMes(10)">
                <span class="title">群众上报</span
                ><strong class="num">147</strong><span class="unit">件</span>
              </li>
              <li @click="openMes(11)">
                <span class="title">平安小区</span
                ><strong class="num">3809</strong><span class="unit">件</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div class="population-left">
            <h1>实有人口</h1>
            <ul>
              <li @click="handleVisible('householdRegister')">
                <span class="svn"
                  ><svg-icon icon-class="v-hj" class="svg-icon"/></span
                ><span class="title">户籍人口</span><span class="line" /><strong
                  class="num"
                  >280061</strong
                ><span class="unit">人</span>
              </li>
              <li @click="handleVisible('floatingPopulation')">
                <span class="svn"
                  ><svg-icon icon-class="v-ld" class="svg-icon"/></span
                ><span class="title">流动人口</span><span class="line" /><strong
                  class="num"
                  >39838</strong
                ><span class="unit">人</span>
              </li>
              <li
                @click="
                  handleOpenModal(true, 'overseasPersonnel', '少数民族人口', 2);
                  handleVisible('overseasPersonnel');
                "
              >
                <span class="svn"
                  ><svg-icon icon-class="v-ss" class="svg-icon"/></span
                ><span class="title">少数民族人口</span
                ><span class="line" /><strong class="num">87</strong
                ><span class="unit">人</span>
              </li>
              <li
                @click="
                  handleOpenModal(true, 'specialGroups', '重点人员', 3);
                  handleVisible('specialGroups');
                "
              >
                <span class="svn"
                  ><svg-icon icon-class="v-zd" class="svg-icon"/></span
                ><span class="title">重点人员</span><span class="line" /><strong
                  class="num"
                  >452</strong
                ><span class="unit">人</span>
              </li>
              <li @click="handleVisible('specialGroups')">
                <span class="svn"
                  ><svg-icon icon-class="v-zd" class="svg-icon"/></span
                ><span class="title">外籍人口</span><span class="line" /><strong
                  class="num"
                  >452</strong
                ><span class="unit">人</span>
              </li>
              <li
                @click="
                  handleOpenModal(true, 'safe', '关爱人群', 5);
                  handleVisible('safe');
                "
              >
                <span class="svn"
                  ><svg-icon icon-class="v-ga" class="svg-icon"/></span
                ><span class="title">关爱人群</span><span class="line" /><strong
                  class="num"
                  >342</strong
                ><span class="unit">人</span>
              </li>
            </ul>
          </div>
          <div class="population-right">
            <h1>实有房屋</h1>
            <ul>
              <li>
                <p>
                  <span class="svn"
                    ><svg-icon icon-class="d-xq" class="svg-icon"/></span
                  ><span class="title">小区总数</span>
                </p>
                <p class="pClass">
                  <strong class="num">23</strong><span class="unit">个</span>
                </p>
              </li>
              <li>
                <p>
                  <span class="svn"
                    ><svg-icon icon-class="d-zzfw" class="svg-icon"/></span
                  ><span class="title">住宅房屋</span>
                </p>
                <p class="pClass">
                  <strong class="num">107</strong><span class="unit">个</span>
                </p>
              </li>
              <li>
                <p>
                  <span class="svn"
                    ><svg-icon icon-class="d-spf" class="svg-icon"/></span
                  ><span class="title">商品房</span>
                </p>
                <p class="pClass">
                  <strong class="num">84</strong><span class="unit">个</span>
                </p>
              </li>
              <li>
                <p>
                  <span class="svn"
                    ><svg-icon icon-class="d-qy" class="svg-icon"/></span
                  ><span class="title">重点区域</span>
                </p>
                <p class="pClass">
                  <strong class="num">293</strong><span class="unit">个</span>
                </p>
              </li>
              <li>
                <p>
                  <span class="svn"
                    ><svg-icon icon-class="d-qy" class="svg-icon"/></span
                  ><span class="title">重点场所</span>
                </p>
                <p class="pClass">
                  <strong class="num">118</strong><span class="unit">个</span>
                </p>
              </li>
              <li>
                <p>
                  <span class="svn"
                    ><svg-icon icon-class="d-gc" class="svg-icon"/></span
                  ><span class="title">十大工程</span>
                </p>
                <p class="pClass">
                  <strong class="num">287</strong><span class="unit">个</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <newModal
      :visible.sync="modalVisiable"
      :com-name="comName"
      :title="title"
    />
    <div v-if="floatingPopulationVisible">
      <floatPeople :visible.sync="floatingPopulationVisible" />
    </div>
    <div v-if="householdPeopleVisible">
      <householdPeople :visible.sync="householdPeopleVisible" />
    </div>
    <volunteer :visible.sync="volunteerPeopleVisible" />
    <!-- 网格数量 -->
    <gridNumber :visible.sync="gridNumberVisible" />
    <gridMix :visible.sync="gridMixVisible" />
    <gridPerson :visible.sync="gridPersonVisible" />
    <governmentCenterModal
      :visible.sync="governmentCenterModal.visiable"
      :info="governmentCenterModal.info"
    />

    <govermentOrgModal
      :visible.sync="govermentOrgModal.visiable"
      :info="govermentOrgModal.info"
    />

    <govermentRanksModal
      :visible.sync="govermentRanksModal.visiable"
      :info="govermentRanksModal.info"
    />
    <PeopleOrgan :visible.sync="peopleOrganVisable" />

    <govermentSafeModal
      :visible.sync="govermentSafeModal.visiable"
      :info="govermentSafeModal.info"
    />
    <mesDetail
      :visible.sync="dialogShow"
      @getModal="getModal"
      @refresh="refresh"
      :type="type"
    />
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件指派或上报弹框-->
    <DealModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件处置弹框-->
    <ShowToast
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @bindBtnClose="modal = ''"
    />

    <DetailModal
      :visible.sync="detailModal.visible"
      :id="detailModal.eventId"
    />
  </div>
</template>

<script>
import floatPeople from '@/views/composite/floatPeople'
import householdPeople from '@/views/composite/householdPeople'
import openModal from '@/views/composite/newsBlocks/openModal'
import watchCurRegionCode from '@/views/composite/newsBlocks/watchCurRegionCode'
import openZnypModal from '@/views/composite/newsBlocks/openZnypModal'
import volunteer from '../volunteer/index'
import gridNumber from '@/views/composite/gridNumber'
import gridMix from '@/views/composite/gridMix'
import gridPerson from '@/views/composite/gridPerson'
import governmentCenterModal from '../newModal/governmentCenterModal'
import govermentOrgModal from '../newModal/govermentOrgModal'
import govermentRanksModal from '../newModal/govermentRanksModal'
import PeopleOrgan from '../peopleOrgan'
import govermentSafeModal from '../newModal/govermentSafeModal'
import mesDetail from '@/views/composite/newsBlocks/mesDetail'
import DetailModal from '@/views/ldczAdmin/report/DetailModal'
import EventModal from '../EventModal'
import DealModal from '../DealModal'
import ShowToast from '../ShowToast'
export default {
  mixins: [watchCurRegionCode, openModal, openZnypModal],
  components: {
    floatPeople,
    householdPeople,
    volunteer,
    gridNumber,
    gridMix,
    gridPerson,
    governmentCenterModal,
    govermentRanksModal,
    govermentOrgModal,
    PeopleOrgan,
    govermentSafeModal,
    mesDetail,
    DetailModal,
    EventModal,
    DealModal,
    ShowToast
  },
  data() {
    return {
      isShowPerson1: true,
      isShowPerson2: false,
      isShowPerson3: false,
      isShowPerson4: false,
      bg: require('@/assets/image/dataView/map.png'),
      active: 1,
      floatingPopulationVisible: false,
      householdPeopleVisible: false,
      volunteerPeopleVisible: false,
      gridNumberVisible: false,
      gridMixVisible: false,
      gridPersonVisible: false,
      dialogShow: false,
      needEventId: '',
      modal: '',
      type: null,
      detailModal: {
        eventId: null,
        visible: false
      },
      governmentCenterModal: {
        visiable: false,
        info: null
      },
      govermentOrgModal: {
        visiable: false,
        info: {}
      },
      govermentRanksModal: {
        visiable: false,
        info: null
      },
      peopleOrganVisable: false,
      govermentSafeModal: {
        visiable: false,
        info: null
      }
    }
  },
  methods: {
    handlePageShow(curPage) {
      console.log(curPage)
      this.isShowPerson1 = false
      this.isShowPerson2 = false
      this.isShowPerson3 = false
      this.isShowPerson4 = false
      this[curPage] = true
    },
    handleVisible(type) {
      switch (type) {
        case 'floatingPopulation':
          this.floatingPopulationVisible = true
          break
        case 'householdRegister':
          this.householdPeopleVisible = true
          break
        // case 'safes':
        //     this.volunteerPeopleVisible = true
        //     break
        default:
          break
      }
    },
    handleOpenModal1(iconName) {
      console.log(iconName)
      if (iconName === 'governanceCenter') {
        this.governmentCenterModal.visiable = true
      } else if (iconName === 'mechanism') {
        this.govermentOrgModal.info.title = '南昌市综治责任单位'
        this.govermentOrgModal.visiable = true
      } else if (iconName === 'mechanism1') {
        this.govermentOrgModal.info.title = '南昌市社会组织'
        this.govermentOrgModal.visiable = true
      } else if (iconName === 'safeRanks') {
        this.govermentRanksModal.visiable = true
      } else if (iconName === 'governanceSafe') {
        // this.peopleOrganVisable = true
        this.govermentOrgModal.info.title = '南昌市企事业单位'
        this.govermentOrgModal.visiable = true
      } else if (iconName === 'managementTeam') {
        this.govermentSafeModal.visiable = true
      }
    },
    openMes(type) {
      this.dialogShow = true
      this.type = type
    },
    getModal(modal, id) {
      switch (modal) {
        case 'order':
          this.onEventModal('事件指派', id)
          break
        case 'report':
          this.onEventModal('事件上报', id)
          break
        case 'deal':
          this.onEventModal('事件处置', id)
          break
        case 'detail':
          this.detailModal.eventId = id
          this.detailModal.visible = true
          break
        default:
          break
      }
    },
    // 激活事件详情弹框
    showEventDetail(info) {
      console.log(info, 'event')
      this.eventInfo = info
      this.modal = 'event'
    },
    // 监听事件详情弹框
    onEventModal(title, id) {
      if (title === '事件指派' || title === '事件上报') {
        this.modal = 'report'
        this.dealModalTitle = title
        this.needEventId = id
        return
      }

      if (title === '事件处置') {
        this.modal = 'deal'
        this.needEventId = id
        return
      }

      this.modal = ''
    },
    // 监听事件指派和上报弹框
    onDealModal() {
      this.modal = ''
    },
    // 监听事件处置弹框
    onShowToast() {
      this.modal = ''
    },
    refresh() {
      this.refreshCount++
    }
  }
}
</script>

<style lang="scss" scoped>
.data-view-style {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/dataView/page-bg.jpg") no-repeat center
    center;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .data-view-map {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .data-view-left {
    position: absolute;
    top: 0px;
    left: 30px;
    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ul {
      padding: 0px;
      margin: 0px;
      color: #fff;
      list-style: none;
      li {
        cursor: pointer;
        width: 80px;
        height: 80px;
        background: url("~@/assets/image/dataView/li-bg.png") no-repeat center
          center;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 3px;
        color: #7ebdff;
        svg {
          width: 32px;
          height: 32px;
        }
      }
      li:hover,
      li.hover {
        background: url("~@/assets/image/dataView/li-hover-bg.png") no-repeat
          center center;
      }
      li:first-child {
        width: 80px;
        height: 96px;
        padding-top: 28px;
        background: url("~@/assets/image/dataView/li-first-bg.png") no-repeat
          center center;
      }
      li:first-child:hover,
      li:first-child.hover {
        background: url("~@/assets/image/dataView/li-first-hover-bg.png")
          no-repeat center center;
      }
      li:last-child {
        width: 80px;
        height: 96px;
        background: url("~@/assets/image/dataView/li-last.png") no-repeat center
          center;
      }
      li:last-child:hover,
      li:last-child.hover {
        width: 80px;
        height: 96px;
        background: url("~@/assets/image/dataView/li-last-hover-bg.png")
          no-repeat center center;
      }
    }
  }
  .data-view-right {
    position: absolute;
    top: 61px;
    right: 13px;
    width: 853px;
    height: calc(100% - 61px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .content {
      width: 853px;
      height: 582px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .top {
      width: 100%;
      height: 83px;
      .grid-module {
        width: 74px;
        text-align: center;
        padding-top: 10px;
        cursor: pointer;
        h1 {
          margin: 0px;
          padding: 0px;
          font-size: 28px;
          line-height: 40px;
          color: #e6b00e;
        }
        p {
          margin: 0px;
          padding: 0px;
          font-size: 16px;
          line-height: 22px;
          color: #aadaff;
        }
      }
      .grid-point {
        float: left;
        width: 81px;
        height: 83px;
        margin-right: 3px;
        background: url("~@/assets/image/dataView/gridding.png") no-repeat
          center center;
      }
      .grid-into {
        float: left;
        width: 74px;
        height: 83px;
        margin-right: 3px;
        background: url("~@/assets/image/dataView/gridding1.png") no-repeat
          center center;
      }
      .grid-condition {
        float: right;
        width: 601px;
        height: 83px;
        background: url("~@/assets/image/dataView/webCon.png") no-repeat center
          center;
        display: flex;
        flex-direction: row;
        .condition {
          float: left;
          width: 87px;
          height: 33px;
          line-height: 16px;
          padding: 0px 28px;
          margin-top: 25px;
          color: #c2dfff;
          border-right: 1px solid #0cbafb;
        }
        .condition-box {
          float: left;
          width: calc(100% - 87px);
          ul {
            width: calc(100% - 40px);
            margin: 0px;
            padding: 0px;
            margin: 0px 20px;
            margin-top: 13px;
            list-style: none;
            li {
              float: left;
              width: 25%;
              text-align: center;
            }
          }
          h1 {
            color: #fff;
            margin: 0px;
            padding: 0px;
            line-height: 30px;
            font-size: 28px;
            span {
              font-size: 16px;
              font-weight: normal;
            }
          }
          p {
            color: #aadaff;
            line-height: 22px;
          }
        }
      }
    }
    .center {
      .real-left {
        float: left;
        width: 429px;
        height: 194px;
        background: url("~@/assets/image/dataView/unit.png") no-repeat center
          center;
        h1 {
          font-size: 16px;
          color: #7ebcff;
          padding: 0px;
          margin: 7px 0px 0px 22px;
        }
        ul {
          margin: 20px 0px;
          padding: 0px;
          margin-left: 21px;
          list-style: none;
          li {
            float: left;
            width: 50%;
            margin-bottom: 15px;
            cursor: pointer;
            .svg {
              width: 15px;
              height: 15px;
              svg {
                width: 15px;
                height: 15px;
              }
            }
            .title {
              display: inline-block;
              margin: 0px 10px;
              color: #fff;
              font-size: 16px;
            }
            .num {
              color: #80f4e7;
              font-size: 20px;
            }
            .unit {
              color: #3a6d9b;
              font-size: 10px;
            }
          }
        }
      }
      .real-right {
        float: right;
        width: 420px;
        height: 194px;
        background: url("~@/assets/image/dataView/incident.png") no-repeat
          center center;
        h1 {
          text-align: right;
          font-size: 16px;
          color: #7ebcff;
          padding: 0px;
          margin: 7px 22px 0px 0px;
        }
        ul {
          margin: 22px 0px;
          padding: 0px;
          margin-left: 21px;
          list-style: none;
          li {
            float: left;
            width: 50%;
            margin-bottom: 10px;
            text-align: center;
            height: 50px;
            background: url("~@/assets/image/dataView/bg.png") no-repeat center
              bottom;
            cursor: pointer;
            .title {
              color: #fff;
              font-size: 16px;
            }
            .num {
              display: inline-block;
              margin: 0px 10px;
              color: #80f4e7;
              font-size: 20px;
            }
            .unit {
              color: #fff;
              font-size: 10px;
            }
          }
        }
      }
    }
    .bottom {
      .population-left {
        float: left;
        width: 420px;
        height: 275px;
        background: url("~@/assets/image/dataView/population.png") no-repeat
          center center;
        h1 {
          font-size: 16px;
          color: #7ebcff;
          padding: 0px;
          margin: 7px 0px 0px 22px;
        }
        ul {
          margin: 20px;
          padding: 0px;
          margin-left: 21px;
          list-style: none;
          li {
            line-height: 31px;
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;
            cursor: pointer;
            .svg {
              width: 15px;
              height: 15px;
              svg {
                width: 15px;
                height: 15px;
              }
            }
            .line {
              flex: 1;
              flex-basis: auto;
              display: block;
              height: 17px;
              border-bottom: 1px dashed #3c859a;
            }
            .title {
              display: inline-block;
              margin: 0px 10px;
              color: #fff;
              font-size: 16px;
            }
            .num {
              color: #a9daff;
              font-size: 20px;
              display: inline-block;
              margin: 0px 10px;
            }
            .unit {
              color: #a9daff;
              font-size: 10px;
            }
          }
        }
      }
      .population-right {
        float: right;
        width: 420px;
        height: 275px;
        background: url("~@/assets/image/dataView/population.png") no-repeat
          center center;
        h1 {
          font-size: 16px;
          color: #7ebcff;
          padding: 0px;
          margin: 7px 0px 0px 22px;
        }
        ul {
          margin: 45px 20px;
          padding: 0px;
          margin-left: 21px;
          list-style: none;
          li {
            float: left;
            width: calc(100% / 3);
            line-height: 40px;
            margin-bottom: 5px;
            .svg {
              width: 18px;
              height: 18px;
              svg {
                width: 18px;
                height: 18px;
              }
            }
            .line {
              flex: 1;
              flex-basis: auto;
              display: block;
              height: 15px;
              border-bottom: 1px dashed #3c859a;
            }
            .title {
              display: inline-block;
              margin: 0px 5px;
              color: #fff;
              font-size: 18px;
            }
            .pClass {
              padding-left: 13px;
            }
            .num {
              color: #a9daff;
              font-size: 20px;
              display: inline-block;
              margin: 0px 10px;
            }
            .unit {
              color: #84def7;

              font-size: 10px;
            }
          }
        }
      }
    }
  }
}

.person-bg1 {
  position: absolute;
  top: 50px;
  width: 100%;
  height: 98%;
  background: url("~@/assets/image/composite/pp1.jpg") no-repeat;
  background-size: 100% 100%;
}

.person-bg2 {
  position: absolute;
  top: 50px;
  width: 100%;
  height: 98%;
  padding: 50px;
  background: url("~@/assets/image/composite/pp2.jpg") no-repeat;
  background-size: 100% 100%;
}

.person-bg3 {
  position: absolute;
  top: 50px;
  width: 100%;
  height: 98%;
  padding: 50px;
  background: url("~@/assets/image/composite/pp3.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
