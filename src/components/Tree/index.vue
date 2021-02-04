<template>
  <el-scrollbar
    v-loading="isLoading"
    style="height:100%;width:100%;"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <el-tree
      ref="tree"
      :empty-text="emptyText"
      node-key="id"
      :data="data"
      default-expand-all
      :expand-on-click-node="false"
      :props="props"
      :highlight-current="true"
      @node-click="nodeClick"
    />
  </el-scrollbar>
</template>

<script>
import {
  queryCommunityTree,
  queryBuildingByCommunity,
  // queryUnitByBuilding,
  queryRoomByBuilding,
  statisticRoomAndUser
  // queryRoomByUnit
} from '@/api/riskPrevention/rentalHousing'
export default {
  props: {
    props: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoading: false,
      emptyText: '',
      data: [],
      title: '',
      buildLayerList: [],
      buildInfo: [
        {
          label: '房屋总数',
          num: 0
        },
        {
          label: '出租房屋数',
          num: 0
        },
        {
          label: '自住房屋数',
          num: 0
        },
        {
          label: '群租（7人以上）房屋数',
          num: 0
        },
        {
          label: '重点关注房屋数',
          num: 642
        },
        {
          label: '特殊关爱房屋数',
          num: 1323
        }
      ],
      peopleInfo: [
        {
          label: '居住总人数',
          num: 0
        },
        {
          label: '租住人数',
          num: 0
        },
        {
          label: '自住人数',
          num: 0
        },
        {
          label: '群租人数',
          num: 0
        },
        {
          label: '重点关注人员数',
          num: 583
        },
        {
          label: '特殊关爱人员数',
          num: 2585
        }
      ]
    }
  },
  async mounted () {
    await this.handleQueryCommunityTree()
    // await this.handleCount({ id: '305153127df411ea8f61fa163eac942c' })
    await this.handleCount({
      organizationName: '红谷滩区',
      id: '305153127df411ea8f61fa163eac955c'
    })
    this.handlDefaultSelect()
  },
  methods: {
    // 获取小区数据
    async handleQueryCommunityTree () {
      this.isLoading = true
      try {
        const { status, data } = await queryCommunityTree()
        if (status === 200) {
          this.isLoading = false
          this.data = data
        }
      } catch (error) {}
    },
    // 小区数据获取楼栋
    async handleQueryBuildingByCommunity (node) {
      try {
        const { status, data } = await queryBuildingByCommunity({
          communityId: node.id
        })
        if (status === 200) {
          this.handleGroupBuilding(data, node)
        }
      } catch (error) {}
    },
    // 楼栋编号获取房间
    async queryRoomByBuilding (node) {
      try {
        const { status, data } = await queryRoomByBuilding({
          buildingId: node.id
        })
        if (status === 200) {
          this.handleRooms(data)
          this.$EventBus.$emit('update:buildLayerList', {
            list: this.buildLayerList,
            title: this.title,
            activeName: 'second'
          })
        }
      } catch (error) {}
    },
    // 根据区县或小区统计房屋、人口数量
    async handleStatisticRoomAndUser (id) {
      const { status, data } = await statisticRoomAndUser({ id })
      if (status === 200) {
        for (const key in data) {
          switch (key) {
            case 'totalRoom':
              this.buildInfo[0].num = data[key]
              break
            case 'totalPeople':
              this.peopleInfo[0].num = data[key]
              break
            case 'rentRoom':
              this.buildInfo[1].num = data[key]
              break
            case 'rentPeople':
              this.peopleInfo[1].num = data[key]
              break
            case 'selfLiveRoom':
              this.buildInfo[2].num = data[key]
              break
            case 'selfLivePeople':
              this.peopleInfo[2].num = data[key]
              break
            case 'groupLiveRoom':
              this.buildInfo[3].num = data[key]
              break
            case 'groupLivePeople':
              this.peopleInfo[3].num = data[key]
              break
            case 'focusRoom':
              this.buildInfo[4].num = data[key]
              break
            case 'focusPeople':
              this.peopleInfo[4].num = data[key]
              break
            case 'careRoom':
              this.buildInfo[5].num = data[key]
              break
            case 'carePeople':
              this.peopleInfo[5].num = data[key]
              break
            default:
              break
          }
        }
      }
    },
    // // 楼栋编号获取单元
    // async handleQueryUnitByBuilding(node) {
    //   try {
    //     const { status, data } = await queryUnitByBuilding({
    //       buildingId: node.id
    //     })
    //     if (status === 200) {
    //       const units = this.handleUnit(data)
    //       if (units.length !== 0) {
    //         units.forEach(async id => {
    //           await this.handleQueryRoomByUnit(id)
    //         })
    //       }
    //     }
    //   } catch (error) {}
    // },
    // // 根据单元编号获取房屋
    // async handleQueryRoomByUnit(id) {
    //   try {
    //     const { status, data } = await queryRoomByUnit({ unitId: id })
    //     if (status === 200) {
    //       this.handleRooms(data)
    //       // console.log(this.title)
    //       // console.log(this.buildLayerList)
    //       this.$EventBus.$emit('update:buildLayerList', {
    //         list: this.buildLayerList,
    //         title: this.title
    //       })
    //     }
    //   } catch (error) {}
    // },
    // 点击节点回调
    async nodeClick (node) {
      // console.log('-------------------', node)
      // 只有小区层级 且  小区下属楼栋未显示调用接口
      if (node.organizationLevel === '5' && node.children.length === 0) {
        await this.handleCount(node)
        this.handleQueryBuildingByCommunity(node)
      } else if (node.organizationLevel === '6') {
        this.queryRoomByBuilding(node)
      } else {
        await this.handleCount(node)
      }
    },
    // 获取县区、小区统计概况
    async handleCount (node) {
      await this.handleStatisticRoomAndUser(node.id)
      this.$EventBus.$emit('update:countInfo', {
        title: node.organizationName || '南昌市',
        buildInfo: this.buildInfo,
        peopleInfo: this.peopleInfo,
        activeName: 'frist'
      })
    },
    // 处理返回楼栋数
    handleGroupBuilding (data, node) {
      const children = []
      data.forEach(item => {
        children.push({
          id: item.id,
          organizationName: item.buildingName,
          children: [],
          organizationLevel: '6'
        })
      })
      this.handleChildren(node.id, this.data, children)
    },
    // 根据小区编号更改楼栋信息
    handleChildren (id, data, children) {
      const arr = Array.isArray(data) ? data : data.children
      for (const item of arr) {
        if (!item.id) continue
        if (item.id !== id) {
          // debugger
          this.handleChildren(id, item, children)
        } else {
          // debugger
          item.children = children
          break
        }
      }
    },
    // 处理单元数据
    handleUnit (data) {
      const arr = []
      for (const item of data) {
        arr.push(item.id)
      }
      return arr
    },
    // 处理房屋数据
    handleRooms (data) {
      this.buildLayerList = []
      this.title = data[0].communityName + data[0].buildingName
      data.forEach((item, index) => {
        const buildLayerItem = { layerName: '', roomList: [] }
        if (
          index === 0 ||
          this.buildLayerList[this.buildLayerList.length - 1].floor !==
            item.floor
        ) {
          buildLayerItem.layerName = item.floor + '层'
          buildLayerItem.floor = item.floor
          buildLayerItem.roomList.push({
            id: item.id,
            unitName: item.unitName,
            roomNum: item.roomName,
            personNum: item.livePerson,
            owner: item.roomMasterName ? item.roomMasterName : '-',
            type: this.handleRoomType(item.livePerson, item.roomType),
            isSelected: true
          })
          this.buildLayerList.push(buildLayerItem)
        } else if (
          this.buildLayerList[this.buildLayerList.length - 1].floor ===
          item.floor
        ) {
          this.buildLayerList[this.buildLayerList.length - 1].roomList.push({
            id: item.id,
            unitName: item.unitName,
            roomNum: item.roomName,
            personNum: item.livePerson,
            owner: item.roomMasterName ? item.roomMasterName : '-',
            type: this.handleRoomType(item.livePerson, item.roomType),
            isSelected: true
          })
        }
      })
    },
    // 处理房间类型分类
    handleRoomType (livePerson, roomType) {
      if (roomType === '出租') {
        if (livePerson >= 7) {
          return '群租（7人以上）'
        } else {
          return '出租'
        }
      } else if (livePerson === 0) {
        return '空置'
      } else {
        return '自住'
      }
    },
    // 默认选中红谷滩
    handlDefaultSelect () {
      this.$nextTick(() => {
        // console.log(this.$refs.tree)
        this.$refs.tree.setCurrentKey('305153127df411ea8f61fa163eac955c')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #199ccb;
}

/deep/ .el-scrollbar__wrap {
  overflow: auto;
  padding: 10px;
}

/deep/ .el-tree {
  color: #fff;
}

/deep/ .el-tree-node__content {
  height: 34px;
}

/deep/ .el-tree-node__content:hover {
  background: #199ccb;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
  background: #199ccb;
}
</style>
