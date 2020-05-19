<template>
  <!-- 多组堆叠折线图 -->
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

          <div class="num">
            <span class="name">{{ item[0].desTitle }}</span>
            <span
              class="num-compare"
              :style="{ color: i === 1 ? '#FACF2B' : i === 2 ? '#4CDFC1' :'#52A3FF'}"
            >
              <i v-if="item[0].val.indexOf('-') == -1" class="el-icon-caret-top" /> <i
                v-else
                class="el-icon-caret-bottom"
              /> {{ item[0].val }}{{ item[0].val === '∞'?'': '' }}</span>
          </div>
        </el-col>
      </el-row>

    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLines"
      ref="chartLine"
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
      const { describes } = this.chartData
      if (describes.length > 0) {
        return this.group(describes, 1)
      } else {
        return []
      }
    },
    option() {
      const { datas } = this.chartData

      const xAxisData = Array.from(new Set(datas.map(item => item.itemArray[0])))

      const legendData = Array.from(new Set(datas.map(item => item.itemArray[1])))
      const yAxisData = Array.from(new Set(datas.map(item => item.itemArray[2])))

      const seriesData = legendData.map(item => ({
        name: item,
        type: 'scatter',
        symbol: 'circle',
        symbolSize: function(dataItem) {
          const dataMaxs = Math.max.apply(null, datas.map(item => item.itemArray[3]))
          const dataMins = Math.min.apply(null, datas.map(item => item.itemArray[3]))
          const bol = (60 - 10) / (dataMaxs - dataMins) === Infinity ? 1 : (60 - 10) / (dataMaxs - dataMins)
          const bolSize = bol * (parseInt(dataItem[2]) - dataMins) + 10

          return bolSize
        },
        label: {
          emphasis: {
            show: true,
            formatter: function(param) {
              return param.data[2]
            },
            position: 'top'
          }
        },
        areaStyle: {},
        data: datas.filter(row => row.itemArray[1] === item).map(element => {
          const items = [...element.itemArray].splice(2, 3)
          return [element.itemArray[0], ...items]
        })
      }))

      return {
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8', '#1eb4c8', '#66a3ff', '#00b2b3'],
        textStyle: {
          color: '#333'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: 30,
          left: 0,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        legend: {
          show: true,
          data: legendData,
          left: 57,
          bottom: 0
        },
        yAxis: {
          data: yAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666'
            }
          }
        },
        xAxis: {
          data: xAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666'
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
  .row-tableBox{
    padding-left: 1px !important;
  }
</style>

