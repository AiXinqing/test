<template>
  <!-- 多组 消费柱状图 -->
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

          <div v-if="item[0].desTitle !== undefined" class="row-content">
            <div class="row-item">
              <span class="name">{{ item[0].desTitle }}：</span>
              <span class="num" style="color:#52A3FF">{{ item[0].val }}</span>
            </div>
            <div class="row-item">
              <span class="name">{{ item[1].desTitle }}：</span>
              <span class="num" style="color:#4CDFC1">{{ item[1].val }}</span>
            </div>
            <div class="row-item">
              <span class="name">{{ item[2].desTitle }}：</span>
              <span class="num" style="color:#FACF2B">{{ item[2].val }}</span>
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
      const dimensions = ['LEVEDU']
      const { datas, columns } = this.chartData
      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          switch (columns[key]) {
            case 'MAXVAL':
              dataObj['最高'] = element.itemArray[key]
              break
            case 'MINVAL':
              dataObj['最低'] = element.itemArray[key]
              break
            case 'AVGVAL':
              dataObj['平均'] = element.itemArray[key]
              break
            default:
              dataObj[columns[key]] = element.itemArray[key]
          }
        }
        perBoxObj.push(dataObj)
      })
      columns.forEach((element) => {
        switch (element) {
          case 'MAXNAME':
            dimensions.push('最高')
            break
          case 'MINNAME':
            dimensions.push('最低')
            break
          case 'AVGNAME':
            dimensions.push('平均')
            break
          default:
        }
      })
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
        dataset: {
          dimensions: dimensions,
          source: perBoxObj
        },
        xAxis: [
          { type: 'category', gridIndex: 0,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            name: '(元)',
            nameLocation: 'start',
            nameGap: 10,
            nameTextStyle: {
              fontSize: 12,
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
          bottom: 50,
          containLabel: true
        },
        series: [
          {
            type: 'bar',
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
                return params.data.MAXNAME
              }
            }
          },
          { type: 'bar',
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
              formatter: (params) => { return params.data.MINNAME }
            }
          },
          { type: 'bar',
            itemStyle: {
              normal: {
                color: '#FACF2B'
              }
            },
            barWidth: 12,
            barGap: 6,
            label: {
              show: true,
              position: 'bottom',
              offset: [0, 0],
              color: '#999',
              fontSize: 10,
              formatter: (params) => { return params.data.AVGNAME }
            }
          }
        ]
      }
    },
    cahrtLabel() {
      return this.group(this.chartData.describes, this.listNum)
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

<style lang="scss">
  .row-tableBox{

    .row-table{
      justify-content:center;

      .row-left{
        width: 67px;
        padding-top:15px;

        .name{
          font-size:12px;
          color: #999;
        }
        .num{
          font-size: 12px;
          span{
            font-size: 14px;
            color: #666;
          }
          color: #999
        }
      }
    }

    .row-table:nth-child(n+2){
      margin-left: 20px;
    }

    .row-content{
      padding-top: 5px;
      line-height: 18px;
      padding-left: 13px;

      .row-item{
        font-size: 12px;

        .name{
          color: #999
        }
        .num{color: #666}
      }
    }
  }
</style>
