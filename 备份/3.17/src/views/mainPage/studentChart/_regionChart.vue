<template>
  <div class="row-charts-item region">
    <div class="row-title">行政区划</div>
    <!-- <div class="row-year">
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
    </div> -->
    <chart id="chartLine" style="width: 100%; height:222px" :options="option" />
  </div>
</template>

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
          bottom: 30,
          containLabel: true
        },
        xAxis: [
          {
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
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '20%',
            barMinWidth: '20px',
            barMaxWidth: '40px',
            data: this.chartData.datas.map((item) => item.itemArray[1]),
            itemStyle: {
              normal: {
                color: 'rgba(255, 255, 255,.1)',
                borderColor: '#52A3FF'
              }
            },
            emphasis: { // houver
              itemStyle: {
                color: '#52A3FF'
              }
            }
          }
        ]
      }
    }
    // optionName() {
    //   if (this.chartData.describes.length > 0) {
    //   }
    //   return this.chartData.describes[0].desTitle || ''
    // },
    // optionVal() {
    //   return this.chartData.describes[0].val || ''
    // },
    // compareCon() {
    //   return this.chartData.describes[1].desTitle || ''
    // },
    // compareVal() {
    //   return this.chartData.describes[1].val || ''
    // }
  }
}
</script>
