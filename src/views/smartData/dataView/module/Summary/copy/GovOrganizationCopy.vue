<template>
  <div class="gov-organization-container">
    <div class="title">
      综合组织
    </div>
    <ul>
      <li>
        <div class="label">
          <svg-icon
            icon-class="gov-organization-center"
            class="icon"
          />
          <span>综治中心</span>
        </div>
        <div class="data">
          <span>389</span>
          <span>个</span>
        </div>
      </li>
      <li>
        <div class="label">
          <svg-icon
            icon-class="key-place-building"
            class="icon"
          />
          <span>综治责任单位</span>
        </div>
        <div class="data">
          <span>703</span>
          <span>个</span>
        </div>
      </li>
      <li>
        <div class="label">
          <svg-icon
            icon-class="gov-organization-yjdw"
            class="icon"
          />
          <span>群防群治单位</span>
        </div>
        <div class="data">
          <span>271</span>
          <span>个</span>
        </div>
        <div class="item">
          <span class="label">志愿者队伍</span>
          <span class="data">
            18
          </span>
          <span>个</span>
        </div>
        <div class="item">
          <span class="label">义务巡逻队</span>
          <span class="data">
            12
          </span>
          <span>个</span>
        </div>
        <div class="item">
          <span class="label">专职巡逻队</span>
          <span class="data">
            9
          </span>
          <span>个</span>
        </div>
      </li>
      <li>
        <div class="label">
          <svg-icon
            icon-class="gov-organization-yjdw"
            class="icon"
          />
          <span>社会组织</span>
        </div>
        <div class="data">
          <span>5</span>
          <span>个</span>
        </div>
        <div class="item">
          <span class="label">心防组织</span>
          <span class="data">
            4
          </span>
          <span>个</span>
        </div>
        <div class="item">
          <span class="label">法律援助组织</span>
          <span class="data">
            3
          </span>
          <span>个</span>
        </div>
        <div class="item">
          <span class="label">人民调解组织</span>
          <span class="data">
            6
          </span>
          <span>个</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.gov-organization-container {
  width: 430px;
  height: 380px;
  margin-top: 10px;
  background: url("~@/assets/image/dataView/gov-organization-bg.png") center
    center / 100% 100% no-repeat;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 10px 0 0 25px;
  }
  ul {
    padding: 0;
    margin: 0;
    .item {
      width: 100%;
      padding: 0 20px;
      color: #fff;
      font-size: 16px;
      margin: 20px 0;
      .data {
        color: #a9daff;
        font-size: 18px;
      }
    }
    li:nth-of-type(1) {
      display: inline-block;
      vertical-align: top;
      width: 180px;
      height: 77px;
      background: url("~@/assets/image/dataView/gov-organization-small.png")
        center center / 100% 100% no-repeat;
      margin: 25px 12px 0;
      text-align: center;
      .label {
        margin: 15px 0 5px;
        color: #fff;
        .icon {
          color: #80f4e7;
          font-size: 18px;
        }
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .data {
        color: #a9daff;
        span:nth-of-type(1) {
          font-size: 28px;
          font-weight: bold;
        }
      }
    }
    li:nth-of-type(2) {
      width: 180px;
      height: 77px;
      display: inline-block;
      vertical-align: top;
      background: url("~@/assets/image/dataView/gov-organization-small.png")
        center center / 100% 100% no-repeat;
      margin: 25px 12px 0;
      text-align: center;
      .label {
        margin: 15px 0 5px;
        color: #fff;
        .icon {
          color: #80f4e7;
          font-size: 18px;
        }
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .data {
        color: #a9daff;
        span:nth-of-type(1) {
          font-size: 28px;
          font-weight: bold;
        }
      }
    }
    li:nth-of-type(3) {
      display: inline-block;
      vertical-align: top;
      width: 180px;
      height: 209px;
      background: url("~@/assets/image/dataView/gov-organization-big.png")
        center center / 100% 100% no-repeat;
      margin: 10px 12px 0;
      text-align: center;
      .label {
        margin: 15px 0 5px;
        color: #fff;
        .icon {
          color: #80f4e7;
          font-size: 18px;
        }
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .data {
        color: #a9daff;
        span:nth-of-type(1) {
          font-size: 28px;
          font-weight: bold;
        }
      }
    }
    li:nth-of-type(4) {
      width: 180px;
      height: 209px;
      display: inline-block;
      background: url("~@/assets/image/dataView/gov-organization-big.png")
        center center / 100% 100% no-repeat;
      margin: 10px 12px 0;
      text-align: center;
      .label {
        margin: 15px 0 5px;
        color: #fff;
        .icon {
          color: #80f4e7;
          font-size: 18px;
        }
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .data {
        color: #a9daff;
        span:nth-of-type(1) {
          font-size: 28px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
