<template>
  <div class="rightOne">
    <div class="title">
      舆情分析
    </div>
    <div class="con">
      <el-scrollbar style="height:202px">
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
          <!-- <a
            target="_blank"
            :download="item.label"
            :href="item.url"
            v-if="item.url"
          >
            <div class="download">
              <svg-icon
                icon-class="download"
                class="svg-icon"
              />
            </div>
          </a>
          <a v-else>
            <div class="download">
              <svg-icon
                icon-class="download"
                class="svg-icon"
              />
            </div>
          </a> -->
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
      rightTopList: [
        {
          label: '2020年11月舆情分析报告',
          date: '2020-12-01 17:19:08',
          file: require('@/assets/pdf/11yuqing.pdf'),
          numPages: 14
        },
        {
          label: '2020年10月舆情分析报告',
          date: '2020-11-01 11:56:05',
          file: require('@/assets/pdf/yuqing.pdf'),
          numPages: 14
        },
        {
          label: '2020年8月舆情分析报告',
          date: '2020-09-01 08:46:22',
          file: '',
          numPages: null
        },
        {
          label: '2020年7月舆情分析报告',
          date: '2020-08-01 14:43:18',
          file: '',
          numPages: null
        },
        {
          label: '2020年6月舆情分析报告',
          date: '2020-07-01 10:19:04',
          file: '',
          numPages: null
        },
        {
          label: '2020年5月舆情分析报告',
          date: '2020-06-01 10:33:01',
          file: '',
          numPages: null
        }
      ]
    }
  },
  methods: {
    watchPdf (item) {
      if (item.file) {
        this.pdfModalVisible = true
        this.pdfFile.file = item.file
        this.pdfFile.numPages = item.numPages
      }
    }
  }
}
</script>

<style></style>script
<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.con {
  margin: 35px 0 0 12px;
  .item {
    width: 375px;
    height: 80px;
    padding: 15px 0 0 70px;
    margin-bottom: 25px;
    position: relative;
    cursor: pointer;
    background: url('~@/assets/image/policeSituation/right-top-item.png') center
      center / 100% 100% no-repeat;
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
.rightOne {
  position: relative;
  width: 420px;
  height: 344px;
  background: url('~@/assets/image/politicalLaw/rightOne.png') no-repeat center
    center;
  background-size: 100% 100%;
  padding: 50px 15px 10px 15px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}
</style>
