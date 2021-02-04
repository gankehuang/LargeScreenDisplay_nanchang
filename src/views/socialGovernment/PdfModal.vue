<template>
  <div
    v-if="visible"
    class="pdf-modal-contianer"
  >
    <div
      class="close"
      @click="close"
    />
    <el-scrollbar class="popup-scrollbar">
      <pdf
        v-for="(item, index) in pdfFile.numPages"
        :key="index"
        class="pdf-page"
        :src="pdfFile.file"
        :page="item"
      />
    </el-scrollbar>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    pdfFile: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      numPages: 0
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-modal-contianer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/image/socialGovernment/popup_right_bg.png") center
    center / 100% 100% no-repeat;
}
.popup-scrollbar {
  margin: 17px 0 0 10px;
  width: 88%;
  height: 93%;
}
.pdf-page {
  width: 100%;
  height: 100%;
}
.close {
  cursor: pointer;
  position: absolute;
  z-index: 2001;
  top: 55px;
  right: 35px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
</style>
