<template>
  <!-- 成绩折线图 文字倾斜-->
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
              <span>{{ unit }}</span>

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
      return {
        legend: {
          data: this.legendArr,
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
          left: 20,
          right: 20,
          bottom: 40,
          containLabel: true
        },
        tooltip: {
          trigger: 'item'
        },
        color: ['#4CDFC1', '#FACF2B', '#52A3FF'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: datas.map(item => item.itemArray[1]),
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
          boundaryGap: false,
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
        series: this.legendArr.map((item, i) => ({
          name: item,
          type: 'line',
          data: datas.map(item => item.itemArray[i + 2])
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

</style>

<style >
.row-tableBox{
    padding-left: 0px !important;
  }
</style>

