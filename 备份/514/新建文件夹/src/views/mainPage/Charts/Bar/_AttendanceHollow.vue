<template>
  <!-- 多组考勤空心柱状图 -->
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

          <div class="row-left">
            <div class="name">{{ item[0].desTitle }}</div>
            <div class="num"> <span style="color:#FACF2B">{{ item[0].val }}</span></div>
          </div>
          <div class="row-right">
            <div class="row-item">
              <span class="name">{{ item[1].desTitle }} </span>
              <span class="num" style="color:#52A3FF">{{ item[1].val }}</span>
            </div>
            <div class="row-item">
              <span class="name">{{ item[2].desTitle }} </span>
              <span class="num" style="color:#4CDFC1">{{ item[2].val }}</span>
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
    listNum: {
      type: Number,
      default: 4
    },
    width: {
      type: String,
      default: '364px'
    },
    titleContten: {
      type: String,
      default: ''
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
              dataObj['同类学校中' + this.titleContten + '率最高的学校'] = element.itemArray[key]
              break
            case 'MINVAL':
              dataObj['同类学校中' + this.titleContten + '率最低的学校'] = element.itemArray[key]
              break
            case 'AVGVAL':
              dataObj['同类学校平均' + this.titleContten + '概率'] = element.itemArray[key]
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
            dimensions.push('同类学校中' + this.titleContten + '率最高的学校')
            break
          case 'MINNAME':
            dimensions.push('同类学校中' + this.titleContten + '率最低的学校')
            break
          case 'AVGNAME':
            dimensions.push('同类学校平均' + this.titleContten + '概率')
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
            barGap: 5,
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

<style lang="scss" scoped>
  .row-tableBox{

    .row-table{
      justify-content:center !important;

      .row-left{
        width: auto !important;
        padding-right: 5px;
        padding-top:5px !important;
        line-height: 18px;

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
    .row-right{

      .row-item{
        .name{
          color: #999
        }
        .num{color: #666}
      }
    }
  }
</style>
