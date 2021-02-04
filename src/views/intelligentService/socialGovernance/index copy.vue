<template>
  <div class="socialGovernance">
    <Tabs
      :tab-list="tabList"
      width="500px"
      :cur-index="1"
    />
    <iframe
      src="http://172.11.16.88/admin/privilegeCodeLogin.jhtml?privilegeCode=sj&loginName=ncshzl"
      width="100%"
      height="100%"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
    />
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
export default {
  mixins: [commonMixin],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.socialGovernance {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 130px 0 0 0;
  background-color: #1d293b;
  background: url("~@/assets/image/intelligentService/page-bgm.png") no-repeat;
  background-size: 100% 100%;
}
</style>
