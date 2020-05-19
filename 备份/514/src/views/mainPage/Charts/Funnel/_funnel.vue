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
          :span="24/cahrtLabel.length"
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
                {{ item[1].val }}{{ item[1].val ==='∞'?'': percentSign }}</span>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
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
    percentSign: {
      type: String,
      default: '%'
    },
    seriesName: {
      type: String,
      default: '访问来源'
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
      return this.group(this.chartData.describes, 2)
    },
    option() {
      const { datas } = this.chartData
      const colors = ['#4CDFC1', '#FACF2B', '#52A3FF']
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          top: '0',
          bottom: 5,
          itemWidth: 14,
          itemHeight: 6,
          data: datas.map(item => item.itemArray[0]),
          textStyle: {
            color: '#666',
            fontSize: 12
          }
        },
        calculable: true,
        series: [{
          name: this.seriesName,
          type: 'funnel',
          sort: 'ascending',
          label: {
            normal: {
              position: 'inside',
              padding: [0, 0, -12, 0],
              formatter: function(params) {
                var text = '{b|' + params.name + '} {a|' + params.value + '%}'
                return text
              },
              rich: {
                a: {
                  color: '#fff',
                  fontSize: '14',
                  align: 'center',
                  border: 0,
                  padding: [0, 2, 0, 0]
                },
                b: {
                  fontSize: '12',
                  color: '#fff',
                  border: 0
                }
              }
            }
          },
          data: datas.map((item, i) => ({
            name: item.itemArray[0],
            value: item.itemArray[1],
            itemStyle: {
              color: colors[i]
            }
          }))
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
    padding-left: 0 !important;
  }
</style>

