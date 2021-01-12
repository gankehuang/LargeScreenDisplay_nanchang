<template>
  <div class="input" style="margin-top: 15px;" :style="blockStyleObj">
    <el-input
      placeholder="请输入内容"
      v-model="input3"
      class="input-with-select"
    >
      <el-select v-model="select1" slot="prepend" placeholder="请选择">
        <el-option label="人员" value="1"></el-option>
        <!-- <el-option label="单位" value="2"></el-option> -->
        <el-option label="车辆" value="3"></el-option>
        <!-- <el-option label="警情" value="4"></el-option> -->
      </el-select>
      <el-button slot="append" @click="search">搜索</el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    select: {
      type: [String],
      default: '1'
    },
    input1: {
      type: [String],
      default: ''
    },
    width: {
      type: [String],
      default: '862px'
    },
    height: {
      type: [String],
      default: '56px'
    },
    contentStyleObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    this.input3 = this.input1
    this.select1 = this.select
  },
  data() {
    return {
      input3: '',
      select1: '1'
    }
  },
  methods: {
    search() {
      this.$emit('search', this.select1, this.input3)
    }
  },
  computed: {
    blockStyleObj() {
      return {
        width: this.width,
        height: this.height,
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>
<style lang="scss">
.input {
  margin: 0 auto;
  .input-with-select {
    background: #03223c;
    border: 2px solid #3699ff;
    border-radius: 10px;
  }
  .el-select .el-input {
    width: 80px;
    font-size: 16px;
    color: #fff;
  }
  .el-input__inner {
    // width: 80px;
    height: 47px !important;
    line-height: 47px !important;
    border: none;
    background: #03223c;
    color: #fff;
  }
  .el-input-group__prepend {
    border-radius: 10px 0 0 10px;
    background: #03223c;
    border: none;
  }
  .el-input-group__append {
    // border-radius: 0px 10px 10px 0px;
    width: 90px;
    background: #3699ff;
    border: 2px solid #3699ff;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
}
</style>
