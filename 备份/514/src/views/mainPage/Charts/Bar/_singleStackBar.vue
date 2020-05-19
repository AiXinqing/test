<template>
  <!-- 堆叠单柱状图 -->
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
          stack: '总量',
          type: 'bar',
          barWidth: '40',
          label: {
            show: false,
            color: '#f7f7f7'
          },
          emphasis: {
            label: {
              show: true,
              color: '#666',
              formatter: function(param) {
                return param.data[1]
              }
            }
          },
          data: dataShow.map((row) => row[i].VAL)
        })
      })
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
          top: 20,
          left: 0,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: Array.from(new Set(grade)),
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
        color: ['#FACF2B', '#4CDFC1', '#52A3FF'],
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

