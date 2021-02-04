<template>
  <el-image
    :style="sizeStyle"
    fit="cover"
    :src="src"
    :preview-src-list="previewList || [src]"
    class="img-container"
  >
    <div
      slot="error"
      class="image-slot"
    >
      <i class="el-icon-picture-outline" />
    </div>
  </el-image>
</template>

<script>
export default {
  name: 'ImgPreview',
  props: {
    src: String,
    previewList: Array,
    size: [Number, String],
    width: Number,
    height: Number
  },
  computed: {
    sizeStyle () {
      if (
        this.size &&
        typeof this.size === 'string' &&
        this.size.indexOf('%') > -1
      ) {
        return { width: `${this.size}`, height: `${this.size}` }
      } else {
        if (this.size) {
          return { width: `${this.size}px`, height: `${this.size}px` }
        } else if (this.width && this.height) {
          return { width: `${this.width}px`, height: `${this.height}px` }
        } else {
          return {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-container::v-deep {
  .empty {
    width: 100%;
    height: 100%;
    background-color: #f5f7fa;
    color: #c0c4cc;
    .icon {
      width: 35%;
      height: 35%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
