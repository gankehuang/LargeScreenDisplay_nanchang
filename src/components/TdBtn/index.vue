<template>
  <el-tooltip :content="content" placement="top" effect="light">
    <el-button plain :icon="icon" :type="type" @click="$emit('click')" />
  </el-tooltip>
</template>

<script>
export default {
  props: {
    content: String,
    icon: String,
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
