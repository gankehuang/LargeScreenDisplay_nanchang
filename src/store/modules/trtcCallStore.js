import TRTC from 'trtc-js-sdk'
import trtcCallConfig from '@/config/trtcCallConfig'
import checkTRTC from '@/utils/checkTRTC'
import { genTestUserSig } from '@/utils/GenerateTestUserSig'
import { Message } from 'element-ui'

// 1、登录 2、创建房间 3.关闭房间
// 视频关闭打开本地摄像头、声音  调用摄像头  调用声音
// 视频关闭远端摄像头、声音

// 创建音视频房间
function createRoom (userId, userSig) {
  const client = TRTC.createClient({
    sdkAppId: trtcCallConfig.SDKAPPID,
    userId: userId,
    userSig: userSig,
    mode: 'rtc'
  })
  return client
}
// 创建本地音视频流
function createStream (userId) {
  return TRTC.createStream({ userId, audio: true, video: true })
}

const state = {
  userInfo: null,
  client: null,
  userSig: null,
  localStream: null,
  remoteStreams: []
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_CLIENT: (state, client) => {
    state.client = client
  },
  SET_USERSIG: (state, userSig) => {
    state.userSig = userSig
  },
  SET_LOCALSTREAM: (state, localStream) => {
    state.localStream = localStream
  },
  SET_REMOTESTREAMS: (state, remoteStreams) => {
    state.remoteStreams = [remoteStreams, ...state.remoteStreams]
  },
  INIT_REMOTESTREAMS: state => {
    state.remoteStreams = []
  }
}

const actions = {
  // 实例化会议客户端
  async createRoom ({ dispatch, commit }, userInfo) {
    const resultBool = await checkTRTC()
    if (!resultBool) {
      return
    }
    commit('SET_USERINFO', userInfo)
    const userId = state.userInfo.userId
    commit('SET_USERSIG', genTestUserSig(userId).userSig)
    commit('SET_CLIENT', createRoom(userId, state.userSig))
    dispatch('joinRoom')
    dispatch('clientOnStream', { divId: userInfo.divId })
  },
  // 监听远端音视频流
  clientOnStream ({ commit }, { divId }) {
    const client = state.client
    client.on('stream-added', event => {
      console.log('------------------stream-added 执行')
      const remoteStream = event.stream
      commit('SET_REMOTESTREAMS', { divId, remoteStream })
      console.log('远端流增加: ' + remoteStream.getId())
      // 订阅远端流
      client.subscribe(remoteStream)
    })
    client.on('stream-subscribed', event => {
      console.log('------------------stream-subscribed 执行')
      const remoteStream = event.stream
      console.log('远端流订阅成功：' + remoteStream.getId())
      // 播放远端流
      remoteStream.play(divId)
    })
    client.on('stream-removed', event => {
      const remoteStream = event.stream
      console.log('------------------------------stream-removed', remoteStream)
    })
  },
  // 加入会议 没有该房  就创建房间
  joinRoom ({ dispatch }) {
    state.client
      .join({ roomId: 29108 })
      .then(() => {
        Message.success('会议创建成功')
        dispatch('createStream')
      })
      .catch(err => {
        console.error('创建会议失败：', err)
      })
  },
  // 创建本地流
  createStream ({ dispatch, commit }) {
    const userId = state.userInfo.userId
    const localStream = createStream(userId)
    commit('SET_LOCALSTREAM', localStream)
    dispatch('initLocalStream')
  },
  // 初始化音视频流
  initLocalStream ({ dispatch }) {
    const localStream = state.localStream
    // console.log('-----------------本地流：', localStream)
    // 使用自定义视频Profile设置
    // localStream.setVideoProfile('120p')
    localStream
      .initialize()
      .catch(error => {
        console.error('初始化本地流失败 ' + error)
      })
      .then(() => {
        dispatch('playLocalStream', { divId: 'me' })
        dispatch('punlishLocalStream')
      })
  },
  // 发布本地视频流
  punlishLocalStream () {
    const client = state.client
    const localStream = state.localStream
    client
      .publish(localStream)
      .catch(error => {
        console.error('本地流发布失败 ' + error)
      })
      .then(() => {
        console.log('本地流发布成功')
      })
  },
  // 播放本地流
  playLocalStream (_, { divId }) {
    const localStream = state.localStream
    localStream
      .initialize()
      .catch(error => {
        console.error('初始化本地流失败 ' + error)
      })
      .then(() => {
        localStream.play(divId)
      })
  },
  // 离开房间
  leaveRoom ({ commit }) {
    state.localStream.stop()
    state.localStream.close()
    commit('SET_LOCALSTREAM', null)
    state.client
      .leave()
      .then(() => {
        Message.success('会议关闭成功')
        commit('INIT_REMOTESTREAMS')
      })
      .catch(err => {
        console.error('会议关闭失败：', err)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
