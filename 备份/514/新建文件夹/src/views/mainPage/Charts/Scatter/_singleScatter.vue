<template>
  <!-- 分散起泡 -->
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
          <div class="name">
            <div>
              <span class="num-data">{{ item[0].desTitle }}</span>
              <span class="num-data" style="color:#52A3FF"> {{ item[0].val }}</span>
            </div>
            <div>
              <span class="num-compareCon"> {{ item[1].desTitle }} </span>
              <span
                class="num-compare"
                style="color:rgb(76, 223, 193)"
              >
                {{ item[1].val }}</span>
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
    unit: {
      type: String,
      default: ''
    },
    xUnit: {
      type: String,
      default: ''
    },
    yUnit: {
      type: String,
      default: ''
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
      // const echarts = require('echarts')

      const { datas } = this.chartData
      const dimensions = datas.map(item => item.itemArray[0])
      const data = [[], []]
      datas.forEach((element, i) => {
        data[i].push(element.itemArray)
      })

      const seriesData = Array.from(new Set(dimensions)).map((element, i) => ({
        name: element,
        type: 'scatter',
        symbolSize:
         function(dataItem) {
           const dataMaxs = Math.max(...datas.map(item => item.itemArray[2]))
           const dataMins = Math.min(...datas.map(item => item.itemArray[2]))
           const bol = (45 - 20) / (dataMaxs - dataMins) === Infinity ? 1 : (45 - 20) / (dataMaxs - dataMins)
           const bolSize = bol * (dataItem[1] - dataMins) + 20
           return bolSize
         },
        label: {
          emphasis: {
            show: true,
            formatter: function(param) {
              return param.data[1]
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            color: i === 0 ? '#52A3FF' : '#4CDFC1'
          }
        },
        data: data[i].map(item => {
          return [item[1] + '', item[2]]
        })
      }))
      return {
        legend: {
          data: Array.from(new Set(dimensions)),
          left: 57,
          bottom: 0,
          itemWidth: 14,
          itemHeight: 6,
          textStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        grid: {
          top: 40,
          left: 0,
          right: 60,
          bottom: 30,
          containLabel: true
        },
        xAxis: {
          name: this.xUnit,
          nameGap: 10,
          nameTextStyle: {
            fontSize: 12,
            color: '#666',
            padding: [-5, 0, 0, 0]
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: ['#999']
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        yAxis: {
          name: this.yUnit,
          nameGap: 13,
          nameTextStyle: {
            fontSize: 12,
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: ['#999']
            }
          }
        },
        series: seriesData
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
  .row-tableBox{padding-left: 0px;}
</style>

<style lang="scss">
  .row-year{
    font-size: 12px;
    color: #999;
    padding-top: 5px;
    line-height: 20px;
    display: flex;
    .num{
      .num-compare{
        color: #52A3FF;
      }
    }
  }
</style>

