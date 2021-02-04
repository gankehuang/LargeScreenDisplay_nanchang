<template>
  <div class="drop">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ area }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu
        slot="dropdown"
        class="select-button"
      >
        <el-dropdown-item
          v-for="(item, index) in areaList"
          :key="index"
          @click.native="areaClick(item)"
        >
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ time }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu
        slot="dropdown"
        class="select-button"
      >
        <el-dropdown-item
          v-for="(item, index) in timeList"
          :key="index"
          @click.native="timeclick(item)"
        >
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ kind }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu
        slot="dropdown"
        class="select-button"
      >
        <el-dropdown-item
          v-for="(item, index) in kindList"
          :key="index"
          @click.native="kindClick(item)"
        >
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    areaList: {
      type: Array,
      default: () => {}
    },
    timeList: {
      type: Array,
      default: () => {}
    },
    kindList: {
      type: Array,
      default: () => {}
    },
    area: {
      type: String,
      default: () => {}
    },
    time: {
      type: String,
      default: () => {}
    },
    kind: {
      type: String,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    areaClick (item) {
      this.$emit('areaClick', item)
    },
    kindClick (item) {
      this.$emit('kindClick', item)
    },
    timeclick (item) {
      this.$emit('timeclick', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.drop {
  position: absolute;
  right: 5px;
  top: 20px;
  z-index: 40;

  .select-button {
    width: 110px;
    text-align: center;
    background: #559AF6 url('~@/assets/image/importPeople/button-bg.png')no-repeat center;
    background-size: 100% 100%;
    border: 0;
  }
}
.el-dropdown {
  margin-right: 20px;
}
.el-dropdown-link {
  display: inline-block;
  width: 110px;
  line-height: 31px;
  text-align: center;
  font-size: 12px;
  color: #b2d9fb;
  background: url("~@/assets/image/interviewSituation/button-bg.png")
    no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

</style>
