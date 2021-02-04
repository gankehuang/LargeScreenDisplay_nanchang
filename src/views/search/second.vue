<template>
  <div
    v-loading="loading"
    class="search"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <Search
      :input1="input1"
      :select="type"
      width="958px"
      @search="searchStatus"
    />
    <div style="height: 80%">
      <el-scrollbar style="height: 100%;">
        <div
          v-if="type == 1 && list.length > 0"
          class="list"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="item"
          >
            <div class="img">
              <!-- <CustomImage
                style="width: 112px;height: 136px;"
                v-if="item.photoUrl && item.photoUrl !='无'"
                :preview-src-list="[item.photoUrl]"
                :src="item.photoUrl"
              /> -->
              <el-image
                v-if="item.photoUrl && item.photoUrl != '无'"
                style="width: 112px;height: 136px;"
                :preview-src-list="[item.photoUrl]"
                :src="item.photoUrl"
              />
              <img
                v-else
                src="~@/assets/image/search/avatar.jpg"
                alt=""
              >
            </div>
            <div class="mes">
              <div class="name">
                {{ item.name }}
                <!-- <span>
              {{ item.type }}
            </span> -->
                <div
                  class="check"
                  @click="search(item.id, item.idNumber)"
                >
                  查看多维信息
                </div>
              </div>
              <div class="mes-bottom">
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>身份证号: </span>
                    {{ item.idNumber | hideIdCard }}
                  </div>
                  <div class="flex-item">
                    <span>出生年月: </span>
                    {{ item.birthday }}
                  </div>
                  <div class="flex-item">
                    <span>性别: </span>
                    {{ item.genderText }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>联系电话: </span>
                    {{ item.phone }}
                  </div>
                  <div class="flex-item">
                    <span>管理类别: </span>
                    {{ showStatus(item.manageCategory) }}
                  </div>
                  <div class="flex-item">
                    <span>登记时间: </span>
                    {{ item.createTime }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>居住地址: </span>
                    {{ item.curResidenceAddress }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>户籍地址: </span>
                    {{ item.residenceAddress }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="type == 2 && unitList.length > 0"
          class="list"
        >
          <div
            v-for="(item, index) in unitList"
            :key="index"
            class="item"
          >
            <div class="img">
              <img
                :src="item.photoUrl"
                alt=""
              >
            </div>
            <div class="mes">
              <div class="name">
                {{ item.name }}
                <!-- <span>
              {{ item.type }}
            </span> -->
                <div
                  class="check"
                  @click="search(item.id)"
                >
                  查看多维信息
                </div>
              </div>
              <div class="mes-bottom">
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>身份证号: </span>
                    {{ item.idNumber | hideIdCard }}
                  </div>
                  <div class="flex-item">
                    <span>出生年月: </span>
                    {{ item.birthday }}
                  </div>
                  <div class="flex-item">
                    <span>性别: </span>
                    {{ item.genderText }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>联系电话: </span>
                    {{ item.phone }}
                  </div>
                  <div class="flex-item">
                    <span>管理类别: </span>
                    {{ showStatus(item.manageCategory) }}
                  </div>
                  <div class="flex-item">
                    <span>登记时间: </span>
                    {{ item.createTime }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>居住地址: </span>
                    {{ item.curResidenceAddress }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>户籍地址: </span>
                    {{ item.residenceAddress }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="type == 3 && list.length > 0"
          class="list car"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="item"
          >
            <div class="img">
              <CustomImage
                v-if="item.vehiclePhotoUrl && item.vehiclePhotoUrl != '无'"
                style="width: 155px;height: 108px;"
                :preview-src-list="[item.vehiclePhotoUrl]"
                :src="item.vehiclePhotoUrl"
              />
              <img
                v-else
                src="~@/assets/image/search/car.png"
                alt=""
              >
            </div>
            <div class="mes">
              <div class="mes-bottom">
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>所属区域: </span>
                    {{ item.area }}
                  </div>
                  <div class="flex-item">
                    <span>所属网格: </span>
                    {{ item.gridName }}
                  </div>
                  <div class="flex-item">
                    <span>车牌号码: </span>
                    {{ item.vehicleNumber }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>车主姓名: </span>
                    {{ item.populationName | hideName }}
                  </div>
                  <div class="flex-item">
                    <span>车辆状态: </span>
                    {{ item.status == 0 ? "正常" : "异常" }}
                  </div>
                  <div class="flex-item">
                    <span>号牌种类: </span>
                    {{ item.numberTypeText }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>车主电话: </span>
                    {{ item.phone }}
                  </div>
                  <div class="flex-item">
                    <span>车辆品牌: </span>
                    {{ item.brand }}
                  </div>
                  <div class="flex-item">
                    <span>登记时间: </span>
                    {{ item.createTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="
            loading == false && list.length == 0 && unitList.length == 0
          "
          class="list"
        >
          <div class="none">
            暂无数据
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="pagination1">
      <el-pagination
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="getList"
      />
    </div>
    <Mes
      v-if="display"
      :id="id"
      :id-number="idNumber"
      @bindBtnClose="display = false"
    />
  </div>
</template>
<script>
import Search from '@/components/search'
import Mes from './mes'
import {
  getSearchPeopleList,
  getSearchCarList,
  getSearchUnitList
} from '@/api/search/search'
export default {
  components: {
    Search,
    Mes
  },
  data () {
    return {
      display: false,
      id: '',
      idNumber: '',
      unitList: [],
      carList: [],
      list: [],
      pageNum: 1,
      pageSize: 4,
      total: 0,
      input1: this.$route.query.search,
      type: this.$route.query.id || '1',
      type1: '',
      input2: '',
      loading: true
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      const param = { keyWord: this.input1 }
      if (this.type !== this.type1 || this.input1 !== this.input2) {
        this.type1 = this.type
        this.input2 = this.input1
        this.pageNum = 1
      }
      switch (this.type) {
        case '1':
          await getSearchPeopleList(this.pageNum, this.pageSize, param).then(
            res => {
              if (res.status === 200) {
                this.loading = false
                this.list = res.data.list
                this.total = res.data.total
              }
            }
          )
          break
        case '2':
          await getSearchUnitList(this.pageNum, this.pageSize, param).then(
            res => {
              if (res.status === 200) {
                this.loading = false
                this.unitList = res.data.list
                this.total = res.data.total
              }
            }
          )
          break
        case '3':
          await getSearchCarList(this.pageNum, this.pageSize, param).then(
            res => {
              if (res.status === 200) {
                this.loading = false
                this.list = res.data.list
                this.total = res.data.total
                console.log('list', this.list)
              }
            }
          )
          break
        default:
          break
      }
      this.loading = false
    },
    showStatus (status) {
      switch (status) {
        case '006':
          return '户籍人口'
        case '002':
          return '流动人口'
        case '009':
          return '境外人口'
        default:
          break
      }
    },
    search (id, idNumber) {
      this.display = true
      this.id = id
      this.idNumber = idNumber
    },
    searchStatus (type, input1) {
      this.loading = true
      this.type = type
      this.input1 = input1
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  height: 100%;
  background: url("../../assets/image/search/search1.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  padding-top: 6%;
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .list {
    width: 958px;
    margin: 15px auto 0;
    .item {
      height: 184px;
      display: flex;
      .img {
        padding: 26px 14px 0;
        img {
          width: 112px;
          height: 136px;
        }
      }
      .mes {
        flex: 1;
        padding-top: 22px;
        .name {
          line-height: 24px;
          font-size: 18px;
          color: #01aae5;
          position: relative;
          span {
            line-height: 24px;
            font-size: 14px;
            padding: 0 8px;
            margin-left: 15px;
            color: #fff;
            background: #f8b652;
            border-radius: 4px;
          }
          .check {
            position: absolute;
            top: -10px;
            right: 20px;
            width: 143px;
            line-height: 39px;
            font-size: 14px;
            background: url("../../assets/image/search/search-button.png")
              no-repeat center;
            text-align: center;
            cursor: pointer;
          }
        }
        .mes-bottom {
          margin-top: 16px;
          .mes-flex {
            display: flex;
            .flex-item {
              flex: 1;
              line-height: 26px;
              font-size: 16px;
              color: #01aae5;
              span {
                color: #fff;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .item:nth-child(2n-1) {
      background: #024074;
    }
    .none {
      line-height: 120px;
      font-size: 38px;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
  }
  .car {
    .item {
      height: 156px;
      .mes {
        .mes-bottom {
          // margin-top: 28px;
        }
      }
      .img {
        padding: 24px 36px 0;
        img {
          width: 155px;
          height: 108px;
        }
      }
    }
  }
  .pagination1 {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 10px;
    line-height: 26px;
    font-size: 16px;
    color: #17cbf8;
    text-align: center;
    /deep/.number {
      color: #fff;
      background: none;
    }
    /deep/.el-pager li:hover {
      color: #17cbf8;
    }
    /deep/.active {
      color: #17cbf8;
    }
    /deep/.more {
      color: #fff;
      background: none;
    }
  }
}
</style>
