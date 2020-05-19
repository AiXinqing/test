<template>
  <!-- 单一空心柱状图 蓝色-->
  <div
    v-if="option.dataset.source.length > 0"
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
          <div class="name">{{ item[0].desTitle }}<div>
            <div class="num">
              <span class="num-data" style="font-size:14px;color:#52A3FF">{{ item[0].val }} </span>
              {{ unit }}
            </div>
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
      default: '(人)'
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
          left: 57,
          bottom: 0,
          itemWidth: 14,
          itemHeight: 6,
          textStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        color: ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8'],
        dataset: {
          source: [
            ['product', ...datas.map(itme => itme.itemArray[3] + '(' + itme.itemArray[0] + ')')],
            ...this.legendArr.map((item, i) => {
              const dataVal = datas.map(item => item.itemArray[i + 1])
              const Arr = [item, ...dataVal]
              return Arr
            })
          ]
        },
        xAxis: [
          { type: 'category', gridIndex: 0 }
        ],
        yAxis: [
          { gridIndex: 0 }
        ],
        series: this.legendArr.map((item, i) => ({
          name: item,
          type: 'bar',
          seriesLayoutBy: 'row',
          barWidth: 20
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
