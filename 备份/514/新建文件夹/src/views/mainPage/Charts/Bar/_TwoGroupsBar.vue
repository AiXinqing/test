<template>
  <!-- 两组柱状图 -->
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
                style="color:#4CDFC1"
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
    titleNum: {
      type: Number,
      default: 2
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
      return this.group(this.chartData.describes, this.titleNum)
    },
    option() {
      const perBoxObj = []
      const dimensions = []
      const grade = []
      const { datas, columns } = this.chartData

      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[columns[key]] = element.itemArray[key]
        }
        perBoxObj.push(dataObj)
      })
      perBoxObj.forEach((element) => {
        dimensions.push(element.ATTTYPE)
        grade.push(element.GRADE)
      })
      const dataShow = this.group(perBoxObj, 2)
      const seriesData = []
      Array.from(new Set(dimensions)).forEach((element, i) => {
        seriesData.push({
          name: element,
          type: 'bar',
          barWidth: '20',
          data: dataShow.map((row) => row[i].VAL || 0),
          color: i === 0 ? '#52A3FF' : '#4CDFC1'
        })
      })

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
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
          top: 20,
          left: 0,
          right: 20,
          bottom: 35,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: Array.from(new Set(grade)),

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

