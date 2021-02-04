<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="mask-container"
    >
      <div class="mask" />
      <div class="modal-container">
        <PopModal
          :id.sync="popId"
          :visible.sync="popModalVisible"
        />
        <el-row class="page-box">
          <el-col
            :span="6"
            class="tree-container"
          >
            <div class="tree-border rect">
              <Tree
                class="left-aside left-tree"
                style="height:780px"
                type="unit"
                :props="{ label: 'organizationName', children: 'children' }"
              />
            </div>
          </el-col>
          <el-col :span="18">
            <img
              class="modal-close"
              src="@/assets/image/dataView/pop-modal-close.png"
              @click="closeModal"
            >
            <div
              v-if="activeName === 'frist'"
              class="build-title"
            >
              {{ title }}
            </div>
            <div
              v-if="activeName === 'frist'"
              class="modal-first-content"
            >
              <div class="frist-flex-container">
                <div class="left">
                  <div class="left-list-item-container">
                    <div
                      v-for="(item, index) in buildInfo"
                      :key="index"
                      class="left-list-item"
                    >
                      <div class="label">
                        {{ item.label }}
                      </div>
                      <div class="data">
                        {{ item.num }}<span>套</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="right-list-item-container">
                    <div
                      v-for="(item, index) in peopleInfo"
                      :key="index"
                      class="right-list-item"
                    >
                      <div class="label">
                        {{ item.label }}
                      </div>
                      <div class="data">
                        {{ item.num }}<span>人</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="activeName === 'second'"
              class="build-title"
            >
              {{ title }}
            </div>
            <div
              v-if="activeName === 'second'"
              class="modal-second-content"
            >
              <div class="left-box">
                <el-scrollbar class="second-scrollbar">
                  <div
                    v-for="(item, index) in computedBuildLayerList"
                    :key="index + 'buildLayerList'"
                    class="build-item"
                  >
                    <div class="item-name">
                      {{ item.layerName }}
                    </div>
                    <el-scrollbar class="second-inside-scrollbar">
                      <div
                        v-for="(item1, index1) in item.roomList"
                        :key="index1 + 'roomList'"
                        class="item-term"
                        :style="{
                          'background-color': item1.isSelected
                            ? selectorList[item1.type].color
                            : '#efefef'
                        }"
                        @click="handlePopModal(item1)"
                      >
                        <div>{{ item1.unitName }}</div>
                        <div>
                          {{ item1.roomNum }}（{{ item1.personNum }}人）
                        </div>
                        <div>业主：{{ item1.owner | hideName }}</div>
                      </div>
                    </el-scrollbar>
                  </div>
                </el-scrollbar>
              </div>
              <div class="select-box">
                <div
                  v-for="(value, key, index) in selectorList"
                  :key="index"
                  class="item"
                  @click="toggleSelect(key)"
                >
                  <span
                    class="select-block"
                    :style="{
                      'background-color': value.isSelected
                        ? value.color
                        : '#eee'
                    }"
                  />
                  <span class="type-text">{{ key }}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>

<script>
import Tree from '@/components/Tree'
import PopModal from './PopModal'
export default {
  components: {
    Tree,
    PopModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    }
  },
  data () {
    return {
      title: '南昌市',
      activeName: 'frist',
      popModalVisible: false,
      popId: '',
      list: [
        {
          name: '1栋1单元',
          buildNumber: '101室',
          ownerName: '张枫',
          phone: '18681524800',
          type: '重点人员核查',
          number: 4,
          checker: '王磊',
          time: '2020-11-16 19:48:00',
          status: '正常',
          edit: ''
        }
      ],
      buildInfo: [],
      peopleInfo: [],
      selectorList: {
        全部: {
          color: '#A4A4CA',
          isSelected: true
        },
        自住: {
          color: '#458B00',
          isSelected: true
        },
        出租: {
          color: '#FF3030',
          isSelected: true
        },
        空置: {
          color: '#4169FF',
          isSelected: true
        },
        '群租（7人以上）': {
          color: '#EFD900',
          isSelected: true
        },
        重点关注: {
          color: '#1bacff',
          isSelected: true
        },
        特殊关爱: {
          color: '#094c97',
          isSelected: true
        }
      },
      buildLayerList: []
    }
  },
  computed: {
    computedBuildLayerList () {
      const list = [...this.buildLayerList]
      return list.reverse()
    }
  },
  watch: {
    visible (val) {
      if (!val) this.activeName = 'frist'
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:buildLayerList')
    this.$EventBus.$off('update:countInfo')
  },
  mounted () {
    this.$EventBus.$on('update:buildLayerList', res => {
      this.buildLayerList = res.list
      this.title = res.title
      this.activeName = res.activeName
    })
    this.$EventBus.$on('update:countInfo', res => {
      this.buildInfo = res.buildInfo
      this.peopleInfo = res.peopleInfo
      this.title = res.title
      this.activeName = res.activeName
    })
  },
  methods: {
    closeModal () {
      this.$emit('update:visible', false)
      this.buildLayerList = []
    },
    toggleSelect (key) {
      this.selectorList[key].isSelected = !this.selectorList[key].isSelected
      if (key === '全部') {
        for (const i in this.selectorList) {
          this.selectorList[i].isSelected = this.selectorList[key].isSelected
        }
      } else {
        let flag = false
        for (const i in this.selectorList) {
          if (i !== '全部' && !this.selectorList[i].isSelected) {
            flag = true
            break
          }
        }
        if (flag) {
          this.selectorList['全部'].isSelected = false
        } else {
          this.selectorList['全部'].isSelected = true
        }
      }
      this.buildLayerList.forEach(item => {
        item.roomList.forEach(item1 => {
          if (key === '全部') {
            item1.isSelected = this.selectorList[key].isSelected
          } else {
            if (item1.type === key) {
              item1.isSelected = this.selectorList[key].isSelected
            }
          }
        })
      })
    },
    handleClick ({ name }) {
      this.activeName = name
    },
    handlePopModal ({ id }) {
      this.popModalVisible = true
      this.popId = id
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/deep/ .el-scrollbar__wrap {
  overflow: auto;
}

.mask-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}
.modal-container {
  width: 1500px;
  height: 888px;
  background: url("~@/assets/image/dataView/groupRentingBg.png") no-repeat
    center center;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;

  .modal-title {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    color: #00ffff;
  }
  .build-title {
    img {
      height: 24px;
      height: 24px;
    }
    position: absolute;
    top: 90px;
    left: 55%;
    transform: translateX(-50%);
    color: #199ccb;
    font-size: 24px;
  }

  .first-build-title {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    color: #00ffff;
    img {
      height: 24px;
      height: 24px;
    }
    position: absolute;
    top: 90px;
    left: 62%;
    transform: translateX(-50%);
    color: #199ccb;
    font-size: 24px;
  }

  .modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .tree-container {
    overflow: hidden;
    padding: 50px;
    .tree-border {
      border: 1px solid #0b61a0 !important;
      overflow: hidden;
      height: 107%;
    }
    .left-tree {
      margin: 5% auto;
      background-color: transparent;
    }
  }

  .modal-first-content {
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 160px;
    .title {
      position: absolute;
      left: 47%;
      top: 35px;
      color: #fff;
      font-size: 16px;
    }
    .frist-flex-container {
      width: 938px;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left,
      .right {
        position: relative;
        width: 277px;
        height: 550px;
      }
      .left {
        background: url("~@/assets/image/rentalHousing/pop-modal-frist-left.png")
          center center / 100% 100% no-repeat;
      }
      .right {
        background: url("~@/assets/image/rentalHousing/pop-modal-frist-right.png")
          center center / 100% 100% no-repeat;
      }
      .left-list-item-container {
        position: absolute;
        top: -10px;
        right: -180px;
        margin-bottom: 100px;
        .left-list-item {
          margin-bottom: 50px;
        }
        .label {
          font-size: 16px;
          font-weight: bold;
          color: #a9daff;
          line-height: 20px;
        }
        .data {
          font-size: 30px;
          color: #00ffff;
          span {
            display: inline-block;
            margin-left: 5px;
            font-size: 16px;
          }
        }
      }
      .right-list-item-container {
        position: absolute;
        top: -10px;
        left: -120px;
        .right-list-item {
          margin-bottom: 50px;
          text-align: right;
        }
        .label {
          font-size: 16px;
          font-weight: bold;
          color: #a9daff;
          line-height: 20px;
        }
        .data {
          font-size: 30px;
          color: #00ffff;
          span {
            display: inline-block;
            margin-left: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }

  .modal-second-content {
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 160px;
    .left-box {
      width: 836px;
      height: 649px;
      position: relative;
      padding-top: 70px;
      background: url("~@/assets/image/dataView/buildHouseBg.png") no-repeat
        center center;
      background-size: contain;
      .title {
        position: absolute;
        left: 47%;
        top: 35px;
        color: #fff;
        font-size: 16px;
      }
    }
    .second-scrollbar {
      height: 500px;
      margin: 25px auto 55px;
      /deep/.el-scrollbar__bar.is-horizontal {
        display: none;
      }
    }
    .second-inside-scrollbar {
      border-right: none;
      width: 92%;
      display: inline-block;
      height: 70px;
      /deep/.el-scrollbar__view {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    }
    .build-item {
      width: 95%;
      color: #fff;
      margin: 0 0 0 40px;
      .item-name {
        display: inline-block;
        white-space: nowrap;
        width: 48px;
        height: 70px;
        line-height: 65px;
        vertical-align: top;
        border: none;
      }
      .item-term {
        cursor: pointer;
        width: 120px;
        height: 70px;
        & > div {
          white-space: nowrap;
        }
        display: inline-flex;
        vertical-align: top;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 1px solid #0290b5;
        border-right: 1px solid #54f5f5;
      }
    }
  }

  .select-box {
    flex: 0 0 20%;
    padding-left: 40px;
    align-self: center;
    color: #fff;
    .item {
      cursor: pointer;
      padding-bottom: 20px;
      span:nth-of-type(2) {
        font-size: 20px;
      }
      .select-block {
        vertical-align: middle;
        display: inline-block;
        margin-right: 10px;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background-color: #ccc;
      }
    }
  }
  // 四角边框
  .rect {
    background: linear-gradient(to left, #025dc6, #025dc6) left top no-repeat,
      linear-gradient(to bottom, #025dc6, #025dc6) left top no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) right top no-repeat,
      linear-gradient(to bottom, #025dc6, #025dc6) right top no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) left bottom no-repeat,
      linear-gradient(to bottom, #025dc6, #025dc6) left bottom no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) right bottom no-repeat,
      linear-gradient(to left, #025dc6, #025dc6) right bottom no-repeat;
    background-size: 1px 15px, 15px 1px, 1px 15px, 15px 1px;
  }
}
</style>
