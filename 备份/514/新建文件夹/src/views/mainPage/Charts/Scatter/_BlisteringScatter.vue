<template>
  <!-- 分散起泡 -->
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
            v-if="titleNum === 1"
            class="name"
          >
            {{ item[0].desTitle }}
            <div>
              <div class="num">
                <span
                  class="num-data"
                  style="font-size:14px;color:#52A3FF"
                >{{ item[0].val }} </span>
              </div>
            </div>
          </div>
          <div
            v-else
            class="name"
          >
            <div>
              <span class="num-data">{{ item[0].desTitle }}</span>
              <span
                class="num-data"
                style="font-size:14px;color:#52A3FF"
              > {{ item[0].val }}</span>
            </div>
            <div>
              <span class="num-compareCon"> {{ item[1].desTitle }} </span>
              <span
                class="num-compare"
                style="font-size:14px;color:#52A3FF"
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
    },
    unit: {
      type: Array,
      default: () => []
    },
    titleNum: {
      type: Number,
      default: 2
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

      const { datas } = this.chartData
      const data = [[], []]
      datas.forEach((element, i) => {
        const dataObj = {}
        data[i].push(element.itemArray)
        for (var key in element.itemArray) {
          dataObj[this.chartData.columns[key]] = element.itemArray[key]
        }
        perBoxObj.push(dataObj)
      })

      const seriesData = []
      const list = []
      const bolArr = []

      perBoxObj.forEach(item => {
        list.push([item.HBVAL, item.HVAL], [item.TBVAL, item.TVAL])
        bolArr.push(item.HBVAL, item.TBVAL)
      })

      const dataMaxs = Math.max(...bolArr.map(item => item))
      const dataMins = Math.min(...bolArr.map(item => item))

      list.forEach((element, i) => {
        seriesData.push({
          type: 'scatter',
          symbolSize: function(dataItem) {
            const bol = (50 - 18) / (dataMaxs - dataMins) === Infinity ? 1 : (50 - 18) / (dataMaxs - dataMins)
            const bolSize = bol * (dataItem[2] - dataMins) + 18
            return bolSize
          },
          label: {
            emphasis: {
              show: true,
              formatter: function(param) {
                return param.data[1]
              },
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: i === 0 ? '#52A3FF' : '#4CDFC1'
            }
          },
          data: [[this.unit[i], element[1] + '', element[0]]]
        })
      })

      return {
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#7AA0BB', '#9FBEDD', '#BCD4E1'],
        backgroundColor: '#fff',
        textStyle: {
          color: '#666'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              type: 'dashed',
              width: 2,
              color: '#ddd'
            },
            animation: true
          }
        },
        legend: {
          data: this.unit,
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
          bottom: 5,
          containLabel: true
        },
        yAxis: {
          data: list.map(item => item[1]).sort(),
          axisLine: {
            show: true,
            lineStyle: {
              color: ['#ddd']
            }
          }
        },
        xAxis: {
          data: this.unit,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        series: seriesData.reverse()
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

