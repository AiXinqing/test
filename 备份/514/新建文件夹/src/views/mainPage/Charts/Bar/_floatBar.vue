<template>
  <!-- 浮动柱状图 -->
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
                style="color:#52A3FF"
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
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar = params[1]
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
          }
        },
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 20,
          containLabel: true
        },
        color: ['#FACF3a'],
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数'],
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
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
          },
          {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'inside'
            },
            data: [2900, 1200, 300, 200, 900, 300]
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
  .row-tableBox{padding-left: 0px;}
</style>

