<template>
  <!-- 单一折线图 学生成绩班内变化-->
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
                <i class="el-icon-caret-top" /> {{ item[1].val }}{{ item[1].val ==='∞'?'': percentSign }}</span>
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
    unit: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '364px'
    },
    percentSign: {
      type: String,
      default: '%'
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
      const { datas } = this.chartData
      return {
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 20,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(a) {
            let str = '<span style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: #52A3FF;position: relative;top:-2px"></span> '
            str += a[0].axisValue + ': ' + a[0].value
            return str
          },
          axisPointer: {
            lineStyle: {
              type: 'dotted',
              color: '#52A3FF'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: datas.map(item => item.itemArray[0]),
          position: 'top',
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false }
          //
        },
        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          inverse: true
        },
        series: [{
          data: datas.map(item => item.itemArray[2]),
          type: 'line',
          color: '#52A3FF',
          symbol: 'none'
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

