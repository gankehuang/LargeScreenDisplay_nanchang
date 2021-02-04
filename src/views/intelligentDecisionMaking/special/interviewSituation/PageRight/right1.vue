<template>
  <div class="win-info">
    <div class="title">
      访情分析报告
    </div>
    <div style="height: 212px">
      <el-scrollbar style="height: 100%">
        <div class="list">
          <div
            v-for="(item, index) in itemList"
            :key="index"
            class="list-item"
            @click="watchPdf(item)"
          >
            <div>
              <div class="name">
                {{ item.label }}
              </div>
              <div class="time">
                {{ item.date }}
              </div>
            </div>
            <a
              v-if="item.url"
              target="_blank"
              :download="item.label"
              :href="item.url"
              @click.stop=""
            >
              <div class="download">
                <svg-icon
                  icon-class="download"
                  class="svg-icon"
                />
              </div>
            </a>
            <a
              v-else
              @click.stop="downloadReport"
            >
              <div class="download">
                <svg-icon
                  icon-class="download"
                  class="svg-icon"
                />
              </div>
            </a>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <PdfDialog
      :visible.sync="pdfModalVisible"
      :pdf-file="pdfFile"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      pdfModalVisible: false,
      pdfFile: {},
      itemList: [
        {
          label: '2020年10月访情分析报告',
          date: '2020-10-05 09:16:35',
          url: require('@/assets/pdf/访情10月.pdf'),
          numPages: 2
        },
        {
          label: '2020年9月访情分析报告',
          date: '2020-09-02 11:32:12',
          url: '',
          numPages: null
        },
        {
          label: '2020年8月访情分析报告',
          date: '2020-08-06 14:11:09',
          url: '',
          numPages: null
        },
        {
          label: '2020年7月访情分析报告',
          date: '2020-07-01 10:05:17',
          url: '',
          numPages: null
        },
        {
          label: '2020年6月访情分析报告',
          date: '2020-06-04 16:22:54',
          url: '',
          numPages: null
        },
        {
          label: '2020年5月访情分析报告',
          date: '2020-05-07 09:45:03',
          url: '',
          numPages: null
        }
      ]
    }
  },
  methods: {
    downloadReport () {
      this.$message.warning('暂无报告')
    },
    watchPdf (item) {
      if (item.url) {
        this.pdfModalVisible = true
        this.pdfFile.file = item.url
        this.pdfFile.numPages = item.numPages
      } else {
        this.downloadReport()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.win-info {
  width: 420px;
  height: 275px;
  margin: 0px !important;
  background: url('~@/assets/image/interviewSituation/right1-bg.png') no-repeat
    center;
  background-size: 100% 100%;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 29px;
    font-weight: bold;
  }
  .list {
    padding: 18px 0 0 18px;
    .list-item {
      width: 375px;
      height: 79px;
      cursor: pointer;
      margin-bottom: 25px;
      padding: 7px 0 0 70px;
      position: relative;
      background: url('~@/assets/image/interviewSituation/right-item-bg.png')
        no-repeat center;
      background-size: 100% 100%;
      display: flex;
      line-height: 34px;
      margin-top: 7px;
      font-size: 14px;
      .name {
        color: #fff;
      }
      .time {
        color: #559af6;
      }
    }
    .download {
      position: absolute;
      width: 50px;
      height: 80px;
      top: 0px;
      right: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon {
        color: #a9daff;
        font-size: 30px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow: auto;
}
</style>
