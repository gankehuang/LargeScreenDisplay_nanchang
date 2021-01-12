<template>
  <div class="nc-dialog">
    <div class="title">{{ select0ne.name }}{{ select0ne.type }}情况</div>
    <div class="line" />
    <el-scrollbar style="width: 100%; height: 300px">
      <div class="nc-num" v-for="(item, index) in select0ne.data" :key="index">
        <span>{{ item.name }}</span>
        {{ item.value }}{{item.unit}}
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    select0ne: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('update:dialogVisable', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-scrollbar__view {
  display: block !important;
  // padding: 0 5px;
}
.nc-dialog {
  width: 100%;
  height: 100%;
  .title {
    padding: 10px 0 0 48px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: rgb(103, 211, 241);
    font-weight: 400;
  }
  .line {
    width: 100%;
    height: 4px;
    margin: 20px 0 0 50px;
    background: url("~@/assets/image/dataView/ncMap-modal-line-bg.png") center
      center / 100% 100% no-repeat;
  }
  .nc-num {
    width: 237px;
    height: 30px;
    line-height: 30px;
    background: url("~@/assets/image/dataView/ncMap-modal-item-bg.png");
    padding: 0 6px;
    border: 1px solid rgba(103, 211, 241, 0.2);
    margin: 20px 0 0 50px;
    text-align: right;
    position: relative;
    color: #fff;
    span {
      position: absolute;
      left: 6px;
    }
  }
  .close {
    cursor: pointer;
    position: absolute;
    z-index: 2002;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: url("~@/assets/image/dataView/pop-modal-close.png") center
      center / 100% 100% no-repeat;
  }
}
</style>
