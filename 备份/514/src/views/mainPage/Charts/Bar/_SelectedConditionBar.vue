<template>
  <!-- 单一空心柱状图 蓝色-->
  <div
    ref="cardItem"
    class="row-charts-item region"
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
      id="chartLine"
      ref="regionChart"
      style="width:100%"
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
      const colorArr = ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8']
      return {
        tooltip: {
          formatter: '{b}<br>{a}：{c}'
        },
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
        legend: {
          left: 57,
          bottom: 0,
          itemWidth: 14,
          itemHeight: 6,
          textStyle: {
            color: '#666',
            fontSize: 12
          },
          data: this.legendArr
        },
        grid: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: datas.map(item => item.itemArray[0])

        }],
        yAxis: [{
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }

        }],
        series: this.legendArr.map((item, i) => ({
          name: item,
          type: 'bar',
          itemStyle: {
            normal: {
              color: colorArr[i]
            }
          },
          barWidth: 20,
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
    resizeTheChart() {
      if (this.$refs.regionChart) {
        this.$refs.regionChart.resize()
      }
    }
  }
}
</script>

<style scoped>
  .row-year.el-col{
    padding-left: 0px;
  }
    .row-tableBox{
    padding-left: 1px !important;
  }
</style>
