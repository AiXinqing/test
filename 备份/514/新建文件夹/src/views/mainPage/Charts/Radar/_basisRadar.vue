<template>
  <!-- 单一折线图 -->
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
            class="name"
          >
            {{ item[0].desTitle }}
            <div>
              <div class="num">
                <span class="num-data" style="font-size:12px;color:rgb(82, 163, 255)">{{ item[0].val }} </span>
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
      const { datas } = this.chartData
      const max = 100
      const min = 0
      const valData = datas.map(item => ({ value: item.itemArray }))

      return {
        color: ['#4CDFC1', '#52A3FF', '#FACF2B', '#748FFC', '#66D9E8'],
        tooltip: {},
        radar: {
          nameGap: 10,
          name: {
            textStyle: {
              color: '#666'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#fff', '#fff', '#fff', '#fff'],
              shadowColor: '#37A2DA'
            }
          },
          indicator: [{
            name: '消费频率指数',
            max: max,
            min: min
          },
          {
            name: '消费水平指数',
            max: max,
            min: min
          },
          {
            name: '物价水平指数',
            max: max,
            min: min
          },
          {
            name: '覆盖度指数',
            max: max,
            min: min
          }
          ]

        },
        polar: {},
        angleAxis: {
          min: 0,
          max: 360,
          interval: 5,
          clockwise: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          min: min,
          max: max,
          interval: 20,
          splitArea: {
            // show: true
          }
        },
        series: [{

          type: 'radar',
          areaStyle: {
            opacity: 0.1
          },
          lineStyle: {
            width: 1
          },
          data: [{
            value: valData[0].value,
            name: '区间内消费指标概览'
          }]
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

