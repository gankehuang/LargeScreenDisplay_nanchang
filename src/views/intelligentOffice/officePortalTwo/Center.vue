<template>
  <div class="page-center">
    <!-- 工作动态 -->
    <div class="gzdt-container block-bg-container">
      <div class="title">
        工作动态
      </div>
      <svg-icon
        class="refresh-icon"
        icon-class="refresh"
      />
      <div class="content">
        <div class="carousel-container">
          <el-carousel
            height="160px"
            style="width: 264px"
            :autoplay="false"
          >
            <el-carousel-item
              v-for="(item, index) in carouselLsit"
              :key="index"
            >
              <!-- :preview-src-list="[item.image]" -->
              <el-image
                :src="item.image"
                @click="amplificationImg(item.image)"
              />
              <div
                class="carousel-info text-overflow"
                :title="item.title"
              >
                {{ item.title }}
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="info-container">
            <div class="title">
              黄喜忠市长到市综治中心调研
            </div>
            <div class="content text-overflows">
              11月18日上午，市长黄喜忠来到市综治中心，就市域社会治理工作进行调研。市委常委、政法委书记胡晓海、市委常委、副市长王万征参加。在市综治中心，黄喜忠详细听取了南昌市域社会治理应用平台介绍后指出，要进一步依托市综治中心平台，按照“科学、及时、有效、实用”的原则，充分整合各县（区）的资源力量，借鉴疫情期间联防联控、群防群治的经验做法，通过网格化，强化社区（村）和基层单位管理，努力实现市域社会治理源头管控和风险防范。
            </div>
            <div class="time">
              2020-11-12
            </div>
          </div>
        </div>
        <el-scrollbar class="list">
          <div
            v-for="(item, index) in gzdtList"
            :key="index"
            class="list-item"
          >
            <div
              class="list-content text-overflow"
              :title="item.title"
            >
              {{ item.title }}
            </div>
            <div class="list-time">
              {{ item.time }}
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div />
    <!-- 领导视察 -->
    <div class="ldsc-container block-bg-container">
      <div class="title">
        领导视察
      </div>
      <svg-icon
        class="refresh-icon"
        icon-class="refresh"
      />
      <el-scrollbar class="content">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="time-first-block"
        >
          <div class="line" />
          <div class="time-node-title">
            <div class="time">
              {{ item.time }}
            </div>
            <div class="node" />
            <div class="title">
              {{ item.title }}
            </div>
          </div>
          <!-- <div class="image-node">
            <div class="image-list">
              <el-image
                class="el-image"
                v-for="(item, index) in item.images"
                :key="index"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              />
            </div>
             <div class="node" />
          </div> -->
          <div class="image-list">
            <el-image
              v-for="(item, index) in item.images"
              :key="index"
              class="el-image"
              :src="item.imageUrl"
              :preview-src-list="[item.imageUrl]"
            />
          </div>
          <div class="info-node">
            <div class="node" />
            <div class="info">
              {{ item.info }}
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog
      title=""
      width="60%"
      :visible.sync="dialogTableVisible"
    >
      <img
        :src="workStatusImg"
        style="width: 100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import { leadershipInspectPage } from '@/api/adminIntelligentOffice/leaderInspection'
export default {
  data () {
    return {
      advancedForm: {
        name: '',
        inspectTime: '',
        inspectEndTime: ''
      },
      carouselLsit: [
        {
          title: '黄喜忠市长到市综治中心调研',
          image: require('@/assets/image/intelligentOffice/cur_01.png')
        }
        // {
        //   title: '新建区组织召开全区市域社会治理现代化试点 工作推进会',
        //   image: require('@/assets/image/intelligentOffice/xjq_01.png')
        // },
        // {
        //   title:
        //     '关注安全 生命至上----市行政审批局开展消防基本技能实操实训演练',
        //   image: require('@/assets/image/intelligentOffice/冬季消防4.jpg')
        // },
        // {
        //   title: '红谷滩区扫黑除恶专项斗争推进会召开',
        //   image: require('@/assets/image/intelligentOffice/hgt_01.jpg')
        // }
      ],
      gzdtList: [
        {
          title: '东湖区召开提升公众安全感工作座谈会',
          time: '2020-11-26 15:52:55'
        },
        {
          title: '南昌市普铁沿线环境综合整治工作在全省率先完成',
          time: '2020-11-24 11:28:14'
        },
        {
          title: '南昌市委政法委副书记肯定全市寄递渠道安全监管工作',
          time: '2020-11-20 16:36:44'
        },
        {
          title: '安义县：网格员“秒变”普查员，为人口普查按下加速键 ',
          time: '2020-11-20 08:44:01'
        }
      ],
      list: [
        {
          time: '2020-11-24',
          title: '市委常委、政法委书记 胡晓海',
          info:
            '实地察看、详细了解东湖区市域社会治理现代化工作开展情况，并召开座谈会听取了该区相关工作情况汇报',
          images: [
            {
              imageUrl: require('@/assets/image/intelligentOffice/矩形 859 拷贝 2.png')
            },
            {
              imageUrl: require('@/assets/image/intelligentOffice/矩形 859 拷贝 2.png')
            },
            {
              imageUrl: require('@/assets/image/intelligentOffice/矩形 859 拷贝 2.png')
            }
          ]
        },
        {
          time: '2020-11-24',
          title: '市委常委、政法委书记 胡晓海',
          info:
            '实地察看、详细了解东湖区市域社会治理现代化工作开展情况，并召开座谈会听取了该区相关工作情况汇报',
          images: [
            {
              imageUrl: require('@/assets/image/intelligentOffice/矩形 859 拷贝 2.png')
            },
            {
              imageUrl: require('@/assets/image/intelligentOffice/矩形 859 拷贝 2.png')
            },
            {
              imageUrl: require('@/assets/image/intelligentOffice/矩形 859 拷贝 2.png')
            }
          ]
        }
      ],
      dialogTableVisible: false,
      workStatusImg: ''
    }
  },
  mounted () {
    this.handleLeadershipInspectPage()
  },
  methods: {
    async handleLeadershipInspectPage () {
      try {
        if (this.dataList && this.dataList.length > 0) {
          this.advancedForm.inspectTime = this.dataList[0] + ' 00:00:00'
          this.advancedForm.inspectEndTime = this.dataList[1] + ' 23:59:59'
        } else {
          this.advancedForm.inspectTime = ''
          this.advancedForm.inspectEndTime = ''
        }
        const { status, data } = await leadershipInspectPage({
          pageNum: 1,
          pageSize: 100,
          name: this.advancedForm.name,
          inspectTime: this.advancedForm.inspectTime,
          inspectEndTime: this.advancedForm.inspectEndTime
        })
        if (status === 200) {
          console.log(data)
          this.handleData(data.list)
        }
      } catch (error) {}
    },
    handleData (arr) {
      this.list = arr.map(item => {
        return {
          time: item.inspectTime,
          title: item.post + '   ' + item.name,
          info: item.inspectTheme,
          images: [{ imageUrl: item.picture }]
          // subList: item.leadershipInspectDetailVOS,
        }
      })
    },
    amplificationImg (data) {
      this.dialogTableVisible = true
      this.workStatusImg = data
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-carousel__indicators--horizontal {
  display: none;
  bottom: 35px;
}
/deep/.el-image-viewer__btn {
  top: 100px;
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-dialog__header {
  padding: 0;
}
.page-center {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.block-bg-container {
  width: 683px;
  height: 401px;
  background: url("~@/assets/image/intelligentOffice/板块1 拷贝 5.png") center
    center / 100% 100% no-repeat;
  padding: 15px 0 0 27px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #3b9afe;
    line-height: 18px;
  }
  .refresh-icon {
    position: absolute;
    top: 25px;
    right: 25px;
    font-size: 16px;
    color: #4fa2ff;
  }
}
.gzdt-container {
  .content {
    margin-top: 20px;
    height: 350px;
    position: relative;
  }
  .carousel-container {
    width: 100%;
    display: flex;
  }
  .carousel-info {
    position: absolute;
    top: 125px;
    left: 0px;
    z-index: 10;
    width: 266px;
    height: 35px;
    line-height: 35px;
    background-color: rgba(32, 81, 181, 0.7);
    padding-left: 10px;
    color: #a9daff;
  }
  .info-container {
    width: 368px;
    height: 152px;
    background: url("~@/assets/image/intelligentOffice/矩形 862.png") center
      center / 100% 100% no-repeat;
    padding: 20px 0 0 18px;
    .title {
      color: #a9daff;
      font-size: 14px;
    }
    .content {
      margin-top: 10px;
      height: 60px;
      font-size: 12px;
      line-height: 20px;
      color: #73aeda;
    }
    .time {
      padding-right: 20px;
      text-align: right;
      color: #a9daff;
    }
  }
  .list {
    margin-top: 20px;
    height: 200px;
  }
  .list-item {
    width: 95%;
    height: 15px;
    line-height: 35px;
    display: flex;
    align-items: center;
    position: relative;
    border-left: 1px solid #3b9afe;
    padding-left: 10px;
    margin: 20px 0;
    .list-content {
      width: 70%;
      color: #a9daff;
    }
    .list-time {
      width: 25%;
      text-align: right;
      color: #3b9afe;
    }
  }
}

.ldsc-container {
  .content {
    margin-top: 20px;
    height: 330px;
    position: relative;
  }
  .time-first-block {
    width: 100%;
    height: 100%;
    color: #a9daff;
    margin: 0 0 20px;
    position: relative;
    .image-list {
      width: 100px;
      position: absolute;
      z-index: 999;
      .el-image {
        width: 118px;
        height: 74px;
        margin: 0 5px;
        margin-top: -20px;
        margin-bottom: 10px;
        padding: 1px;
        // 矩形 665 拷贝.png
        background: url("~@/assets/image/intelligentOffice/矩形 665 拷贝.png")
          center center / 100% 100% no-repeat;
      }
    }
    .line {
      position: absolute;
      top: 15px;
      left: 145px;
      width: 3px;
      height: 150%;
      background: #228de0;
    }
    .time-node-title {
      display: flex;
      position: relative;
      z-index: 1;
      line-height: 28px;
      margin-bottom: 30px;
      padding-right: 15px;
      .time,
      .title {
        white-space: pre-line;
        font-weight: bold;
      }
      .time {
        width: 140px;
      }
      .title {
        width: 400px;
        font-size: 14px;
        color: #a9daff;
        padding-top: 5px;
      }
      .node {
        width: 18px;
        height: 18px;
        position: relative;
        top: 5px;
        right: 2px;
        margin: 0 10px 0 0;
        background: url("~@/assets/image/intelligentOffice/椭圆 5.png") center
          center / 100% 100% no-repeat;
      }
    }
    .info-node {
      display: flex;
      position: relative;
      z-index: 1;
      margin-bottom: 35px;
      padding-right: 15px;
      .node {
        width: 15px;
        height: 15px;
        margin: 0 20px 0 139px;
        background: url("~@/assets/image/socialGovernment/time_line_modal(3).png")
          center center / 100% 100% no-repeat;
      }
      .info {
        width: 400px;
        font-size: 14px;
        line-height: 24px;
      }
    }
    .image-node {
      display: flex;
      position: relative;
      z-index: 10;
      margin-bottom: 30px;
      padding-right: 15px;
      .node {
        width: 15px;
        height: 15px;
        margin: 0px 20px 0 -261px;
        background: url("~@/assets/image/socialGovernment/time_line_modal(3).png")
          center center / 100% 100% no-repeat;
      }
    }
    .none {
      display: none;
    }
  }
}
</style>
