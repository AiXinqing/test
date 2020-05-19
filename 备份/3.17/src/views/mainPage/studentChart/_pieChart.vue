<template>
  <div class="row-charts-item">
    <div class="row-title">{{ titleName }}</div>
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {

          left: 'left',
          data: this.chartData.datas[0].itemArray[0]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            color: '#52A3FF',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: this.chartData.datas[0].itemArray[1], name: this.chartData.datas[0].itemArray[0] }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    titleName() {
      return this.chartData.datas[0].itemArray[0]
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

