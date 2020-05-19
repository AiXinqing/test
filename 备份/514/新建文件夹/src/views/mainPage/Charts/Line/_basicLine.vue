<template>
  <!-- 单一折线图 文字倾斜-->
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
            <!-- <span>人</span> -->

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
      default: ''
    },
    dataLong: {
      type: Number,
      default: 1
    },
    legend: {
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
      return this.group(this.chartData.describes, this.dataLong)
    },
    option() {
      return {
        grid: {
          top: 20,
          left: 40,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        color: ['#4CDFC1', '#FACF2B', '#52A3FF'],
        legend: {
          data: [this.legend],
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
        xAxis: {
          type: 'category',
          name: this.unit,
          boundaryGap: false,
          data: this.chartData.datas.map((item) => ({
            value: item.itemArray[1]
            // textStyle: item.itemArray[2] === 1 ? { color: '#52A3FF' } : { color: '#666' }
          })),
          nameLocation: 'start',
          nameGap: 10,
          nameTextStyle: {
            fontSize: 12,
            color: '#666',
            padding: [25, 0, 0, 0]
          },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666'
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        series: [{
          name: this.legend,
          data: this.chartData.datas.map((item) => ({ value: item.itemArray[2] })),
          type: 'line',
          color: this.colors,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            },
            label: {
              // formatter: '{d}%'
            }
          }
        }]
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

