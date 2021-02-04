<template>
  <div class="layout">
    <HeadNav @showAuthority="showAuthority" />
    <router-view />

    <Alert
      v-if="alert.display"
      :alert-info="alert.info"
      @bindBtnClose="alert.display = false"
      @bindShowDetail="lookEventDetail"
    />
    <AuthorityModal :visible.sync="authority" />
  </div>
</template>

<script>
import HeadNav from './HeadNav'
import Alert from '@/components/Alert'
import {
  createEvent
  // newCreateEvent
} from '@/api/intelligentCommand/warning'
import { dateFormat } from '@/utils/dateTime'
import AuthorityModal from './AuthorityModal'

export default {
  components: {
    HeadNav,
    Alert,
    AuthorityModal
  },
  data () {
    return {
      alert: {
        display: false,
        info: {}
      },
      lastEvent: {},
      timer: null,
      authority: false
    }
  },
  mounted () {
    this.initEnterEvent()
    // this.startEventPolling()
  },
  methods: {
    // 轮询事件列表
    startEventPolling () {
      const worker = new Worker('../pollingWorker.js')
      worker.onmessage = ({ data }) => {
        const event = data[0]
        // 如果上一次警报事件的id 与 当前事件列表的第一条事件的id 不相同，说明有新事件发生
        if (event && this.lastEvent.id !== event.id) {
          if (new Date() - new Date(event.happenedTime) < 60 * 1000) {
            this.alert.info = event
            this.alert.display = true
            this.lastEvent = event
          }
        }
      }

      worker.postMessage({
        params: {
          excludeEventCodeList: 'supervise'
        }
      })
    },
    // 点击查看详情
    lookEventDetail (info) {
      this.$router.push({
        path: '/riskPrevention/warning',
        query: {
          id: info.id
        }
      })
      // 点击查看详情后，报警框消失
      this.alert.display = false
    },
    initEnterEvent () {
      document.onkeydown = function (e) {
        // console.log(e.keyCode)
        const e1 = e || event || window.event
        if (e1 && e1.keyCode === 65) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '紧急报警按钮',
            deviceNo: '221',
            deviceType: 'ALARM_BOX',
            emergencyLevel: 2,
            eventCode: 'EMERGENCY_BUTTON',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '7',
              deviceName: '紧急报警按钮',
              deviceNumber: '221',
              deviceType: '2',
              idNo: '360430195606250000',
              name: '吴金华',
              originImageUrl:
                'http://223.82.111.143:8081/group1/M00/01/BB/wKgBvF7PL-yALu01AABP-c5dv_g697.jpg',
              peopleSubType: '独居老人',
              peopleType: '特殊关爱',
              phone: '13755601663',
              serialNumber: 'MIT201912023421',
              sex: '1',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        } else if (e1 && e1.keyCode === 83) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '智能烟感',
            deviceNo: '225',
            deviceType: 'ALARM_BOX',
            emergencyLevel: 2,
            eventCode: 'SMOKE_ALARM',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '8',
              deviceName: '智能烟感',
              deviceNumber: '225',
              deviceType: '2',
              idNo: '',
              name: '',
              originImageUrl: '',
              peopleSubType: '',
              peopleType: '',
              phone: '',
              serialNumber: 'MIT201912023423',
              sex: '',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        } else if (e1 && e1.keyCode === 68) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '智能燃气监测',
            deviceNo: '226',
            deviceType: 'ALARM_BOX',
            emergencyLevel: 2,
            eventCode: 'GAS_LEAK_ALARM',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '9',
              deviceName: '智能燃气监测',
              deviceNumber: '226',
              deviceType: '2',
              idNo: '',
              name: '',
              originImageUrl: '',
              peopleSubType: '',
              peopleType: '',
              phone: '',
              serialNumber: 'MIT201912023427',
              sex: '',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        } else if (e1 && e1.keyCode === 70) {
          createEvent({
            communityCode: 'e9f325042b7647bca1aef5e02853a0ef',
            communityName: '丰和花园',
            deviceName: '智能地磁',
            deviceNo: '227',
            deviceType: '',
            emergencyLevel: 3,
            eventCode: 'EMERGENCY_CHANNEL_OCCUPY',
            extension: JSON.stringify({
              deployTime: dateFormat(),
              deviceId: '19',
              deviceName: '智能地磁',
              deviceNumber: '227',
              deviceType: '2',
              idNo: '',
              name: '',
              originImageUrl: '',
              peopleSubType: '',
              peopleType: '',
              phone: '',
              serialNumber: 'MIT201912023429',
              sex: '',
              similarity: 98,
              snapShotUrl: '',
              snapTime: dateFormat()
            }),
            happenedTime: dateFormat(),
            latitude: '28.623652',
            location: '南昌市综治中心',
            longitude: '115.820076',
            severity: 1,
            zoneId: '121932',
            zoneName: 'A区'
          })
        }
        // else if (e1 && e1.keyCode === 90) {
        //   newCreateEvent({
        //     eventCode: 62053,
        //     deviceId: 11472,
        //     deviceName:
        //       '红谷滩1503（全智能）红谷中大道998号绿地中心中央广场枪机',
        //     deviceSerialNo: '36011230601310227026',
        //     location: '红谷中大道998号绿地中心中央广场',
        //     longitude: '115.8561925602',
        //     latitude: '28.6852113904',
        //     snapImageUrl:
        //       'http://106.225.143.132:8088/group1/M00/00/2D/auGPhF-WoWKAIF4xABIj7XhCEsc605.png',
        //     snapBakUrl:
        //       'http://106.225.143.132:8088/group1/M00/00/2D/auGPhF-WoWKAIF4xABIj7XhCEsc605.png',
        //     happenedTime: dateFormat(),
        //     snapTime: dateFormat(),
        //     emergencyLevel: 3
        //   })
        // }
      }
    },
    showAuthority () {
      this.authority = true
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .page-main {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
