<template>
  <!-- 横向柱状图 -->
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
            <span class="num-compareCon"> {{ item[0].desTitle }}</span>
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
      const { datas, columns } = this.chartData
      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[columns[key]] = element.itemArray[key]
        }
        perBoxObj.push(dataObj)
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
        xAxis: {
          type: 'value',
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }

        },
        yAxis: {
          type: 'category',
          data: perBoxObj.map(item => item.SCHNAME),
          splitLine: { show: false },
          offset: '0',
          axisTick: {
            alignWithLabel: true,
            inside: true
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#666'
            }
          }
        },
        series: [
          {
            // name: '2011年',
            type: 'bar',
            barWidth: 12,
            data: perBoxObj.map(item => item.VAL),
            itemStyle: {
              normal: {
                color: function(params) {
                  let colors = '#4CDFC1'
                  if (params.data.FLAG === 1) {
                    colors = '#52A3FF'
                  }
                  return colors
                },
                borderColor: '#4CDFC1'
              }
            },
            emphasis: { // houver
              itemStyle: {
                color: '#4CDFC1'

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

<style lang="scss">
  .row-year{
    font-size: 12px;
    color: #999;
    padding-top: 5px;
    line-height: 20px;
    display: flex;
    .num{
      .num-data{
        font-size: 12px;
        color: #52A3FF
      }
      .num-compare{
        color: #52A3FF;
      }
    }
  }
</style>

