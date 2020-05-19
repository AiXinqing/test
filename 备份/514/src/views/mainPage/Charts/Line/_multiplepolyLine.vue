<template>
  <!-- 多条折线图 -->
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
          <div
            class="title-row row-col2"
          >
            <span class="name">{{ item[0].desTitle }} </span>
            <div>
              <span class="num-name">{{ item[0].val }}</span>
              <span class="name">{{ unit }}</span>
              <span class="num-compareCon"> {{ item[1].desTitle }} </span>
              <span
                class="num-compare"
              >
                <i v-if="parseFloat(item[1].val ) >0" class="el-icon-caret-top" /> {{ item[1].val }}{{ item[1].val === '∞'?'': item[1].val === ''?'': item[1].val === null?'': percentSign }}</span>

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
    percentSign: {
      type: String,
      default: '%'
    },
    width: {
      type: String,
      default: '364px'
    },
    unit: {
      type: String,
      default: ''
    },
    titleName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dataIndexs: 0,
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
      const perBoxObj = []
      const gradeList = []
      const line = []
      const { datas, columns } = this.chartData
      const chartBox = []
      const legendData = datas.map(item => item.itemArray[1])
      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[columns[key]] = element.itemArray[key]
        }
        perBoxObj.push(dataObj)
      })
      perBoxObj.forEach((item, i) => {
        line.push(item.LEVEDU)
        gradeList.push({
          value: item.LEVEDU,
          textStyle: item.FLAG === 1 ? { color: '#52A3FF' } : { color: '#666' }
        })
      })
      const long = Array.from(new Set(line))

      const gradeData = gradeList.splice(0, long.length)
      const lineData = this.group(perBoxObj, long.length)

      lineData.forEach(item => {
        const dataArr = item.map(element => ({
          value: element.VAL,
          flag: element.FLAG

        }))
        chartBox.push({
          name: item[0].TIMEPART,
          type: 'line',
          stack: '总量',
          data: dataArr,
          symbolSize: function(item, itemObj) {
            const lineItem = datas.filter(item => item.itemArray[3] === 1)
            if (lineItem[0].itemArray[3] === itemObj.data.flag) {
              return 10
            } else {
              return 4
            }
          }
        })
      })
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 57,
          bottom: 0,
          textStyle: {
            color: '#666',
            fontSize: 12
          },
          data: Array.from(new Set(legendData)).reverse() // 去重
        },
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 30,
          containLabel: true
        },

        color: ['#4CDFC1', '#FACF2B', '#52A3FF'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: gradeData,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false }
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
        series: chartBox.reverse()
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

