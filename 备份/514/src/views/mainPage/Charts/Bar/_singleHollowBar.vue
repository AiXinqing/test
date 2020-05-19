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
          <div
            v-if="titleNum <=1"
            class="title-row row-col2"
          >
            <span class="name">{{ item[0].desTitle }} </span>
            <div>
              <span class="num-name">{{ item[0].val }}</span>
              <span class="name">{{ unit }}</span>
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
      default: '343px'
    },
    xAxisName: {
      type: String,
      default: '人'
    },
    titleNum: {
      type: Number,
      default: 1
    },
    percentSign: {
      type: String,
      default: '%'
    },
    unit: {
      type: String,
      default: ''
    },
    dataLong: {
      type: Number,
      default: 2
    },
    gridLeft: {
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
      return this.group(this.chartData.describes, this.dataLong)
    },
    option() {
      const { datas } = this.chartData
      return {
        grid: {
          top: 20,
          left: this.gridLeft,
          right: 20,
          bottom: 5,
          containLabel: true
        },
        tooltip: {
          enterable: true,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var relVal = '<span style="width:10px;display: inline-block;height: 10px;background:#52A3FF;border-radius: 50%;">' +
            '</span> ' + params[0].name
            relVal += ': <span>' + params[0].value + '</span> '

            return relVal
          }
        },
        xAxis: [
          {
            type: 'category',
            name: this.xAxisName,
            data: datas.map((item) => ({
              value: item.itemArray[0],
              textStyle: item.itemArray[2] === '1' ? { color: '#52A3FF' } : item.itemArray[2] === 1 ? { color: '#52A3FF' } : { color: '#666' }
            })),
            nameLocation: 'start',
            nameGap: 10,
            nameTextStyle: {
              fontSize: 12,
              color: '#666',
              padding: [25, 0, 0, 0]
            },
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
        series: [ // selected
          {
            type: 'bar',
            barWidth: 12,
            data: datas.map((item) => ({
              value: item.itemArray[1],
              FLAG: item.itemArray[2]
            })),
            label: {
              formatter: '{a}'
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  let colors = '#fff'
                  if (parseInt(params.data.FLAG) === 1) {
                    colors = '#52A3FF'
                  }
                  return colors
                },
                borderColor: '#52A3FF'
              }
            },
            emphasis: { // houver
              itemStyle: {
                color: '#52A3FF'

              }
            }
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
    padding-left: 0px;
  }
    .row-tableBox{
    padding-left: 1px !important;
  }
</style>
