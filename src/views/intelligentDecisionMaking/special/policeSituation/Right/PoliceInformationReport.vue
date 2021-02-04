<template>
  <InfoBlock title="警情分析报告">
    <div class="list">
      <el-scrollbar style="height: 100%">
        <div
          v-for="(item, index) in rightTopList"
          :key="index"
          class="item"
          @click="watchPdf(item)"
        >
          <div class="label">
            {{ item.label }}
          </div>
          <div class="date">
            {{ item.date }}
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
      </el-scrollbar>
    </div>

    <PdfDialog
      :visible.sync="visible"
      :append-to-body="true"
      :info="pdfFile"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      rightTopList: [
        {
          label: '2020年8月警情分析报告',
          date: '2020-09-08 17:19:08',
          url: require('@/assets/pdf/警情8月.pdf'),
          numPages: 2
        },
        {
          label: '2020年7月警情分析报告',
          date: '2020-08-11 11:56:05',
          url: '',
          numPages: null
        },
        {
          label: '2020年6月警情分析报告',
          date: '2020-07-03 08:46:22',
          url: '',
          numPages: null
        },
        {
          label: '2020年5月警情分析报告',
          date: '2020-06-05 14:43:18',
          url: '',
          numPages: null
        },
        {
          label: '2020年4月警情分析报告',
          date: '2020-05-07 10:19:04',
          url: '',
          numPages: null
        },
        {
          label: '2020年3月警情分析报告',
          date: '2020-04-06 10:33:01',
          url: '',
          numPages: null
        }
      ],
      visible: false,
      pdfFile: {}
    }
  },
  mounted () {},
  methods: {
    watchPdf (item) {
      if (item.url) {
        this.visible = true
        this.pdfFile.file = item.url
        this.pdfFile.numPages = item.numPages
      } else {
        this.downloadReport()
      }
    },
    downloadReport () {
      this.$message.warning('暂无报告')
    },
    closeModal () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

.list {
  margin: 35px 0 0 18px;
  .item {
    width: 375px;
    height: 80px;
    cursor: pointer;
    padding: 15px 0 0 70px;
    margin-bottom: 25px;
    position: relative;
    background: url('~@/assets/image/policeSituation/right-top-item.png')
      center center / 100% 100% no-repeat;
    .label {
      color: #e0f1ff;
      line-height: 18px;
    }
    .date {
      color: #569af6;
      line-height: 48px;
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

</style>
