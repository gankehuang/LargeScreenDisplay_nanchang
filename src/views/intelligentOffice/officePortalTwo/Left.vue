<template>
  <div class="page-left">
    <!-- 通知公告 -->
    <div class="tzgg-container block-bg-container">
      <div class="title">通知公告</div>
      <svg-icon class="refresh-icon" icon-class="refresh" />
      <el-scrollbar class="list">
        <div class="list-item" v-for="(item, index) in tzggList" :key="index">
          <svg-icon class="list-icon" icon-class="notice" />
          <div class="list-content text-overflow" :title="item.title">
            {{ item.title }}
          </div>
          <div class="list-time">{{ item.time }}</div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 制度建设 -->
    <div class="zdjs-container block-bg-container">
      <div class="title">制度建设</div>
      <svg-icon class="refresh-icon" icon-class="refresh" />
      <el-scrollbar class="list">
        <div class="list-item" v-for="(item, index) in zdjsList" :key="index">
          <svg-icon class="list-icon" icon-class="list" />
          <div class="list-content text-overflow" :title="item.title">
            {{ item.title }}
          </div>
          <div class="list-time">{{ item.time }}</div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 他山之石 -->
    <div class="tszs-container block-bg-container">
      <div class="title">他山之石</div>
      <svg-icon class="refresh-icon" icon-class="refresh" />
      <el-scrollbar class="list">
        <div class="list-item" v-for="(item, index) in tszsList" :key="index">
          <el-image
            :src="item.image"
            :preview-src-list="[item.image]"
            class="el-image"
          />
          <div class="list-content">
            <div class="title text-overflows">{{ item.title }}</div>
            <div class="content text-overflows">{{ item.content }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tzggList: [
        {
          title: '南昌社会治理APP十月份运行情况通报',
          time: '2020-11-09 14:38:53'
        },
        {
          title:
            '关于印发《2020年度市综治责任单位平安建设（综治工作）考核评价内容》的通知 ',
          time: '2020-10-19 16:00:23'
        },
        {
          title:
            '关于印发《2020年度县区（开发区、管理局）平安建设（综治工作）考核评价内容》的通知',
          time: '2020-10-19 15:57:16'
        },
        {
          title: '南昌社会治理APP九月份运行情况通报',
          time: '2020-10-13 10:46:59'
        }
      ],
      zdjsList: [
        {
          title: '关于印发《南昌市市域社会治理现代化“十大工程”实施方案》的通知',
          time: '2020-05-25'
        },
        {
          title:
            '关于调整市防范化解重大风险工作领导小组等部分议事协调机构及相关组成人员的通知',
          time: '2020-07-09'
        },
        {
          title: '关于建立西湖区市域社会治理现代化“四个一”工作推进机制的通知',
          time: '2020-07-20'
        },
        {
          title:
            '关于成立东湖区推进市域社会治理现代化试点工作综合协调办公室工作专班的通知',
          time: '2020-06-30'
        }
      ],
      tszsList: [
        {
          image: require('@/assets/image/intelligentOffice/zdjs_01.jpg'),
          title: '莲麻村提升基层治理水平',
          content: '2019-07-26 16:52:39'
        },
        {
          image: require('@/assets/image/intelligentOffice/zdjs_03.jpg'),
          title: '坚持以标准化推深做实基层社会治理',
          content: '2019-07-26 16:49:09'
        },
        {
          image: require('@/assets/image/intelligentOffice/zdjs_02.jpg'),
          title: '苏州市吴中区 推进网格化联动机制建设 ',
          content: '2019-07-26 16:25:31'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.block-bg-container {
  width: 587px;
  height: 262px;
  background: url("~@/assets/image/intelligentOffice/板块1 拷贝 4.png") center
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
.tzgg-container {
  .list {
    margin-top: 20px;
    height: 200px;
  }
  .list-item {
    width: 95%;
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 84, 192, 0.6);
    position: relative;
    .list-icon {
      color: #3497fb;
      font-size: 16px;
    }
    .list-content {
      width: 70%;
      color: #a9daff;
      padding-left: 10px;
    }
    .list-time {
      width: 25%;
      text-align: right;
      color: #3b9afe;
    }
  }
}

.zdjs-container {
  .list {
    margin-top: 20px;
    height: 200px;
  }
  .list-item {
    width: 95%;
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 84, 192, 0.6);
    position: relative;
    .list-icon {
      color: #3497fb;
      font-size: 16px;
    }
    .list-content {
      width: 70%;
      color: #a9daff;
      padding-left: 10px;
    }
    .list-time {
      width: 25%;
      text-align: right;
      color: #3b9afe;
    }
  }
}

.tszs-container {
  .list {
    margin-top: 20px;
    height: 200px;
  }
  .list-item {
    width: 95%;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 84, 192, 0.6);
    position: relative;
    .el-image {
      width: 78px;
      height: 46px;
    }
    .list-content {
      width: 80%;
      color: #a9daff;
      padding-left: 10px;
      .title {
        font-size: 14px;
        color: #a9daff;
        line-height: 36px;
      }
      .content {
        width: 95%;
        color: #73aeda;
      }
    }
  }
}
</style>
