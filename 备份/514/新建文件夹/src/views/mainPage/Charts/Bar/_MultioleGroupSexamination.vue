<template>
  <!-- 多组考试柱状图 -->
  <div
    ref="cardItem"
    class="row-charts-item popComparison"
    :style="{width:width}"
  >
    <div ref="explanationInfo">
      <div class="row-title">{{ titleName }}</div>
      <el-row
        v-if="cahrtLabel.length > 0 "
        class="row-tableBox"
      >
        <el-col
          v-for="(item, i) in cahrtLabel"
          :key="i"
          class="row-table"
          :span="Math.ceil(24/cahrtLabel.length)"
        >
          <!-- {{ item }} -->
          <div class="label-item">
            <div class="name" style="margin-top: 2px;">
              <span class="row-min">{{ item[0].desTitle }} </span>
              <span class="num"> {{ item[0].val }} </span>
              <span class="name"> {{ item[1].desTitle }} </span>
              <span style="color:#52A3FF">{{ item[1].val }}</span>
            </div>
            <div class="name">
              <span class="row-min">{{ item[2].desTitle }} </span>
              <span class="num"> {{ item[2].val }} </span>
              <span class="name"> {{ item[3].desTitle }} </span>
              <span style="color:#4CDFC1">{{ item[3].val }}</span>
            </div>
            <div class="name">
              <span class="row-min">{{ item[4].desTitle }} </span>
              <span class="num"> {{ item[4].val }} </span>
              <span class="name"> {{ item[5].desTitle }} </span>
              <span style="color:#FACF2B">{{ item[5].val }}</span>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <chart
      v-if="chartData.datas.length > 0 && chartHeight > 0"
      id="chartLine"
      ref="popComparison"
      style="width: 100%; "
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
      default: ''
    },
    width: {
      type: String,
      default: '364px'
    },
    listNum: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      perBoxObj: [],
      clientHeight: 0,
      cardHeight: 263,
      chartHeight: 0
    }
  },
  computed: {
    option() {
      const perBoxObj = []
      const dimensions = ['product']
      const labelVal = []
      const { datas, columns } = this.chartData
      datas.forEach((element, i) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          switch (columns[key]) {
            case 'LEVEDU':
              dataObj[columns[key]] = element.itemArray[key]
              break
            default:
              dataObj[columns[key]] = element.itemArray[key]
          }
        }
        perBoxObj.push(dataObj)
      })
      const Arr1 = ['1']
      const Arr2 = ['2']
      const Arr3 = ['3']
      perBoxObj.forEach((element) => {
        dimensions.push(element.LEVEDU)

        switch (element.ORDER_) {
          case 1:
            Arr1.push(element.VAL.toFixed(2))
            break
          case 2:
            Arr2.push(element.VAL.toFixed(2))
            break
          case 3:
            Arr3.push(element.VAL.toFixed(2))
            break
          default:
        }
      })
      labelVal.push(Arr1, Arr2, Arr3)

      return {
        legend: {
          left: 30,
          bottom: 5,
          itemWidth: 14,
          itemHeight: 6,
          textStyle: {
            color: '#666',
            fontSize: 12
          },
          show: false
        },
        tooltip: { trigger: 'item' },
        dataset: {
          source: [
            Array.from(new Set(dimensions)),
            ...labelVal

          ]
        },
        xAxis: [
          { type: 'category', gridIndex: 0,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            name: '',
            nameLocation: 'start',
            nameGap: 10,
            nameTextStyle: {
              fontSize: 13,
              color: '#666',
              padding: [25, 0, 0, 0]
            },
            offset: 20
          }
        ],
        yAxis: [
          { gridIndex: 0,
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 25,
          containLabel: true
        },
        series: [
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            itemStyle: {
              normal: {
                color: '#52A3FF'
              }
            },
            barWidth: 12,
            barGap: 5,
            grid: {
              top: 20,
              left: 0,
              right: 20,
              bottom: 45,
              containLabel: true
            },
            label: {
              show: true,
              position: 'bottom',
              offset: [0, 0],
              color: '#999',
              fontSize: 10,
              formatter: (params) => {
                return params.$vars.seriesName
              }
            }
          },
          { type: 'bar',
            seriesLayoutBy: 'row',
            itemStyle: {
              normal: {
                color: '#4CDFC1'
              }
            },
            barWidth: 12,
            barGap: 5,
            label: {
              show: true,
              position: 'bottom',
              offset: [0, 0],
              color: '#999',
              fontSize: 10,
              formatter: (params) => { return params.$vars.seriesName }
            }
          },
          { type: 'bar',
            seriesLayoutBy: 'row',
            itemStyle: {
              normal: {
                color: '#FACF2B'
              }
            },
            barWidth: 12,
            barGap: 5,
            label: {
              show: true,
              position: 'bottom',
              offset: [0, 0],
              color: '#999',
              fontSize: 10,
              formatter: (params) => { return params.data.SCHNAME }
            }
          }
        ]
      }
    },
    cahrtLabel() {
      return this.group(this.chartData.describes, 6)
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
        this.$refs.popComparison.resize()
      }
    }
  }
}
</script>

<style scoped>
  .row-tableBox{
    padding-left: 30px;
  }
</style>

<style lang="scss">
  .row-tableBox{

    .row-table{
      justify-content:center;
    }
    .label-item {
      font-size: 12px;
      color: #999;
      line-height: 20px;

      .num{
        color: #666;
        display: inline-block;
        font-size: 14px;
      }

      .row-min{
        display: inline-block;
        margin-right: 5px;
      }
    }
    .row-table:nth-child(n+2){
      margin-left: 20px;
    }
  }
</style>
