<template>
  <!-- 原型 饼图 -->
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
            v-if="titleLong <=1"
            class="title-row row-col1"
          >
            <span class="name">{{ item[0].desTitle }} </span>
            <span class="num">{{ item[0].val }}</span>
            <span class="name">{{ unit }}</span>
          </div>
          <div
            v-else
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
                {{ item[1].val }}{{ item[1].val ==='∞'?'': percentSign }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
      ref="chartsPie"
      style="width: 100%;min-width:364px"
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
    percentSign: {
      type: String,
      default: '%'
    },

    titleName: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: 'auto'
    },
    seriesName: {
      type: String,
      default: '访问来源'
    },
    unit: {
      type: String,
      default: '人'
    },
    titleLong: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      myChart: null,
      clientHeight: 0,
      cardHeight: 263,
      chartHeight: 0
    }
  },
  computed: {
    cahrtLabel() {
      return this.group(this.chartData.describes, this.titleLong)
    },
    option() {
      const { datas } = this.chartData
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'left',
          bottom: 0,
          itemWidth: 14,
          itemHeight: 6,
          data: datas.map((item, i) => item.itemArray[0]),
          textStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        color: ['#52A3FF', '#FACF2B', '#4CDFC1', '#748FFC', '#66D9E8'],
        label: {
          formatter: '{d}%',
          position: 'inner'
        },
        series: [
          {
            name: this.seriesName,
            type: 'pie',
            selectedMode: 'single',
            radius: '55%',
            center: ['50%', '45%'],
            data: datas.map((item, i) => ({
              name: item.itemArray[0],
              value: item.itemArray[1],
              selected: i > 0 ? 1 : false
            })),
            selectedOffset: 6,
            clockwise: false,
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              },
              label: {
                formatter: '{c}' + this.unit,
                position: 'inner'
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
      if (this.$refs.popComparison) {
        this.$refs.chartsPie.resize()
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
    padding-left: 0 !important;
  }
</style>

