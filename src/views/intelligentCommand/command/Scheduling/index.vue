<template>
  <div class="page-box">
    <SchedulingList
      ref="schedulingList"
      :list="list"
      :playingIds="playingIds"
      :talkingIds="talkingIds"
      @startPlay="startPlay"
    />
    <MonitorContainer
      ref="monitorContainer"
      :playingIds="playingIds"
      :talkingIds="talkingIds"
      @stopPlay="stopPlay"
      @addTalker="addTalker"
      @removeTalker="removeTalker"
    />
  </div>
</template>

<script>
import SchedulingList from './SchedulingList'
import MonitorContainer from './MonitorContainer'
import { getDepartmentList } from '@/api/intelligentCommand/command'
export default {
  components: {
    SchedulingList,
    MonitorContainer
  },
  data() {
    return {
      list: [],
      playingIds: [],
      talkingIds: []
    }
  },
  async mounted() {
    await this.getDepartmentList()
    let ids = this.$route.query.id
    if (typeof ids === 'string') {
      ids = [ids]
    }
    ids = ids.map(id => Number(id))
    ids.forEach(id => {
      if (this.list.find(item => item.id === id).isOnline) {
        this.startPlay(id)
      }
    })
  },
  methods: {
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.list = res
    },
    startPlay(id) {
      if (this.playingIds.includes(id)) return false
      this.playingIds.push(id)
      this.$refs['monitorContainer'].startPlay(id)
    },
    stopPlay(id) {
      this.playingIds = this.playingIds.filter(item => item === id)
    },
    addTalker(id) {
      if (this.talkingIds.includes(id)) return false
      this.talkingIds.push(id)
    },
    removeTalker(id) {
      this.talkingIds = this.talkingIds.filter(item => item === id)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  padding: 80px 5px 5px 5px;
  display: flex;
  background-color: #05243f;
}
</style>
