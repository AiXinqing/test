<template>
  <!-- 单一实心柱状图 -->
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
          <div
            v-if="titleNum <=1"
            class="title-row row-col1"
          >
            <span class="name">{{ item[0].desTitle }} </span>
            <span class="num">{{ item[0].val }}</span>

          </div>

          <div
            v-else-if="titleNum === 2 && compare === 2"
            class="title-row row-col2 "
          >
            <div>
              <span class="num-compareCon"> {{ item[0].desTitle }} </span>
              <span class="num-name" style="color: rgb(82, 163, 255);">{{ item[0].val }}</span>
            </div>
            <div>
              <span class="num-compareCon"> {{ item[1].desTitle }} </span>
              <span class="num-name" style="color: rgb(82, 163, 255);">{{ item[1].val }}</span>
            </div>
          </div>
          <div v-else class="title-row row-col2 ">
            <span class="name">{{ item[0].desTitle }} </span>
            <div>
              <span class="num-name">{{ item[0].val }}</span>
              <span class="name">{{ unit }}</span>
              <span class="num-compareCon"> {{ item[1].desTitle }} </span>
              <span
                class="num-compare"
              >
                {{ item[1].val }}{{ item[1].val ==='∞'?'': percentSign }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
      ref="regionChart"
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
      default: 'calc(100% - 30px)'
    },
    unit: {
      type: String,
      default: ''
    },
    percentSign: {
      type: String,
      default: '%'
    },
    titleNum: {
      type: Number,
      default: 1
    },
    compare: {
      type: Number,
      default: 0
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
      const labelName = []
      const labelVal = []

      this.chartData.datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          if (key === '0') {
            dataObj['name'] = element.itemArray[key]
          } else if (key === '1') {
            dataObj['value'] = element.itemArray[key]
          }
        }
        perBoxObj.push(dataObj)
        element.itemArray.forEach((row, i) => {
          if (i === 0) {
            labelName.push(row)
          } else if (i === 1) {
            labelVal.push(row)
          }
        })
      })
      return {
        tooltip: {
          enterable: true,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var relVal = '<span style="width:10px;display: inline-block;height: 10px;background:#4CDFC1;border-radius: 50%;">' +
            '</span> ' + params[0].name
            relVal += ': <span>' + params[0].value + '</span> '

            return relVal
          }
        },
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 5,
          containLabel: true
        },
        color: ['#4CDFC1', '#FACF2B', '#52A3FF', '#748FFC', '#66D9E8'],
        xAxis: {
          type: 'category',
          boundaryGap: [0, 0.01],
          axisTick: { show: false },
          data: labelName,
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
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
        series: [
          {
            name: '2011年',
            type: 'bar',
            barWidth: 12,
            data: labelVal
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
      if (this.$refs.regionChart) {
        this.$refs.regionChart.resize()
      }
    }
  }
}
</script>

<style scoped>
  .row-year.el-col{
    padding-left: 0;
  }
   .row-tableBox{
    padding-left: 1px !important;
  }
</style>
