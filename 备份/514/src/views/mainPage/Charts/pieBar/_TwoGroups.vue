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
              <span class="num-data" style="font-size:14px;color:#52A3FF">{{ item[0].val }} </span>
              {{ unit }}
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
    unit: {
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
      return this.group(this.chartData.describes, 1)
    },
    option() {
      const { datas } = this.chartData
      const dataVal = []
      const perBoxObj = []
      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          if (key === '0') {
            dataObj['name'] = element.itemArray[key]
          } else if (key === '1') {
            dataObj['value'] = element.itemArray[key]
          }
        }
        perBoxObj.push(dataObj)
      })

      perBoxObj.map(item => {
        if (item.name !== '累计时长') {
          dataVal.push({
            ...item,
            selected: true
          })
        }
      })
      // const seriesData = dataVal.map(item => item.itemArray[1]).reverse()

      return {// 简单的 折线图+饼图 展示
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
        grid: {
          top: 40,
          left: 0,
          right: 20,
          bottom: 5,
          containLabel: true
        },
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            splitLine: { show: false },
            axisTick: { show: false },
            data: datas.map(item => item.itemArray[0]).reverse(),
            axisLabel: {
              show: false
            }

          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            //  axisLine: { show: false },
            axisTick: { show: false }
          }
        ],
        series: [
          {
            name: '累计时长',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [datas[datas.length - 1].itemArray[1]],
            barWidth: 60,
            barGap: -5,
            label: {
              show: true,
              position: 'top',
              // color: '#666',
              formatter: (params) => {
                return params.name + ': \n ' + params.data
              }
            }
          },
          {
            type: 'pie',
            data: dataVal.reverse(),
            radius: ['50%', '65%'],
            center: ['60%', '55%'],
            selectedMode: 'single',
            clockwise: true,
            label: {
              fontSize: '12',
              offset: [0, 0],
              formatter: '{d}% \n {b}'
            },
            selectedOffset: 0,
            emphasis: {
              label: {
                show: true,
                fontSize: '14'
              }
            },
            labelLine: {
              show: true
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

