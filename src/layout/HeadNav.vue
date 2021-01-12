<template>
  <div class="page-nav">
    <div class="province-btns" @click="changeProvince"></div>
    <div class="nav-bg">
      <span class="nav-title">南昌市域社会治理应用平台</span>
    </div>
    <div class="nav-left">
      <a
        class="link"
        @click="nativeTo('/smartData/dataView')"
        :class="{
          active: $route.path.includes('/smartData')
        }"
        >智汇数据</a
      >
      <a
        class="link"
        @click="nativeTo('/riskPrevention/warning')"
        :class="{ active: $route.path.includes('riskPrevention') }"
        >智防风险</a
      >

      <a
        class="link"
        @click="nativeTo('/intelligentCommand/command')"
        :class="{ active: $route.path.includes('intelligentCommand') }"
        >智能指挥</a
      >
    </div>

    <div class="nav-right">
      <a
        class="link"
        @click="nativeTo('/adminIntelligentService/socialGovernance')"
        :class="{ active: $route.path.includes('adminIntelligentService') }"
        >智惠服务</a
      >
      <a
        class="link"
        @click="nativeTo('/intelligentDecisionMaking/dataCockpit')"
        :class="{ active: $route.path.includes('intelligentDecisionMaking') }"
        >智辅决策</a
      >

      <a
        class="link"
        @click="nativeTo('/intelligentOffice/officePortal')"
        :class="{ active: $route.path.includes('/intelligentOffice') }"
        >智效办公</a
      >
    </div>

    <div class="control-right-btns">
      <div class="btn" @click="nativeTo('/search')">
        <img
          src="@/assets/image/layout/search.png"
          style="width: 37px;height: 37px;"
        />
      </div>

      <div class="btn menu-box" v-clickoutside="handleClose">
        <img
          @click="toggleMenu"
          style="width: 37px;height: 37px;"
          src="@/assets/image/layout/menu.png"
        />
        <div class="down-menu" v-if="isShowMenu">
          <div
            class="menu-item"
            @click="handleMenuItem('昌治九安')"
            :class="{ active: currentMenu === '昌治九安' }"
          >
            <svg-icon icon-class="home" class="svg-icon" />
            昌治久安
          </div>
          <div
            class="menu-item"
            @click="handleMenuItem('VR地图')"
            :class="{ active: currentMenu === 'VR地图' }"
          >
            <svg-icon icon-class="map" class="svg-icon" />
            VR地图
          </div>
          <div
            class="menu-item"
            @click="handleMenuItem('修改密码')"
            :class="{ active: currentMenu === '修改密码' }"
          >
            <svg-icon icon-class="editpas" class="svg-icon" />
            修改密码
          </div>
          <div
            class="menu-item"
            @click="showAuthority"
            :class="{ active: currentMenu === '系统设置' }"
          >
            <svg-icon icon-class="set" class="svg-icon" />
            权限设置
          </div>
          <div
            class="menu-item"
            @click="handleMenuItem('退出')"
            :class="{ active: currentMenu === '退出' }"
          >
            <svg-icon icon-class="close-btn" class="svg-icon" />
            退出
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMenu: false,
      currentMenu: '',
      authority: false
    }
  },
  computed: {},
  methods: {
    changeProvince() {
      window.open(
        'http://172.11.2.6/module.jsp#workBench?isLogin=true',
        '_blank'
      )
    },
    nativeTo(path, query) {
      if (path.indexOf('admin') > -1) {
        if (path.indexOf('adminIntelligentService') > -1) {
          this.$store.commit(
            'asideRouters/SET_ADMINROUTERS',
            'intelligentService'
          )
        } else if (path.indexOf('adminIntelligentOffice') > -1) {
          this.$store.commit(
            'asideRouters/SET_ADMINROUTERS',
            'intelligentOffice'
          )
        }
      }
      // 跳转页面
      this.$router.push({
        path: path,
        query
      })
      // 智辅决策
      if (path === '/intelligentDecisionMaking/dataCockpit') {
        this.$EventBus.$emit('update:iframeVisible', false)
      }
    },
    // 退出登录
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu
    },
    handleMenuItem(item) {
      this.currentMenu = item
      if (item === '退出') {
        this.logout()
      } else if (item === '昌治九安') {
        this.$router.push('/')
      } else if (item === 'VR地图') {
        this.$router.push('/VRHome')
      }
    },
    showAuthority() {
      this.$emit('showAuthority', true)
    },
    handleClose() {
      this.isShowMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-nav {
  position: fixed;
  z-index: 999;
  margin: 0px 40px;
  width: calc(100% - 80px);
  height: 70px;
  .province-btns {
    position: absolute;
    top: 28px;
    left: -25px;
    width: 97px;
    height: 37px;
    background: url("~@/assets/image/layout/spticon.png") no-repeat;
    background-size: 100% 100%;
  }
  .nav-bg {
    width: 1128px;
    height: 67px;
    background: url("~@/assets/image/layout/head-nav-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    padding: 15px;

    .nav-title {
      font-size: 32px;
      font-weight: 600;
      background-image: -webkit-linear-gradient(bottom, #4fa2ff, #d7eaff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .nav-left,
  .nav-right {
    position: absolute;
    display: flex;
    top: 26px;
  }

  .nav-left {
    left: 150px;
    .link {
      width: 144px;
      height: 41px;
      margin: 0;
      font-size: 21px;
      font-weight: 600;
      line-height: 41px;
      text-align: center;
      color: #8fc4ff;
      background: url("~@/assets/image/layout/nav-item-bg1.png") no-repeat;
      background-size: 100% 100%;
      text-decoration: none;
      cursor: pointer;
      span {
        background: linear-gradient(to bottom, #bce6ff 0%, #57a7ff 100%);
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
      }
      &.active {
        color: #fff;
        background: url("~@/assets/image/layout/nav-item-active-bg1.png")
          no-repeat;
        background-size: 100% 100%;
        span {
          background: linear-gradient(to bottom, #fcfeff 0%, #cfefff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
  .nav-right {
    right: 150px;
    .link {
      width: 144px;
      height: 41px;
      margin: 0;
      font-size: 21px;
      font-weight: 600;
      line-height: 41px;
      text-align: center;
      color: #8fc4ff;
      background: url("~@/assets/image/layout/nav-item-bg2.png") no-repeat;
      background-size: 100% 100%;
      text-decoration: none;
      cursor: pointer;
      span {
        background: linear-gradient(to bottom, #bce6ff 0%, #57a7ff 100%);
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
      }
      &.active {
        color: #fff;
        background: url("~@/assets/image/layout/nav-item-active-bg2.png")
          no-repeat;
        background-size: 100% 100%;
        span {
          background: linear-gradient(to bottom, #fcfeff 0%, #cfefff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

  .control-right-btns {
    position: absolute;
    right: 0px;
    top: 26px;
    display: flex;
    .btn {
      width: 38px;
      height: 38px;
      margin-right: 14px;
      cursor: pointer;
      &:hover {
        filter: brightness(1.2);
      }
    }
  }

  .menu-box {
    position: relative;
    .down-menu {
      position: absolute;
      left: -122px;
      top: 55px;
      z-index: 99;
      background-color: #00285b;
      width: 160px;
      color: #a1d0ff;
      border-radius: 10px;
      .menu-item {
        height: 60px;
        line-height: 60px;
        text-align: center;
        &:hover {
          background-color: #084495;
        }

        &.active {
          background-color: #084495;
        }
      }
    }
  }
}
</style>
