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
            <div>
              <span class="num-compare">
                <i v-if="item[0].val.indexOf('-') == -1" class="el-icon-caret-top" /> <i
                  v-else
                  class="el-icon-caret-bottom"
                /> {{ item[0].val }}{{ item[0].val === '∞'?'': '' }}</span>
            </div>
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
      const perBoxObj = []

      const gradeList = []
      const chartBox = []

      const { datas, columns } = this.chartData
      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[columns[key]] = element.itemArray[key]
        }
        perBoxObj.push(dataObj)
      })
      perBoxObj.forEach((item, i) => {
        gradeList.push({
          value: item.LEVEDU,
          textStyle: item.FLAG === 1 ? { color: '#52A3FF' } : { color: '#666' }
        })
      })

      const gradeBox = Array.from(new Set(datas.map(item => item.itemArray[0])))
      const long = Array.from(new Set(datas.map(item => item.itemArray[1])))

      const lineData = this.group(perBoxObj, long.length)

      lineData.forEach((item, i) => {
        const dataArr = item.map(element => ({
          value: element.VAL,
          flag: element.FLAG
        }))
        chartBox.push({
          name: item[0].LEVEDU,
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {}},
          data: dataArr,
          lineStyle: {
            width: 0
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
          data: gradeBox // 去重
        },
        color: ['#52A3FF', '#FACF2B', '#4CDFC1'],
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: long,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
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

