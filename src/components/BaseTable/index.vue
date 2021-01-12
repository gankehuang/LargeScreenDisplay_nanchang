<template>
  <div
    class="base-table"
    :class="{ isBorder: isBorder, isNoBorder: isNoBorder }"
  >
    <div class="thead">
      <div
        class="th"
        v-for="(item, index) in tableHeadData"
        :style="{ flex: item.flex }"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="tbody" :style="{ height: tableHeight }">
      <el-scrollbar style="height:100%;width:100%;">
        <div
          class="tr"
          v-for="(item, index) in tableData"
          :key="index + 'baseTableTr'"
        >
          <slot name="item" :item="item" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否有侧边框
    isBorder: {
      type: Boolean,
      default: true
    },
    // 是否完全无边框
    isNoBorder: {
      type: Boolean,
      default: false
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: '300px'
    },
    // 表头配置
    tableHeadData: {
      type: Array,
      default: () => [],
      required: true
    },
    // 表体数据
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.base-table {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  .thead {
    color: #b2e4fc;
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    .th {
      flex: 1;
      padding: 8px 0;
      text-align: center;
    }
  }

  /deep/.tr {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    .td {
      flex: 1;
      padding: 10px 0;
      text-align: center;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
}

.isBorder {
  .th {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    &:last-child {
      border-right: 0;
    }
  }

  /deep/ .td {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    &:last-child {
      border-right: 0;
    }
  }
}

.isNoBorder {
  border: 0;
  .thead {
    border-bottom: 0;
  }
  /deep/ .tr {
    border-bottom: 0;
  }
}
</style>
