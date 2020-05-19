<template>
  <!-- 两组组 考勤空心-柱状图 -->
  <div
    ref="cardItem"
    class="row-charts-item popComparison"
    :style="{width:width}"
  >
    <div ref="explanationInfo">
      <div class="row-title">{{ titleName }}</div>
      <el-row
        v-if="cahrtLabel.length > 0"
        class="row-tableBox"
      >
        <el-col
          v-for="(item, i) in cahrtLabel"
          :key="i"
          class="row-table"
        >
          <div class="label-item">
            <div class="label-one">
              <span class="name">{{ item[0].desTitle }}</span>
              <span class="num"> {{ item[0].val }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
      ref="popComparison"
      style="width: 100%; "
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

    width: {
      type: String,
      default: 'calc(100% - 30px)'
    },
    titleName: {
      type: String,
      default: ''
    },
    listNum: {
      type: Number,
      default: 4
    },
    titleContten: {
      type: String,
      default: ''
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
      const dimensions = ['TIMEPART', ...datas.map(item => item.itemArray[1])]
      const legendData = datas.map(item => item.itemArray[0])
      const legends = Array.from(new Set(legendData))
      const perBoxObj = this.group(datas, 2)

      const sources = legends.map((item, i) => ({
        TIMEPART: item,
        FLAG: perBoxObj[i][0].itemArray[3],
        早退: perBoxObj[i][0].itemArray[2],
        迟到: perBoxObj[i][1].itemArray[2]
      }))

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
          dimensions: Array.from(new Set(dimensions)),
          source: sources
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
                  const strName = sources.find(item => item.FLAG === 1)
                  if (strName.TIMEPART === params) {
                    colors = '#FACF2B'
                  }
                  return colors
                }
              }
            }
          }
        ],
        color: ['#52A3FF', '#FACF2B'],
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
          bottom: 45,
          containLabel: true
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  let colors = 'rgba(255, 255, 255,.1)'
                  if (params.data.FLAG === 1) {
                    colors = '#52A3FF'
                  }
                  return colors
                },
                borderColor: '#52A3FF'
              }
            },
            // emphasis: { // houver
            //   itemStyle: {
            //     color: '#52A3FF'
            //   }
            // },
            barWidth: 12,
            barGap: 5,
            grid: {
              top: 20,
              left: 0,
              right: 20,
              bottom: 45,
              containLabel: true
            },
            label: {
              show: true,
              position: 'bottom',
              offset: [0, 0],
              color: '#999',
              fontSize: 10
            }
          },
          { type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  let colors = 'rgba(255, 255, 255,.1)'
                  if (params.data.FLAG === 1) {
                    colors = '#4CDFC1'
                  }
                  return colors
                },
                borderColor: '#4CDFC1'
              }
            },
            // emphasis: { // houver
            //   itemStyle: {
            //     color: '#4CDFC1'
            //   }
            // },
            barWidth: 12,
            barGap: 5,
            label: {
              show: true,
              position: 'bottom',
              offset: [0, 0],
              color: '#999',
              fontSize: 10
            }
          }
        ]
      }
    },
    cahrtLabel() {
      return this.group(this.chartData.describes, this.listNum)
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
    resizeTheChart() {
      if (this.$refs.popComparison) {
        this.$refs.popComparison.resize()
      }
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
    line-height: 26px;

		.name{
			color: #999;
		}
		.num{
      min-width: 15px !important;
      font-weight:500 !important;
    }
	}
</style>
