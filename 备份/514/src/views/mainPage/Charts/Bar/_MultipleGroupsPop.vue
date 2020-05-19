<template>
  <div
    v-if="option.dataset.source.length > 0"
    ref="cardItem"
    class="row-charts-item popComparison"
    :style="{width:width}"
  >
    <!-- 多组柱状图 -->
    <div ref="explanationInfo">
      <div class="row-title">{{ titleName }}</div>
      <el-row
        v-if="cahrtLabel.length > 0"
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
            <div class="num"> <span>{{ item[0].val }}</span>人</div>
          </div>
          <div class="row-right">
            <div class="row-item">
              <span class="name">{{ item[1].desTitle }}: </span>
              <span class="num" style="color:#52A3FF">{{ item[1].val }}人</span>
            </div>
            <div class="row-item">
              <span class="name">{{ item[2].desTitle }}: </span>
              <span class="num" style="color:#4CDFC1">{{ item[2].val }}人</span>
            </div>
            <div class="row-item">
              <span class="name">{{ item[3].desTitle }}: </span>
              <span class="num" style="color:#FACF2B">{{ item[3].val }}人</span>
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
    dimensionsArray: {
      type: Array,
      default: () => []
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
    },
    splitNumber: {
      type: Number,
      default: 0
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
      const { datas, columns } = this.chartData
      const colors = ['#52A3FF', '#4CDFC1', '#FACF2B', '#748FFC', '#66D9E8']
      datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          switch (columns[key]) {
            case 'MAXNUM':
              dataObj[this.dimensionsArray[0]] = element.itemArray[key]
              break
            case 'MINNUM':
              dataObj[this.dimensionsArray[1]] = element.itemArray[key]
              break
            case 'MIDNUM':
              dataObj[this.dimensionsArray[2]] = element.itemArray[key]
              break
            default:
              dataObj[columns[key]] = element.itemArray[key]
          }
        }
        perBoxObj.push(dataObj)
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
        grid: {
          top: 20,
          left: 0,
          right: 20,
          bottom: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'item'
        },
        dataset: {
          dimensions: ['LEVEDU', ...this.dimensionsArray],
          source: perBoxObj
        },
        xAxis: [
          { type: 'category',
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            name: '(人)',
            nameLocation: 'start',
            nameGap: 10,
            nameTextStyle: {
              fontSize: 11,
              color: '#666',
              padding: [25, 0, 0, 0]
            },
            offset: 20
          }
        ],
        yAxis: {
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          splitNumber: this.splitNumber
        },
        series: this.dimensionsArray.map((item, i) => ({
          type: 'bar',
          showBackground: true,
          itemStyle: {
            normal: {
              color: colors[i]
            }
          },
          barWidth: 12,
          barGap: 5,
          label: {
            show: true,
            position: 'bottom',
            offset: [0, 0],
            color: '#999',
            fontSize: 10
          }
        }))
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
