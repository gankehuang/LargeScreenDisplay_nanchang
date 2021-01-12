<template>
  <div class="modal-box" v-if="visible">
    <div class="mask"></div>
    <div
      class="grid-details-modal"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba( 0, 0, 0, 0.7)"
    >
      <img
        class="btn-close"
        src="@/assets/image/common/close-btn.png"
        @click="bindBtnClose"
      />
      <div class="tabs-container">
        <div class="tabs-item active">
          当前辖区综合情况
        </div>
      </div>
      <div class="cur-region">
        <div class="region-box">
          <span>当前位置：</span>
          {{ curPostionText }}
        </div>
      </div>

      <div class="content">
        <div class="content-left">
          <div class="center">
            <img
              :src="
                gridAdmin.photo
                  ? gridAdmin.photo
                  : require('@/assets/image/common/no-avatar.png')
              "
            />
          </div>

          <div class="center">姓名：{{ gridAdmin.name | hideName }}</div>
          <div class="center">电话：{{ gridAdmin.phone | hidePhone }}</div>
          <div class="info-title">
            <span class="circle-dot"></span>
            <span class="title-text">融入</span>
            <span class="circle-dot"></span>
          </div>
          <div class="info-list">
            <div
              class="info-item"
              @click.stop="handleMemberModal('001', '融入')"
            >
              <span class="label">公安：</span>
              <span class="value">{{ gridFuse.policeManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('002', '融入')"
            >
              <span class="label">消防：</span>
              <span class="value">{{ gridFuse.fireManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('004', '融入')"
            >
              <span class="label">城管：</span>
              <span class="value">{{ gridFuse.cityManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('005', '融入')"
            >
              <span class="label">生态环境：</span>
              <span class="value">{{ gridFuse.environment }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('006', '融入')"
            >
              <span class="label">司法：</span>
              <span class="value">{{ gridFuse.lawManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('007', '融入')"
            >
              <span class="label">住建：</span>
              <span class="value">{{ gridFuse.cityLiveManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('008', '融入')"
            >
              <span class="label">市监：</span>
              <span class="value">{{ gridFuse.superviseManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('009', '融入')"
            >
              <span class="label">房管：</span>
              <span class="value">{{ gridFuse.houseManage }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('010', '融入')"
            >
              <span class="label">卫健委：</span>
              <span class="value">{{ gridFuse.healthManager }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('011', '融入')"
            >
              <span class="label">交管：</span>
              <span class="value">{{ gridFuse.trafficManager }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('012', '融入')"
            >
              <span class="label">信访：</span>
              <span class="value">{{ gridFuse.petitionManager }}</span>
            </div>
            <div
              class="info-item"
              @click.stop="handleMemberModal('013', '融入')"
            >
              <span class="label">其他：</span>
              <span class="value">{{ gridFuse.otherManager }}</span>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="block-item">
            <div class="item-img">
              <img src="@/assets/image/gridView/item-gridModal-person-bg.png" />
            </div>
            <div class="info-list">
              <div
                class="item-info"
                @click.stop="handleMemberModal('006', '人口')"
              >
                <div class="mark-text">
                  {{ population.censusRegisterPerson }}
                </div>
                <div>户籍人口</div>
              </div>
              <div
                class="item-info"
                @click.stop="handleMemberModal('002', '人口')"
              >
                <div class="mark-text">{{ population.flowPerson }}</div>
                <div>流动人口</div>
              </div>
              <div
                class="item-info"
                @click.stop="handleMemberModal('1', '特殊人口')"
              >
                <div class="mark-text">{{ population.mental }}</div>
                <div>严重精神障碍患者</div>
              </div>
              <div
                class="item-info"
                @click.stop="handleMemberModal('2', '特殊人口')"
              >
                <div class="mark-text">{{ population.petition }}</div>
                <div>重点信访人员</div>
              </div>
              <div
                class="item-info"
                @click.stop="handleMemberModal('3', '特殊人口')"
              >
                <div class="mark-text">{{ population.retirement }}</div>
                <div>退役重点人员</div>
              </div>
              <div
                class="item-info"
                @click.stop="handleMemberModal('4', '特殊人口')"
              >
                <div class="mark-text">{{ population.prisoner }}</div>
                <div>刑释解戒人员</div>
              </div>
              <div
                class="item-info"
                @click.stop="handleMemberModal('5', '特殊人口')"
              >
                <div class="mark-text">{{ population.corrector }}</div>
                <div>社区矫正人员</div>
              </div>
              <!-- <div
                class="item-info"
                @click.stop="handleMemberModal('6', '特殊人口')"
              >
                <div class="mark-text">{{ population.youth }}</div>
                <div>重点青少年</div>
              </div> -->
            </div>
          </div>
          <div class="block-item">
            <div class="item-img">
              <img src="@/assets/image/gridView/item-gridModal-land-bg.png" />
            </div>
            <div class="info-list">
              <div class="item-info">
                <div class="mark-text">{{ importancePlace.rentRoom }}</div>
                <div>出租房屋</div>
              </div>
              <!-- <div class="item-info">
                <div class="mark-text">{{ importancePlace.officeBuild }}</div>
                <div>写字楼</div>
              </div> -->
              <div class="item-info">
                <div class="mark-text">{{ importancePlace.place }}</div>
                <div>重点场所</div>
              </div>
              <div class="item-info">
                <div class="mark-text">0</div>
                <div>经营场所</div>
              </div>
              <div class="item-info">
                <div class="mark-text">0</div>
                <div>公共安全场所</div>
              </div>
            </div>
          </div>
          <div class="block-item">
            <div class="item-img">
              <img src="@/assets/image/gridView/item-gridModal-matter-bg.png" />
            </div>
            <div class="info-list">
              <div class="item-info">
                <span class="info-label">受理:</span>
                <span class="mark-text">{{ matter.catch }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">处理中(上报):</span>
                <span class="mark-text">{{ matter.update }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">处理中(交办):</span>
                <span class="mark-text">{{ matter.deal }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">结案:</span>
                <span class="mark-text">{{ matter.complete }}</span>
              </div>
            </div>
          </div>
          <div class="block-item">
            <div class="item-img">
              <img src="@/assets/image/gridView/item-gridModal-object-bg.png" />
            </div>
            <div class="info-list">
              <div class="item-info">
                <span class="info-label">公共视频：</span>
                <span class="mark-text">{{ things.commonVideo }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">公共交通：</span>
                <span class="mark-text">{{ things.commonTraffic }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">公共设施：</span>
                <span class="mark-text">{{ things.commonFacility }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">寄递物流：</span>
                <span class="mark-text">{{ things.logistics }}</span>
              </div>
            </div>
          </div>
          <div class="block-item">
            <div class="item-img">
              <img src="@/assets/image/gridView/item-gridModal-net-bg.png" />
            </div>
            <div class="info-list">
              <div class="item-info">
                <span class="info-label">网格员：</span>
                <span class="mark-text">{{ grid.gridMember }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">网格：</span>
                <span class="mark-text">{{ grid.grid }}</span>
              </div>
              <div class="item-info">
                <span class="info-label">网格融入：</span>
                <span class="mark-text">{{ grid.gridFuse }}</span>
              </div>
            </div>
          </div>
          <div class="block-item">
            <div class="item-img">
              <img src="@/assets/image/gridView/item-gridModal-org-bg.png" />
            </div>
            <div class="info-list">
              <!-- <div class="item-info">
                <div class="mark-text">{{ orgTeam.partyOrg }}</div>
                <div>基层党组织</div>
              </div> -->
              <div class="item-info" v-if="info.gridLevel < 5">
                <div class="mark-text">{{ orgTeam.govCenter }}</div>
                <div>综治中心</div>
              </div>
              <div class="item-info" v-if="info.gridLevel < 5">
                <div class="mark-text">{{ orgTeam.govOrg }}</div>
                <div>综治责任单位</div>
              </div>
              <div class="item-info" v-if="info.gridLevel < 6">
                <div class="mark-text">{{ orgTeam.personTeam }}</div>
                <div>群防群治组织</div>
              </div>
              <div class="item-info">
                <div class="mark-text">{{ orgTeam.socialOrg }}</div>
                <div>社会组织</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MemberModal
        :visible.sync="memberModal.visible"
        :info="memberModal.info"
      />
    </div>
  </div>
</template>

<script>
import {
  queryGridDetailInfo,
  queryGovernEventNumByGrid
} from '@/api/smartData/gridView'
import MemberModal from './MemberModal'
export default {
  components: {
    MemberModal
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    info(newVal) {
      Object.assign(this.$data, this.$options.data())
      this.loading = true
      this.curPostionText = newVal.path
      queryGridDetailInfo({
        gridCode: newVal.code
      }).then(res => {
        this.loading = false
        const { status, data } = res
        if (status === 200) {
          this.gridFuse = data.gridFuse
          this.population = data.population
          this.importancePlace = data.importancePlace
          this.things = data.things
          this.orgTeam = data.orgTeam
          this.grid = data.grid
          this.gridAdmin = data.gridAdmin
        }
      })
      queryGovernEventNumByGrid({
        gridCode: newVal.code
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.matter = {
            catch: data.sl,
            update: data.clzsb,
            deal: data.clzjb,
            complete: data.bj
          }
        }
      })
    }
  },
  data() {
    return {
      memberModal: {
        visible: false,
        info: null
      },
      loading: false,
      curPostionText: '',
      gridFuse: {
        cityLiveManage: 0,
        cityManage: 0,
        environment: 0,
        fireManage: 0,
        healthManager: 0,
        houseManage: 0,
        lawManage: 0,
        otherManager: 0,
        petitionManager: 0,
        policeManage: 0,
        superviseManage: 0,
        trafficManager: 0
      },
      population: {
        censusRegisterPerson: 0,
        corrector: 0,
        flowPerson: 0,
        mental: 0,
        petition: 0,
        prisoner: 0,
        retirement: 0,
        youth: 0
      },
      importancePlace: {
        officeBuild: 0,
        place: 0,
        rentRoom: 0
      },
      things: {
        commonFacility: 0,
        commonTraffic: 0,
        commonVideo: 0,
        logistics: 0
      },
      matter: {
        catch: 0,
        update: 0,
        deal: 0,
        complete: 0
      },
      orgTeam: {
        govCenter: 0,
        govOrg: 0,
        partyOrg: 0,
        personTeam: 0,
        socialOrg: 0
      },
      grid: {
        grid: 0,
        gridMember: 0,
        gridFuse: 0
      },
      gridAdmin: {
        name: '',
        phone: '',
        photo: ''
      }
    }
  },
  methods: {
    bindBtnClose() {
      this.$emit('update:visible', false)
    },
    handleMemberModal(itemCode, type) {
      this.memberModal.visible = true
      this.memberModal.info = {
        itemCode: itemCode,
        gridCode: this.info.code,
        type: type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-box {
  user-select: none;
}
.grid-details-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1124px;
  height: 710px;
  background: url("~@/assets/image/gridView/grid-modal.png") no-repeat;
  background-size: 100% 100%;
  z-index: 999;
  padding: 20px 30px;
  color: #fff;
  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }

  .tabs-container {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #024081;
    .tabs-item {
      cursor: pointer;
    }
  }

  .cur-region {
    display: flex;
    justify-content: flex-end;
    padding: 14px 0;
    .region-box {
      color: #3c9afe;
      .arrow {
        display: inline-block;
        padding: 0 7px;
      }
    }
  }

  .content {
    display: flex;
    & > .content-left {
      flex: 0 0 30%;
      img {
        width: 140px;
        height: 176px;
      }

      & > div {
        margin-top: 10px;
      }

      .center {
        text-align: center;
        font-size: 18px;
      }

      .info-title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #00ceca;
        margin: 15px 0;
        .circle-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          display: inline-block;
          background-color: #17cbf8;
        }

        .title-text {
          padding: 0 10px;
          font-size: 18px;
        }
      }

      .info-list {
        display: flex;
        flex-wrap: wrap;
        padding-left: 50px;
      }

      .info-item {
        display: flex;
        flex: 0 0 50%;
        margin-bottom: 27px;
        cursor: pointer;
        .item-left {
          flex: 1;
        }
        .item-right {
          flex: 1;
        }
        & > span {
          font-size: 16px;
        }
        .value {
          color: #00cec9;
        }
      }
    }

    & > .content-right {
      flex: 0 0 70%;
      .block-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .item-img {
        }
        .info-list {
          display: flex;
          flex: 0 0 calc(100% - 77px);
          .item-info {
            cursor: pointer;
            margin-bottom: 15px;
            .mark-text {
              font-size: 20px;
            }
            & > div {
              font-size: 16px;
            }
          }
        }

        &:first-child {
          .info-list {
            padding: 10px 34px 0 34px;
            border: 1px solid #004892;
            background: rgba(60, 154, 254, 0.1);
            flex-wrap: wrap;
            .item-info {
              flex: 0 0 25%;
              line-height: 1.5;
              .mark-text {
                color: #3c9afe;
              }
            }
          }
        }

        &:nth-child(2) {
          .info-list {
            padding: 10px 34px 0 34px;
            border: 1px solid #0039aa;
            background: rgba(0, 86, 255, 0.1);
            .item-info {
              flex: 0 0 20%;
              line-height: 1.5;
              .mark-text {
                color: #3c9afe;
              }
            }
          }
        }

        &:nth-child(3) {
          .info-list {
            padding: 10px 34px 0 34px;
            border: 1px solid #036868;
            background: rgba(0, 255, 255, 0.11);
            .item-info {
              display: flex;
              flex: 1;
              // flex: 0 0 30%;
              align-items: center;
              .info-label {
                font-size: 16px;
              }
              .mark-text {
                color: #00ffff;
              }
            }
          }
        }

        &:nth-child(4) {
          .info-list {
            padding: 10px 34px 0 34px;
            border: 1px solid #0161a9;
            background: rgba(170, 218, 255, 0.1);
            .item-info {
              display: flex;
              flex: 0 0 25%;
              align-items: center;
              .info-label {
                font-size: 16px;
              }
              .mark-text {
                color: #aadaff;
              }
            }
          }
        }

        &:nth-child(5) {
          .info-list {
            padding: 10px 34px 0 34px;
            border: 1px solid #332700;
            background: rgba(230, 176, 14, 0.1);
            .item-info {
              display: flex;
              flex: 0 0 25%;
              align-items: center;
              .info-label {
                font-size: 16px;
              }
              .mark-text {
                color: #e6b00e;
              }
            }
          }
        }

        &:nth-child(6) {
          .info-list {
            padding: 10px 34px 0 34px;
            border: 1px solid #3c9afe;
            background: rgba(60, 154, 254, 0.1);
            .item-info {
              flex: 0 0 20%;
              line-height: 1.5;
              .mark-text {
                color: #3c9afe;
              }
            }
          }
        }
      }
    }
  }
}
</style>
