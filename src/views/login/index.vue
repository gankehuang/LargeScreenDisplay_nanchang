<template>
  <div class="container">
    <div class="login-form">
      <div class="form-title">
        用户登录
      </div>
      <div class="form">
        <div class="form-bg">
          <el-input
            v-model="form.username"
            type="text"
            placeholder="账号"
          />
        </div>
        <div class="form-bg">
          <el-input
            class="password"
            v-model="form.password"
            type="password"
            placeholder="密码"
          />
        </div>
        <button @click="handleLogin">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { enumRegion } from '@/config/common'
import { countCameraByRegion } from '@/api/smartData/gridView'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // eslint-disable-next-line handle-callback-err
    window.localforage.getItem('regionVideoObj', (err, value) => {
      if (value) {
        let flag = false
        for (const key in value) {
          if (!value[key].length) {
            flag = true
            break
          }
        }
        if (flag) {
          this.startVideoWorker()
        }
      } else {
        // 准备regionVideoObj数据
        const regionVideoObj = {}
        for (const key in enumRegion) {
          regionVideoObj[enumRegion[key]] = []
        }
        window.localforage.setItem('regionVideoObj', regionVideoObj)
        this.startVideoWorker()
      }
    })
  },
  methods: {
    // 开始获取天网视频列表worker
    async startVideoWorker() {
      const worker = new Worker('../../videoWorker.js')
      let saveNum = 0
      worker.onmessage = ({ data }) => {
        this._saveVideoData(data)
        saveNum++
        if (saveNum === Object.keys(enumRegion).length) {
          worker.terminate()
          console.log('天网视频worker完成！')
        }
      }

      const { data, status } = await countCameraByRegion()
      if (status === 200) {
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            worker.postMessage({
              gridCode: data[i].gridCode,
              gridType: enumRegion[data[i].gridName]
            })
          }, i * 3000)
        }
      }
    },
    // 存储天网视频列表
    _saveVideoData({ gridType, markers }) {
      // eslint-disable-next-line handle-callback-err
      window.localforage.getItem('regionVideoObj', function(err, value) {
        let regionVideoObj = value
        if (!regionVideoObj) {
          regionVideoObj = {}
        }
        regionVideoObj[gridType] = markers
        window.localforage.setItem('regionVideoObj', regionVideoObj)
      })
    },
    handleLogin() {
      this.$store.dispatch('user/login', this.form).then(
        () => {
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
        },
        (data) => {
          if (data && data.message[0]) {
            this.$message.error(data.message[0].message)
          } else {
            this.$message.error('服务器未知错误')
          }
        }
      )
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style></style>
<style lang="scss" scoped>
.container {
  position: relative;
  background-image: url('~@/assets/image/login/login-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center 0;
  width: 100%;
  height: 100%;
  .title {
    text-align: center;
  }
}

.login-form {
  background: url('~@/assets/image/login/form-bg.png');
  background-size: 100% 100%;
  width: 449px;
  height: 400px;
  position: absolute;
  top: 25%;
  right: 10%;
  padding: 50px;
  .form-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    height: calc(100% - 42px);
    align-items: center;
    .form-bg {
      width: 350px;
      height: 50px;
      background: url('~@/assets/image/login/input-bg.png');
      background-size: 100% 100%;
      margin-top: 31px;
      /deep/.el-input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
        outline: none;
        color: #ffffff;
        background: transparent;
        font-size: 16px;
        .el-input__inner {
          background: transparent !important;
          height: 100%;
        }
      }
    }
    button {
      width: 100%;
      height: 45px;
      outline: none;
      border: none;
      background: #0176e4;
      border-radius: 4px;
      font-size: 20px;
      letter-spacing: 1vw;
      color: #ffffff;
      margin-top: 61px;
      cursor: pointer;
    }
  }
}
</style>
