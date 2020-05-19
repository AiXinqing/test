<template>
  <!-- 教职工 多组 考勤实心-柱状图 -->
  <div
    v-if="option.dataset.source.length > 0"
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
              <span class="name">{{ item[0].desTitle }}</span>
              <span class="num" :style="{color:i === 0?'#52A3FF':'#4CDFC1'}"> {{ item[0].val }} </span>
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
      default: '343px'
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
      const colorArr = ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8']
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
          source: [
            ['product', ...datas.map(item => item.itemArray[0])],
            ...this.legendArr.map((item, i) => {
              const dataVal = datas.map(item => item.itemArray[i + 1])
              const Arr = [item, ...dataVal]
              return Arr
            })

          ]
        },
        xAxis: [
          { type: 'category', gridIndex: 0,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            offset: 10,
            axisLabel: {
              show: true,
              textStyle: {
                color: function(params) {
                  let colors = '#666'
                  datas.map(item => {
                    if (item.itemArray[3] === '1' && item.itemArray[0] === params) {
                      colors = '#FACF2B'
                    }
                  })

                  return colors
                }
              }
            }
          }
        ],
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
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
          bottom: 30,
          containLabel: true
        },
        series: this.legendArr.map((item, i) => ({
          name: item,
          type: 'bar',
          seriesLayoutBy: 'row',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: function(params) {
                let colors = 'rgba(255, 255, 255,.1)'
                datas.map(item => {
                  if (parseInt(item.itemArray[3]) === 1 && item.itemArray[0] === params.data[0]) {
                    colors = colorArr[i]
                  }
                })
                return colors
              },
              borderColor: colorArr[i]
            }
          },
          emphasis: { // houver
            itemStyle: {
              color: colorArr[i]
            }
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
