<template>
  <div class="row-charts-item">
    <div class="row-title">学年人口统计</div>
    <div class="row-year">
      <div class="name">{{ optionName }}<div>
        <div class="num">
          <span class="num-data">{{ optionVal }}</span>
          人
          <span class="num-compareCon">{{ compareCon }}</span>
          <span class="num-compare">
            <i class="el-icon-caret-top" />{{ compareVal }}</span>
        </div>
      </div>
      </div>
    </div>
    <chart id="chartLine" style="width: 334px; height:192px" :options="option" />

  </div></template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    option() {
      return {
        grid: {
          top: 20,
          left: 60,
          right: 20,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          name: '(人)',
          data: this.chartData.datas.map((item) => item.itemArray[0]),
          nameLocation: 'start',
          nameGap: 10,
          nameTextStyle: {
            fontSize: 12,
            color: '#666',
            padding: [25, 0, 0, 0]
          },
          axisLabel: {
            color: '#333'
          },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666'
            }
          },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        series: [{
          data: this.chartData.datas.map((item) => item.itemArray[1]),
          type: 'line'
        }]
      }
    },
    optionName() {
      return this.chartData.describes[0].desTitle
    },
    optionVal() {
      return this.chartData.describes[0].val
    },
    compareCon() {
      return this.chartData.describes[1].desTitle
    },
    compareVal() {
      return this.chartData.describes[1].val
    }
  }
}
</script>

<style lang="scss">
  .row-year{
    font-size: 12px;
    color: #999;
    padding-top: 5px;
    .num{
      .num-data{
        font-size: 18px;
        color: #666
      }
      .num-compare{
        color: #52A3FF
      }
    }
  }
</style>

