<template>
  <!-- 原型 饼图 -->
  <div
    v-if="option.series.data.length > 0"
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
            class="title-row row-col1"
          >
            <span class="name">{{ item[0].desTitle }} </span>
            <div>
              <span class="num">{{ item[0].val }}</span>
              <span class="name">{{ unit }}</span>
            </div>

          </div>

        </el-col>
      </el-row>
    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
      ref="chartsPie"
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
      default: '人'
    },
    width: {
      type: String,
      default: 'auto'
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
      return {
        legend: {
          show: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: {
          type: 'pie',
          clockWise: false,
          radius: [50, 60],
          hoverAnimation: false,
          silent: true,
          center: ['50%', '50%'],

          data: [{
            value: 100 - (datas[0].itemArray * 100),
            itemStyle: {
              normal: {
                color: '#52A3FF',
                borderWidth: 1,
                borderColor: '#52A3FF'
              }
            },
            labelLine: {
              show: false
            }
          },
          {
            value: datas[0].itemArray * 100,
            label: {
              normal: {
                rich: {
                  a: {
                    color: '#4CDFC1',
                    align: 'center',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }
                },
                formatter: function(params) {
                  return '{a|' + params.value + '%}'
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'normal',
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#4CDFC1',
                shadowColor: '#82ffff',
                borderWidth: 2,
                borderColor: '#82ffff',
                shadowBlur: 10
              }
            }
          }]
        }
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

