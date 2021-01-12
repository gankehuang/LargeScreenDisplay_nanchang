<template>
  <div class="td" :style="tdStyleObj">
    <slot>{{ itemValue }}</slot>
  </div>
</template>

<script>
export default {
  props: ['itemValue', 'flex', 'styleObj'],
  data() {
    return {}
  },
  computed: {
    tdStyleObj() {
      return {
        flex: this.flex,
        ...this.styleObj
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
