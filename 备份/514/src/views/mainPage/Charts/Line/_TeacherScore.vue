<template>
  <!-- 成绩折线图 文字倾斜-->
  <div
    ref="cardItem"
    class="row-charts-item"
    :style="{width:width}"
  >
    <div ref="explanationInfo">
      <div class="row-title">{{ titleName }}</div>
      <el-row
        v-show="cahrtLabel.length > 0"
        class="row-tableBox"
      >
        <el-col
          v-for="(item, i) in cahrtLabel"
          :key="i"
          class="row-year"
          :span="Math.ceil(24/cahrtLabel.length)"
        >
          <div class="name">{{ item[0].desTitle }}<div>
            <div class="num">
              <span class="num-data">{{ item[0].val }}</span>
              <span>人</span>

            </div>
          </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLines"
      ref="chartLine"
      style="width: 100%;"
      :style="{ height: chartHeight + 'px' }"
      :options="option"
    />
    <div v-else class="no-data">
      <div class="icon" />
      <div>暂无数据</div>
    </div>
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
    },
    titleName: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '364px'
    },
    colors: {
      type: String,
      default: '#52A3FF'
    },
    unit: {
      type: String,
      default: '(人)'
    },
    dataLong: {
      type: Number,
      default: 1
    },
    legendArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      clientHeight: 0,
      cardHeight: 263,
      chartHeight: 0
    }
  },
  computed: {
    cahrtLabel() {
      return this.group(this.chartData.describes, this.dataLong)
    },
    option() {
      const { datas } = this.chartData
      return {
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
        tooltip: {
          formatter: '{b}<br>{a}：{c}'
        },
        legend: {
          left: 0,
          bottom: 15,
          textStyle: {
            color: '#666',
            fontSize: 12
          },
          data: this.legendArr
          // 去重
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: datas.map(item => item.itemArray[0])
        },
        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        series: this.legendArr.map((item, i) => ({
          name: item,
          type: 'line',
          areaStyle: {},
          data: datas.map(row => row.itemArray[i + 1])
        }))
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeTheChart)
    if (this.cahrtLabel.length >= 0) {
      this.$nextTick(() => {
        this.clientHeight = this.$refs.explanationInfo.offsetHeight
        this.cardHeight = this.$refs.cardItem.offsetHeight
        this.chartHeight = this.cardHeight - this.clientHeight - 20
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeTheChart)
  },
  methods: {
    group(array, subGroupLength) {
      let index = 0
      const newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength))
      }
      return newArray
    },
    drawChart() {
      this.$nextTick(function() {
        if (this.option.series.length > 0) {
          const perBoxObj = []
          this.chartData.datas.forEach((element) => {
            const dataObj = {}
            for (var key in element.itemArray) {
              switch (key) {
                case '2':
                  dataObj['flag'] = element.itemArray[key]
                  break
                default:
              }
            }
            perBoxObj.push(dataObj)
          })

          const myChart = this.$refs.chartLine
          // 默认第一个数据高亮
          myChart.dispatchAction({
            type: 'highlight',
            dataIndex: perBoxObj.findIndex(item => item.flag === 1)
          })
          this.myChart = myChart
        }
      })
    },
    resizeTheChart() {
      if (this.$refs.chartLine) {
        this.$refs.chartLine.resize()
      }
    }
  }
}
</script>

<style scoped>
  .row-year:nth-child(n+2) {
     position: relative;
     left: 14px;
  }
   .row-tableBox{
    padding-left: 0px !important;
  }
</style>

<style lang="scss">
  .row-year{
    font-size: 12px;
    color: #999;
    padding-top: 5px;
    line-height: 20px;
    .num{
      .num-data{color: #666;font-size: 12px;}
      .num-compare{
        color: #52A3FF
      }
    }
  }
</style>

