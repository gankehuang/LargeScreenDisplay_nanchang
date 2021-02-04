<template>
  <InfoBlock title="警情总数">
    <div class="total">
      <span class="label">警情数量</span>
      <VerticalNumTo
        :total="total"
        :bits="9"
      />
    </div>
    <div class="row">
      <div
        v-for="(item, index) in rows"
        :key="index"
        class="col"
      >
        <div class="number">
          {{ item.number }}
        </div>
        <div class="label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { alertNumber } from '@/api/intelligentDecisionMaking/special'
import VerticalNumTo from '@/components/VerticalNumTo'
export default {
  components: {
    VerticalNumTo
  },
  data () {
    return {
      total: 0,
      rows: [
        {
          number: '-',
          label: '治安'
        },
        {
          number: '-',
          label: '黄赌毒'
        },
        {
          number: '-',
          label: '交通事故'
        }
      ]
    }
  },

  created () {
    this.alertNumber()
  },
  methods: {
    alertNumber () {
      alertNumber().then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.rows[0].number = res.data.securityCount
          this.rows[1].number = res.data.yellowGamblerCount
          this.rows[2].number = res.data.trafficCount
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.title {
  margin: 10px 0 20px 30px;
  font-size: 16px;
  font-weight: bold;
  color: #7dbcff;
}
.total {
  margin: 20px 0 0 30px;
  // line-height: 36px;
  .label {
    display: inline-block;
    height: 40px;
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #b2d9fb;
  }
}
.row {
  width: 375px;
  height: 95px;
  margin: 0 auto;
  background: url("~@/assets/image/policeSituation/left-top-row.png") center
    center / 100% 100% no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  .col {
    flex: 1;
    text-align: center;
    padding-bottom: 30px;
    background: url("~@/assets/image/policeSituation/left-row-col.png") center
      center / 100% 100% no-repeat;
    padding-top: 20px;
    .number {
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #e6b00e;
      line-height: 24px;
    }
    .label {
      font-weight: bold;
      color: #a9daff;
      line-height: 24px;
    }
  }
}

</style>
