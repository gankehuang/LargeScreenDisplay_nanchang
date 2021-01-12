<template>
  <ChartContainer
    title="视频调度"
    height="860"
    :class="collapse && 'collapse'"
    class="list"
  >
    <div class="container">
      <input type="text" class="search" v-model="search" />

      <div class="tree-container">
        <el-tree :data="departmentTree" accordion default-expand-all>
          <div
            class="node"
            slot-scope="{ node, data }"
            @click="startPlay(data.id)"
          >
            <img
              v-if="node.isLeaf && node.level !== 1"
              class="img-device"
              :class="data.isOnline || 'inactive'"
              src="@/assets/image/command/device.png"
            />
            <span>{{ node.label }}</span>
            <div class="img-right">
              <img
                src="@/assets/image/command/通话.png"
                v-if="talkingIds.includes(data.id)"
              />
              <img
                src="@/assets/image/command/播放.png"
                v-if="playingIds.includes(data.id)"
              />
            </div>
          </div>
        </el-tree>
      </div>

      <div class="btn-collaspe" @click="collapse = !collapse">
        <img src="@/assets/image/command/collapse.png" v-if="collapse" />
        <img src="@/assets/image/command/uncollapse.png" v-else />
      </div>
    </div>
  </ChartContainer>
</template>

<script>
import ChartContainer from '@/components/ChartContainer'
export default {
  props: {
    list: Array,
    playingIds: Array,
    talkingIds: Array
  },
  components: {
    ChartContainer
  },
  data() {
    return {
      search: '',
      collapse: false,
      livingIds: []
    }
  },
  computed: {
    departmentTree() {
      const list = this.list.map(item => {
        return {
          id: item.id,
          label: item.nickName,
          isOnline: item.isOnline
        }
      })
      return [
        {
          label: '南昌市',
          children: list
        }
      ]
    }
  },
  methods: {
    startPlay(id) {
      this.$emit('startPlay', id)
    },
    pullMonitor(id) {
      this.livingIds = this.livingIds.filter(item => item !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .tree-container {
    flex-grow: 1;
    margin-bottom: 15px;
    margin-right: 15px;
    margin-left: 15px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
      background: #ffffff4d;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(13, 136, 178, 1);
    }
  }
}

.search {
  width: 294px;
  min-height: 36px;
  background-color: transparent;
  margin: 10px auto;
  border-color: #199ccb;
  outline: none;
  border-width: 1px;
  border-radius: 4px;
  display: block;
  padding-left: 15px;
  color: #ffffff;
  background: url("~@/assets/image/command/search.png") 96% 52% no-repeat;
}

.link-btns {
  display: flex;
  align-items: center;
  padding: 0px 17px;
  position: relative;
  z-index: 2;
  margin-bottom: 10px;
  .link {
    width: 150px;
    height: 29px;
    line-height: 29px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    background: url("~@/assets/image/command/link-btn.png") no-repeat;
    background-size: 100% 100%;
    &.active,
    &:hover {
      background-image: url("~@/assets/image/command/link-btn_active.png");
    }
    &.end {
      background-image: url("~@/assets/image/command/link-btn-last.png");
      &.active,
      &:hover {
        background-image: url("~@/assets/image/command/link-btn-last_active.png");
      }
    }
  }
}

.node {
  position: relative;
  width: 100%;
  .img-device {
    margin-right: 8px;
    &.inactive {
      filter: grayscale(1);
    }
  }
  .img-right {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 2px;
    img {
      margin-right: 5px;
    }
  }
}

.list {
  flex-shrink: 0;
  &.collapse {
    margin-left: -323px;
  }
}

.btn-collaspe {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
