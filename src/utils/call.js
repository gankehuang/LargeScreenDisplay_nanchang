import axios from 'axios'
import qs from 'querystring'
import { getSeq } from '@/api/intelligentCommand/command'

class Call {
  constructor(voiceType) {
    this.isTalking = false // 正在对讲
    this.voiceType = voiceType // 呼叫类型 0-临时组呼 1-单呼
    this.groupId = '' // 群组ID
    this.clientUrl = 'http://127.0.0.1:54321' // 4G对讲程序调用地址
    this.clientUserId = 0 // 软件(对讲插件)终端ID
    this.communicationServerConfig = {
      host: '120.24.54.248',
      port: '1238'
    }
  }

  // 检测插件是否正常运行
  async checkPlugin() {
    return new Promise((resolve, reject) => {
      axios({
        url: this.clientUrl,
        method: 'get',
        params: {
          host: this.communicationServerConfig.host,
          port: this.communicationServerConfig.port
        }
      }).then(
        res => {
          if (res.data > 0) {
            this.clientUserId = res.data
            resolve()
          } else if (res.data === 0) {
            reject('语音对讲客户端登录失败，请联系系统管理人员')
          }
        },
        () => {
          reject('语音对讲客户端未启动，请安装后打开客户端')
        }
      )
    })
  }

  // 设备连接,创建群组
  async link(userIds) {
    const { seq, sign } = await getSeq()
    const res = await axios({
      url: '/voice/thirdSystem/facade_start_voice.htm',
      method: 'post',
      data: qs.stringify({
        seq: seq,
        sign: sign,
        voiceType: this.voiceType,
        clientUserId: this.clientUserId,
        userIds: [this.clientUserId, ...userIds].toString()
      })
    })
    return new Promise((resolve, reject) => {
      if (res.data.status === 'ok') {
        this.groupId = res.data.groupId
        return resolve('设备连接成功')
      } else {
        return reject('设备连接失败,请联系管理员')
      }
    })
  }

  // 设备断连,解散群组
  async unlink() {
    if (!this.groupId) return false
    const { seq, sign } = await getSeq()
    await axios({
      url: '/voice/thirdSystem/facade_stop_voice.htm',
      method: 'post',
      data: qs.stringify({
        seq: seq,
        sign: sign,
        groupId: this.groupId
      })
    })
    this.groupId = []
  }

  // 群组添加成员
  async addMembers(userIds) {
    const { seq, sign } = await getSeq()
    await axios({
      url: '/voice/thirdSystem/facade_add_group_user_mapping.htm',
      method: 'post',
      data: qs.stringify({
        seq: seq,
        sign: sign,
        groupId: this.groupId,
        userIds: userIds.toString()
      })
    })
  }

  // 群组移除成员
  async removeMembers(userIds) {
    const { seq, sign } = await getSeq()
    await axios({
      url: '/voice/thirdSystem/facade_delete_member.htm',
      method: 'post',
      data: qs.stringify({
        seq: seq,
        sign: sign,
        groupId: this.groupId,
        userIds: userIds
      })
    })
  }

  // 开始呼叫
  async startTalking() {
    if (this.isTalking) return true
    await axios({
      method: 'get',
      url: this.clientUrl,
      params: {
        state: 1
      }
    })
    this.isTalking = true
  }

  // 停止呼叫
  async stopTalking() {
    if (!this.isTalking) return false
    axios({
      method: 'get',
      url: this.clientUrl,
      params: {
        state: 2
      }
    })
    this.isTalking = false
  }
}

export default Call
