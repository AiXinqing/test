<template>
  <!-- 单一折线图 -->
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
              <span class="num-compareCon"> {{ item[1].desTitle }}</span>
              <span class="num-compare">
                <i class="el-icon-caret-top" /> {{ item[1].val }}{{ item[1].val === '∞'?'': '%' }}</span>
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
      return this.group(this.chartData.describes, 2)
    },
    option() {
      const { datas } = this.chartData
      return {
        backgroundColor: '#fff',
        grid: {
          top: 20,
          left: 0,
          right: 0,
          bottom: 5,
          containLabel: true
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          data: datas.map(item => item.itemArray[0]),
          // boundaryGap: false,
          splitLine: { show: false },
          axisLine: {
            textStyle: {
              color: '#999'
            },
            lineStyle: {
              type: 'solid',
              color: '#999'
            }
          },
          axisTick: { show: false }
        },
        yAxis: {
          ayisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#5c6076'
            }
          },

          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },

        series: [
          {
            type: 'bar',
            // name: 'linedemo',

            tooltip: {
              show: false
            },
            animation: false,
            barWidth: 1.4,
            hoverAnimation: false,
            data: datas.map(item => item.itemArray[1]),
            itemStyle: {
              normal: {
                color: '#52A3FF',
                opacity: 0.6,
                label: {
                  show: false
                }
              }
            }
          },
          {
            type: 'line',
            animation: false,
            symbol: 'circle',

            hoverAnimation: false,
            data: [0, 0, 0, 0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: '#52A3FF',
                opacity: 0
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                color: '#ddd',
                opacity: 1
              }
            }
          },
          {
            type: 'line',
            smooth: true,
            symbolSize: 10,
            animation: false,
            lineWidth: 1.2,
            hoverAnimation: false,
            data: datas.map(item => item.itemArray[1]),
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#52A3FF',
                shadowBlur: 40,
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#52A3FF'

                  }
                }
              }
            },
            areaStyle: {
              normal: {
                color: '#52A3FF',
                opacity: 0.08
              }
            }

          }
        ]
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

