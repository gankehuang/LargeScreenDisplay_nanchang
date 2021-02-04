<template>
  <div class="grid-management">
    <div class="title">
      网格管理
    </div>
    <ul>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ gridMembers }}</span>
        </div>
        <div class="label">
          网格员
        </div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ grid }}</span>
        </div>
        <div class="label">
          网格总数
        </div>
      </li>
      <li>
        <div class="icon" />
        <div class="data">
          <span>{{ gridMixs }}</span>
        </div>
        <div class="label">
          网格融入
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { queryGridGeneral } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      grid: 0,
      gridMembers: 0,
      gridMixs: 0,
      code: '3601'
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted () {
    this.handleQueryOrgGeneral()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryOrgGeneral()
    })
  },
  methods: {
    async handleQueryOrgGeneral () {
      try {
        const { status, data } = await queryGridGeneral({
          gridCode: this.code
        })
        if (status === 200) {
          data.forEach(item => {
            switch (item.name) {
              case 'grid':
                this.grid = item.num
                break
              case 'gridAdmin':
                this.gridMembers = item.num
                break
              case 'gridFuse':
                this.gridMixs = item.num
                break
              default:
                break
            }
          })
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-management {
  width: 425px;
  height: 280px;
  //   margin: 5px;
  background: url("~@/assets/image/dataView/data-view-ground-modal.png") center
    center / 100% 100% no-repeat;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 5px 0 0 25px;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      width: 97px;
      height: 90px;
      margin: 30px 0 10px;
    }
    .data {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      line-height: 24px;
      span:nth-of-type(1) {
        font-size: 26px;
        font-weight: bold;
        line-height: 24px;
        display: inline-block;
        margin-right: 5px;
      }
    }
    .label {
      color: #ffffff;
      font-size: 17px;
      line-height: 28px;
    }
  }
  li:nth-of-type(1) {
    .icon {
      background: url("~@/assets/image/dataView/wgzs.png") center center / 100%
        100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #189aff;
      }
    }
  }
  li:nth-of-type(2) {
    .icon {
      background: url("~@/assets/image/dataView/wgys.png") center center / 100%
        100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #80f4e7;
      }
    }
  }
  li:nth-of-type(3) {
    .icon {
      background: url("~@/assets/image/dataView/wgrhs.png") center center / 100%
        100% no-repeat;
    }
    .data {
      span:nth-of-type(1) {
        color: #94d5fe;
      }
    }
  }
}
</style>
