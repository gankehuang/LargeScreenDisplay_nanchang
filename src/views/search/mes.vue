<template>
  <div class="out-bg">
    <div class="modal">
      <div class="tabs">
        <div
          v-for="(item, index) in tabs"
          :key="index"
          :class="item.id == tab ? 'tab active' : 'tab'"
          @click="change(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="btn-close" @click="bindBtnClose">
        <i class="el-icon-close"></i>
      </div>
      <div class="basic" v-if="tab == 0">
        <div class="item" v-if="list.name">
          <div class="img">
            <!-- <CustomImage
              v-if="list.photoUrl"
              :src="list.photoUrl"
              :preview-src-list="[list.photoUrl]"
            /> -->
            <el-image
              v-if="list.photoUrl"
              :src="list.photoUrl"
              :preview-src-list="[list.photoUrl]"
            />
            <img v-else src="@/assets/image/search/avatar.png" alt="" />
          </div>
          <div class="mes">
            <div class="mes-bottom">
              <div class="mes-flex">
                <div class="flex-item">
                  <span>姓名: </span>
                  {{ list.name | hideName }}
                </div>
                <div class="flex-item">
                  <span>管理类别: </span>
                  {{ showStatus(list.manageCategory) }}
                </div>
              </div>
              <div class="mes-flex">
                <div class="flex-item">
                  <span>联系电话: </span>
                  {{ list.phone | hidePhone }}
                </div>
                <div class="flex-item">
                  <span>身份证号: </span>
                  {{ list.idNumber | hideIdCard }}
                </div>
              </div>
              <div class="mes-flex">
                <div class="flex-item">
                  <span>详细住址: </span>
                  {{ list.curResidenceAddress }}
                </div>
              </div>
              <div class="mes-flex">
                <div class="flex-item">
                  <span>户籍地址: </span>
                  {{ list.residenceAddress }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="none">
          暂无数据
        </div>
      </div>
      <div class="basic room" v-if="tab == 1">
        <div v-if="roomList.length > 0">
          <div v-for="(item, index) in roomList" :key="index" class="item">
            <div class="mes">
              <div class="mes-bottom">
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>所属小区: </span>
                    {{ item.communityName }}
                  </div>
                  <div class="flex-item">
                    <span>业主姓名: </span>
                    {{ item.room.ownerName | hideName }}
                  </div>
                  <div class="flex-item">
                    <span>房屋类别: </span>
                    {{ item.room.houseCategoryText }}
                  </div>
                  <div class="flex-item">
                    <span>房屋面积: </span>
                    {{ item.room.houseAcreage }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>楼宇名称: </span>
                    {{ item.room.buildingName }}
                  </div>
                  <div class="flex-item">
                    <span>与户主关系: </span>
                    {{ item.householdRelationshipText }}
                  </div>
                  <div class="flex-item">
                    <span>房屋性质: </span>
                    {{ item.room.housePropertyText }}
                  </div>
                  <div class="flex-item">
                    <span>使用形式: </span>
                    {{ item.room.useFormText }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>房间编号: </span>
                    {{ item.room.roomNumber }}
                  </div>
                  <div class="flex-item">
                    <span>房屋入住人数: </span>
                    {{ item.room.peopleCount }}
                  </div>
                  <div class="flex-item">
                    <span>房屋用途: </span>
                    {{ item.room.houseUseText }}
                  </div>
                  <div class="flex-item">
                    <span>登记时间: </span>
                    {{
                      item.createTime ? item.createTime.substring(0, 10) : ""
                    }}
                  </div>
                </div>
                <div class="mes-flex">
                  <div class="flex-item">
                    <span>详细住址: </span>
                    {{ item.room.wholeAddr }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="none">
          暂无数据
        </div>
      </div>
      <div class="basic car" v-if="tab === 2">
        <div v-if="carList.length > 0">
          <div v-for="(item, index) in carList" :key="index" class="item">
            <div class="img">
              <CustomImage
                v-if="list.vehiclePhotoUrl"
                :src="list.vehiclePhotoUrl"
                :preview-src-list="[item.vehiclePhotoUrl]"
              />
              <!-- <img v-if="item.vehiclePhotoUrl" :src="item.vehiclePhotoUrl" alt=""> -->
              <img v-else src="@/assets/image/search/car.png" alt="" />
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
                    {{ item.phone | hidePhone }}
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
        <div v-else class="none">
          暂无数据
        </div>
      </div>
      <div class="basic" v-if="tab === 3">
        <div class="echartLayout">
          <div
            id="container"
            ref="echa"
            style="width:100%; height:600px; overflow:hidden;"
          ></div>
        </div>
        <Popup title="个人信息" v-if="showMessage1">
          <div class="pop">
            <el-form>
              <el-form-item>
                <span>
                  联系电话
                </span>
                {{ info.phone | hidePhone }}
              </el-form-item>
              <el-form-item>
                <span>
                  身份证号
                </span>
                {{ info.serialNumber | hideIdCard }}
              </el-form-item>
              <el-form-item>
                <span>
                  管理类别
                </span>
                {{ info.idno }}
              </el-form-item>
              <el-form-item>
                <span>
                  小区名称
                </span>
                {{ info.snapshotSite }}
              </el-form-item>
              <el-form-item>
                <span>
                  房屋名称
                </span>
                {{ info.direction == 0 ? "进" : "出" }}
              </el-form-item>
              <!-- <el-form-item>
                <span>
                  详细地址
                </span>
                {{ info.deviceName }}
              </el-form-item> -->
              <el-form-item>
                <span>
                  登记时间
                </span>
                {{ info.latitude }},{{ info.longitude }}
              </el-form-item>
              <el-form-item>
                <span>
                  详细住址
                </span>
                {{ info.shootTime }}
              </el-form-item>
              <el-form-item>
                <span>
                  户籍地址
                </span>
                {{ info.shootTime }}
              </el-form-item>
            </el-form>
            <div class="img">
              <img :src="info.imageUrl" alt="" />
            </div>
            <el-button @click="showMessage = false"
type="primary"
              >关闭</el-button
            >
          </div>
        </Popup>
        <div v-if="chartData.length == 0" class="none">
          暂无数据
        </div>
      </div>
      <div class="basic record" v-if="tab == 4">
        <div v-if="recordsList.length > 0">
          <div class="search-time">
            <span>通行时间:</span>
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="开始时间"
              value-format="yyyy-MM-dd"
            />
            <span>至</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
            <el-button @click="getList" type="primary">查询</el-button>
          </div>
          <div class="list">
            <div v-for="(item, index) in recordsList" :key="index" class="item">
              <div class="img">
                <CustomImage
                  v-if="item.accessImgUrl"
                  :src="item.accessImgUrl"
                  :preview-src-list="[item.accessImgUrl]"
                />
                <!-- <img :src="item.accessImgUrl" alt=""> -->
                现场抓拍照片
              </div>
              <div class="mes">
                <div class="mes-bottom">
                  <div class="mes-flex">
                    <div class="flex-item">
                      <span>通行地点: </span>
                      {{ item.accessPlace }}
                    </div>
                  </div>
                  <div class="mes-flex">
                    <div class="flex-item">
                      <span>进出时间: </span>
                      {{ item.accessTime }}
                    </div>
                  </div>
                  <div class="mes-flex">
                    <div class="flex-item">
                      <span>进出方式: </span>
                      {{ item.accessType == "0" ? "进" : "出" }}
                    </div>
                  </div>
                  <div class="mes-flex">
                    <div class="flex-item">
                      <span>开门方式: </span>
                      {{ item.interactiveType == "01" ? "人脸识别" : "其他" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination1">
            <el-pagination
              :current-page.sync="pageNum"
              @current-change="getList"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <div v-else class="none">
          暂无数据
        </div>
      </div>
      <div class="basic catch" v-if="tab == 5">
        <div v-if="catchList.length > 0">
          <div class="search-time">
            <span>抓拍时间:</span>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <span>至</span>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <el-button @click="getList" type="primary">查询</el-button>
          </div>
          <div class="list">
            <div v-for="(item, index) in catchList" :key="index" class="item">
              <div class="img">
                <!-- <img :src="item.imageUrl" alt=""> -->
                <CustomImage
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  :preview-src-list="[item.imageUrl]"
                />
              </div>
              <div class="mes">
                <div class="mes-bottom">
                  <div class="mes-flex">
                    <div
                      class="flex-item"
                      style="position: relative;height: 144px;"
                    >
                      <span
                        style="display: block;text-align: left;width: 150px; white-space: nowrap;overflow: hidden;text-overflow:ellipsis;line-clamp: 2;"
                        >{{ item.cameraName }}
                      </span>
                      {{ item.gridSubPath }}
                      <p>{{ item.shootTime }}</p>
                      <el-button
                        style="position: absolute;bottom: 20px; left: 0;"
                        @click="pop(item)"
                        type="primary"
                        >查看详情</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination1">
            <el-pagination
              :current-page.sync="pageNum"
              @current-change="getList"
              page-size="9"
              layout="total, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
          <Popup title="抓拍信息" v-if="showMessage">
            <div class="pop">
              <el-form>
                <el-form-item>
                  <span>
                    设备名称
                  </span>
                  {{ info.cameraName }}
                </el-form-item>
                <el-form-item>
                  <span>
                    设备编号
                  </span>
                  {{ info.cameraIndexCode }}
                </el-form-item>
                <!-- <el-form-item>
                  <span>
                    采集编号
                  </span>
                  {{ info.idno }}
              </el-form-item> -->
                <el-form-item>
                  <span>
                    抓拍地点
                  </span>
                  {{ info.gridSubPath }}
                </el-form-item>
                <!-- <el-form-item>
                  <span>
                    进出方向
                  </span>
                  {{ info.direction  == 0? '进' : '出' }}
                </el-form-item> -->
                <!-- <el-form-item>
                  <span>
                    详细地址
                  </span>
                  {{ info.deviceName }}
                </el-form-item> -->
                <el-form-item>
                  <span>
                    地理坐标
                  </span>
                  {{ info.latitude }},{{ info.longitude }}
                </el-form-item>
                <el-form-item>
                  <span>
                    抓拍时间
                  </span>
                  {{ info.shootTime }}
                </el-form-item>
              </el-form>
              <div class="img">
                <CustomImage
                  v-if="info.imageUrl"
                  :src="info.imageUrl"
                  :preview-src-list="[info.imageUrl]"
                />
              </div>
              <el-button @click="showMessage = false"
type="primary"
                >关闭</el-button
              >
            </div>
          </Popup>
        </div>
        <div v-else class="none">
          暂无数据
        </div>
      </div>
      <div class="basic alarm" v-if="tab == 6">
        <div v-if="alarmList.length > 0">
          <div class="search-time">
            <span>告警时间:</span>
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="开始时间"
              value-format="yyyy-MM-dd"
            />
            <span>至</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
            <el-button @click="getList" type="primary">查询</el-button>
          </div>
          <div class="list">
            <div v-for="(item, index) in alarmList" :key="index" class="item">
              <div class="img">
                <div class="img-tip">
                  <!-- <img :src="item.snapImageUrl" alt=""> -->
                  <CustomImage
                    v-if="item.snapImageUrl"
                    :src="item.snapImageUrl"
                    :preview-src-list="[item.snapImageUrl]"
                  />
                  <div>
                    抓拍
                  </div>
                </div>
                <div class="img-tip db">
                  <CustomImage
                    v-if="item.originImageUrl"
                    :src="item.originImageUrl"
                    :preview-src-list="[item.originImageUrl]"
                  />
                  <!-- <img :src="item.originImageUrl" alt=""> -->
                  <div>
                    对比
                  </div>
                </div>
                <div class="point">{{ item.similarity }}%</div>
              </div>
              <div class="mes">
                <div class="mes-bottom">
                  <div class="mes-flex">
                    <div class="flex-item">
                      <span>{{ item.reporter }} </span>
                      {{ item.sourceText }}
                      <p>{{ item.happenedTime }}</p>
                      <span>{{ item.gridName }} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination1">
            <el-pagination
              :current-page.sync="pageNum"
              @current-change="getList"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <div v-else class="none">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import imgSrc from '../../assets/image/search/search-avatar.png'
import {
  getCarList,
  getRoomList,
  getPopulationList,
  getAccessList,
  getSnapList,
  getEventList,
  getRelationList
} from '@/api/search/search'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    idNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myChart: null,
      chartData: [],
      chartLink: [],
      tab: 0,
      startTime: '',
      endTime: '',
      info: {},
      showMessage: false,
      showMessage1: false,
      list: [],
      pageNum: 1,
      pageSize: 6,
      total: 0,
      roomList: [],
      carList: [],
      recordsList: [],
      catchList: [],
      alarmList: [],
      tabs: [
        {
          id: 0,
          name: '基本信息'
        },
        {
          id: 1,
          name: '房屋信息'
        },
        {
          id: 2,
          name: '车辆信息'
        },
        {
          id: 3,
          name: '人员关系'
        },
        {
          id: 4,
          name: '通行记录'
        },
        {
          id: 5,
          name: '抓拍记录'
        },
        {
          id: 6,
          name: '告警记录'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    change(id) {
      this.tab = id
      this.startTime = ''
      this.endTime = ''
      this.pageNum = 1
      this.showMessage = false
      this.getList()
    },
    pop(item) {
      this.showMessage = true
      this.info = item
    },
    async getList() {
      switch (this.tab) {
        case 0:
          await getPopulationList({ id: this.id }).then(res => {
            if (res.status === 200) {
              this.list = res.data
            }
          })
          break
        case 1:
          await getRoomList({ populationId: this.id }).then(res => {
            if (res.status === 200) {
              this.roomList = res.data
            }
          })
          break
        case 2:
          await getCarList({ idNumber: this.idNumber }).then(res => {
            if (res.status === 200) {
              this.carList = res.data
            }
          })
          break
        case 3:
          this.$nextTick(function() {
            this.initEchart()
          })
          break
        case 4:
          await getAccessList(this.pageNum, this.pageSize, {
            idNumber: this.idNumber,
            startTime: this.startTime,
            endTime: this.endTime
          }).then(res => {
            if (res.status === 200) {
              this.recordsList = res.data.list
              this.total = res.data.total
            }
          })
          break
        case 5:
          const data = new FormData()
          data.append('certificateNumber', this.idNumber)
          data.append('startTime', this.startTime)
          data.append('endTime', this.endTime)
          await getSnapList(this.pageNum, 9, data).then(res => {
            if (res.status === 200) {
              this.catchList = res.data.list
              this.total = res.data.total
            }
          })
          break
        case 6:
          await getEventList(this.pageNum, this.pageSize, {
            idNumber: this.idNumber,
            startTime: this.startTime,
            endTime: this.endTime
          }).then(res => {
            if (res.status === 200) {
              this.alarmList = res.data.list
              this.total = res.data.total
            }
          })
          break
        default:
          break
      }
    },
    bindBtnClose() {
      this.$emit('bindBtnClose')
    },
    async initEchart() {
      const dom = this.$refs.echa
      this.myChart = echarts.init(dom)
      await getRelationList({ id: this.id, idNumber: this.idNumber }).then(
        res => {
          if (res.status === 200) {
            this.chartData = [
              {
                category: 0,
                name: '李斯珏',
                value: 10,
                label: '李斯珏\n（主要）'
              },
              { category: 1, name: '李斯仪', value: 2 },
              { category: 1, name: '张宇', value: 3 },
              { category: 1, name: '李玉', value: 3 },
              { category: 1, name: '吴武', value: 7 },
              { category: 2, name: '史诗', value: 5 },
              { category: 2, name: '林飞', value: 8 },
              { category: 2, name: '赵琳', value: 9 },
              { category: 2, name: '罗茜', value: 4 },
              { category: 2, name: '宋轶', value: 4 },
              { category: 2, name: '周瑜', value: 1 }
            ]
            this.chartLink = [
              { source: '李斯仪', target: '李斯珏', value: '女儿' },
              { source: '张宇', target: '李斯珏', value: '父亲' },
              { source: '李玉', target: '李斯珏', value: '母亲' },
              { source: '吴武', target: '李斯珏', value: '女儿' },
              { source: '史诗', target: '李斯珏', value: '合伙人' },
              { source: '林飞', target: '李斯珏', weight: 1, value: '合伙人' },
              {
                source: '赵琳',
                target: '李斯珏',
                weight: 2,
                value: '竞争对手'
              },
              { source: '罗茜', target: '李斯珏', weight: 1, value: '爱将' },
              { source: '宋轶', target: '李斯珏', weight: 3, value: '邻居' },
              { source: '周瑜', target: '李斯珏', weight: 1, value: '儿子' },
              { source: '李斯仪', target: '张宇', weight: 2, value: '兄妹' },
              { source: '李斯仪', target: '李玉', weight: 1, value: '同事' },
              // {source : '林飞', target : '李玉', weight : 1},
              // {source : '林飞', target : '吴武', weight : 1},
              // {source : '林飞', target : '史诗', weight : 1},
              // {source : '赵琳', target : '林飞', weight : 6},
              { source: '赵琳', target: '李玉', weight: 1, value: '舅舅' },
              { source: '宋轶', target: '林飞', weight: 1, value: '舅妈' }
            ]
          }
        }
      )
      const option = {
        tooltip: {
          show: false
        },
        series: [
          {
            edgeLabel: {
              normal: {
                formatter: '{c}',
                show: true
              }
            },
            edgeSymbol: 'circle',
            force: {
              repulsion: 2500,
              color: '#44B2F8'
            },
            layout: 'force',
            roam: true,
            itemStyle: {
              normal: {
                color: '#6495ED'
              },
              // 鼠标放上去有阴影效果
              emphasis: {
                shadowColor: '#43B2F8',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40
              }
            },
            label: {
              normal: {
                show: true
              }
            },
            // 头像
            symbol: `image://${imgSrc}`,
            symbolSize: 80,
            type: 'graph',
            links: this.chartLink,
            data: this.chartData
          }
        ]
      }
      this.myChart.setOption(option)
      this.myChart.on('click', function(params) {
        this.showMessage1 = true
        this.info = params.data
      })
    },
    // async dataEChart(nodeList){
    //     let data1 = nodeList
    //     return data1;
    // },
    /**
     * 关系数据集合
     */
    linkEChart(edgeList) {
      const dataLink = []
      for (let i = 0; i < edgeList.length; i++) {
        dataLink.push({
          value: edgeList[i].relationName,
          source: edgeList[i].source.id,
          target: edgeList[i].target.id
        })
      }
      console.log('dataLink', dataLink)
      // let dataLink=[
      //     {value: "同事",source: "1",target: "2"},
      //     {value: "同事",source: "1",target: "3"},
      //     {value: "同事",source: "1",target: "4"},
      //     {value: "同学",source: "1",target: "5"},
      //     {value: "同学",source: "1",target: "6"},
      //     {value: "同学",source: "1",target: "7"},
      //     {value: "爸爸",source: "1",target: "8"},
      // ];
      return dataLink
    },
    showStatus(status) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.out-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(3, 34, 60, 0.9);
  z-index: 100;
  .modal {
    position: absolute;
    background: url("~@/assets/image/search/search-bg.png");
    width: 1030px;
    height: 786px;
    padding: 26px 36px 0;
    top: 50%;
    left: 50%;
    font-size: 14px;
    transform: translate(-50%, -50%);
    z-index: 3;
    .btn-close {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 34px;
      right: 30px;
      font-size: 16px;
      color: #00ffff;
      z-index: 3;
      cursor: pointer;
    }
    .tabs {
      display: flex;
      font-size: 16px;
      color: #fff;
      line-height: 38px;
      border-bottom: 1px solid #024081;
      .tab {
        position: relative;
        margin-right: 40px;
        cursor: pointer;
      }
      .tab:hover {
        // color: #024081;
      }
      .active::after {
        content: "";
        position: absolute;
        top: 37px;
        left: 0px;
        width: 64px;
        height: 6px;
        background: url("~@/assets/image/search/search-after.png") no-repeat
          center;
      }
    }
    .basic {
      width: 958px;
      margin: 40px auto 0;
      .item {
        height: 172px;
        margin-bottom: 40px;
        display: flex;
        background: url("~@/assets/image/search/search-bg1.png") no-repeat
          center;
        background-size: 100% 100%;
        .img {
          padding: 18px 36px 0;
          img {
            width: 112px;
            height: 136px;
          }
          .el-image {
            width: 112px;
            height: 136px;
          }
        }
        .mes {
          flex: 1;
          .mes-bottom {
            margin-top: 16px;
            .mes-flex {
              display: flex;
              .flex-item {
                flex: 1;
                line-height: 36px;
                font-size: 16px;
                color: #01aae5;
                span {
                  display: inline-block;
                  // width: 74px;
                  text-align: right;
                  color: #fff;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
    }
    .room {
      .item {
        padding-left: 20px;
        .mes-flex {
          .flex-item:nth-child(2) {
            span {
              width: 100px;
            }
          }
        }
      }
    }
    .car {
      .item {
        height: 156px;
        .mes {
          .mes-bottom {
            margin-top: 28px;
          }
        }
        .img {
          padding: 24px 36px 0;
          img {
            width: 155px;
            height: 108px;
          }
          .el-image {
            width: 155px;
            height: 108px;
          }
        }
      }
    }
    .search-time {
      line-height: 36px;
      font-size: 16px;
      color: #17cbf8;
      margin-bottom: 20px;
      span {
        padding: 0 10px;
      }
      .el-button {
        margin-left: 20px;
        border: 1px solid #17cbf8;
        color: #17cbf8;
        background: none;
      }
    }
    .pagination1 {
      position: absolute;
      bottom: 10px;
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
    .record {
      margin-top: 20px;
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 458px;
          height: 164px;
          .img {
            padding-top: 24px;
            line-height: 38px;
            font-size: 14px;
            color: #16d0ff;
            text-align: center;
            img {
              display: block;
              width: 96px;
              height: 92px;
            }
            .el-image {
              display: block;
              width: 96px;
              height: 92px;
            }
          }
        }
      }
    }
    .alarm {
      margin-top: 20px;
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 458px;
          height: 164px;
          .img {
            position: relative;
            width: 272px;
            display: flex;
            justify-content: space-between;
            padding: 18px 28px 0;
            padding-top: 24px;
            line-height: 38px;
            font-size: 14px;
            color: #16d0ff;
            text-align: center;
            .img-tip {
              position: relative;
              img {
                width: 96px;
                height: 128px;
              }
              .el-image {
                width: 96px;
                height: 128px;
              }
              div {
                position: absolute;
                bottom: 12px;
                left: 0;
                width: 66px;
                height: 20px;
                line-height: 20px;
                font-size: 16px;
                color: #fff;
                background: url("~@/assets/image/search/zp.png") no-repeat
                  center;
                background-size: 100% 100%;
              }
            }
            .db {
              div {
                background: url("~@/assets/image/search/db.png") no-repeat
                  center;
              }
            }

            .point {
              position: absolute;
              left: 37%;
              top: 30%;
              width: 70px;
              height: 70px;
              line-height: 70px;
              font-size: 16px;
              color: #21d0fc;
              text-align: center;
              background: url("~@/assets/image/search/point-bg.png") no-repeat
                center;
              background-size: 100% 100%;
            }
          }
          .mes {
            .mes-bottom {
              .mes-flex {
                .flex-item {
                  margin-top: 6px;
                  line-height: 28px;
                  font-size: 14px;
                  span {
                    display: block;
                    text-align: left;
                    margin-right: 0 !important;
                    font-size: 16px;
                  }
                  p {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
    .catch {
      margin-top: 20px;
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 282px;
          height: 164px;
          .img {
            padding: 18px 11px 18px 18px;
            img {
              width: 98px;
              height: 128px;
            }
            .el-image {
              width: 98px;
              height: 128px;
            }
          }
          .mes-bottom {
            .mes-flex {
              .flex-item {
                line-height: 24px;
                font-size: 14px;
                span {
                  margin-right: 0 !important;
                  font-size: 16px;
                }
                p {
                  color: #fff;
                }
                .el-button {
                  width: 72px;
                  height: 24px;
                  line-height: 7px;
                  padding: 9px 12px;
                  text-align: center;
                  font-size: 12px;
                  color: #3699ff;
                  border: 1px solid #3699ff;
                  background: none;
                  margin-top: 10px;
                  border-radius: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
.none {
  margin: 0 auto;
  font-size: 24px;
  color: #fff;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.form-container {
  margin-top: 50px;
  background: rgb(3, 34, 60);
  /* box-shadow: 10px rgba(3, 34, 60, 0.9); */
}
/deep/.el-form-item__content {
  span {
    color: #fff;
    margin-right: 20px;
  }
  color: #01aae5;
}
.pop {
  position: relative;
  .img {
    position: absolute;
    top: 20px;
    right: 20px;
    img {
      width: 112px;
      height: 136px;
    }
    .el-image {
      width: 112px;
      height: 136px;
    }
  }
  /deep/.el-button {
    position: absolute;
    right: 20px;
    bottom: 0px;
    border: 1px solid #01aae5;
    color: #01aae5;
    background: none;
  }
}
</style>
