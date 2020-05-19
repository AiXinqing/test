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
      return this.group(this.chartData.describes, 1)
    },
    option() {
      const perBoxObj = []
      const timeline = []
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
        timeline.push(item.TIMEPART)
      })
      const gradeBox = ['消费频率', '消费水平', '物价水平', '覆盖度']

      gradeBox.forEach((ele, i) => {
        chartBox.push({
          name: ele,
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {}},
          data: perBoxObj.map(row => {
            switch (i) {
              case 0:
                return row.TVAL
              case 1:
                return row.CVAL
              case 2:
                return row.PVAL
              case 3:
                return row.OVAL
              default:
            }
          }),
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
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
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
            data: Array.from(new Set(timeline)),
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
        series: chartBox
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

