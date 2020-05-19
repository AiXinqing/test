<template>
  <!-- 多组 考勤实心-柱状图 -->
  <div
    ref="cardItem"
    class="row-charts-item popComparison"
    :style="{width:width}"
  >
    <div ref="explanationInfo">
      <div class="row-title">{{ titleName }}</div>
      <el-row
        v-if="cahrtLabel.length > 0 "
        class="row-tableBox"
      >
        <el-col
          v-for="(item, i) in cahrtLabel"
          :key="i"
          class="row-table"
        >
          <div class="label-item">
            <div class="label-one">
              <span class="name">{{ item[0].desTitle }} </span>
              <span class="num"> {{ item[0].val }}  </span>
              <span class="name"> {{ item[1].desTitle }} </span>
              <span class="num"> {{ item[1].val }}  </span>
              <span class="name"> {{ item[2].desTitle }} </span>
              <span class="num" :style="{color:item[2].desTitle === '迟到概率'?'#52A3FF':'#4CDFC1'}"> {{ item[2].val }}  </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
      ref="popComparison"
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
      default: ''
    },
    listNum: {
      type: Number,
      default: 4
    },
    width: {
      type: String,
      default: '364px'
    },
    titleContten: {
      type: String,
      default: ''
    },
    legendArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      perBoxObj: [],
      clientHeight: 0,
      cardHeight: 263,
      chartHeight: 0
    }
  },
  computed: {
    option() {
      const { datas } = this.chartData
      const colors = ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8']

      return {
        legend: {
          left: 57,
          bottom: 0,
          itemWidth: 14,
          itemHeight: 6,
          textStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item'
        },
        dataset: {
          dimensions: ['TIMEPART', ...this.legendArr],
          source: datas.map((item, i) => ({
            FLAG: item.itemArray[3],
            TIMEPART: item.itemArray[0],
            '迟到': item.itemArray[1], // 迟到
            '早退': item.itemArray[2]
          }))
        },
        xAxis: [
          { type: 'category', gridIndex: 0,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            offset: 20,
            axisLabel: {
              show: true,
              textStyle: {
                color: function(params) {
                  let colors = '#666'
                  const strName = datas.filter(item => item.itemArray[3] === 1)
                  if (strName[0].itemArray[0] === params) {
                    colors = '#FACF2B'
                  }
                  return colors
                }
              }
            }
          }
        ],
        yAxis: [
          { gridIndex: 0,
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 50,
          containLabel: true
        },
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
        series: this.legendArr.map((item, i) => ({
          type: 'bar',
          itemStyle: {
            normal: {
              color: function(params) {
                let colorItme = '#fff'
                if (params.data.FLAG === 1) {
                  colorItme = colors[i]
                }
                return colorItme
              },
              borderColor: colors[i]
            }
          },
          emphasis: { // houver
            itemStyle: {
              color: colors[i]
            }
          },
          barWidth: 12,
          barGap: 5,
          label: {
            show: true,
            position: 'bottom',
            offset: [0, 0],
            color: '#999',
            fontSize: 10
            // formatter: (params) => {
            //   let str = ''
            //   if (params.data.FLAG === 1) {
            //     str = '{a|' + params.data.迟到 + '}'
            //   } else {
            //     str = params.data.迟到
            //   }
            //   return str
            // },
            // rich: {
            //   a: {
            //     color: colors[i]
            //   }
            // }
          }
        }))

      }
    },
    cahrtLabel() {
      return this.group(this.chartData.describes, this.listNum)
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeTheChart)
    this.drawChart()
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
    resizeTheChart() {
      if (this.$refs.popComparison) {
        this.$refs.popComparison.resize()
      }
    },
    drawChart() {
      const echarts = require('echarts')
      const myChart = echarts.init(document.getElementById('chartLine'))
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      })

      this.myChart = myChart
    }
  }
}
</script>

<style lang="scss" scoped>
  .row-tableBox{
    .row-table{
      justify-content:left;

      .row-left{
        width: 67px;
        padding-top:15px;
      }
    }

    .row-table:nth-child(n+2){
      margin-left: 20px;
    }

  }

	.label-item{
		font-size: 12px;
		color: #666;
    line-height: 24px !important;

		.name{
			color: #999;
		}
		.num{
      min-width: 15px !important;
      font-weight:500 !important;
    }
	}
</style>
