<template>
  <div class="row-charts-item popComparison">
    <div class="row-title">各教育等级人口对比</div>
    <div class="row-tableBox">
      <div
        v-for="(item, i) in cahrtLabel"
        :key="i"
        class="row-table"
        :style="'width:33.3%'"
      >

        <div class="row-left">
          <div class="name">{{ item[0].desTitle }}</div>
          <div class="num"> <span>{{ item[0].val }}</span>人</div>
        </div>
        <div class="row-right">
          <div class="row-item">
            <span class="name">人口最多:</span>
            <span class="num">{{ item[1].val }}</span>
          </div>
          <div class="row-item">
            <span class="name">人口最少:</span>
            <span class="num">{{ item[2].val }}</span>
          </div>
          <div class="row-item">
            <span class="name">平均人口：</span>
            <span class="num">{{ item[3].val }}</span>
          </div>
        </div>
      </div>
    </div>
    <chart id="chartLine" style="width: 100%; height:164px" :options="option" />
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
    }
  },
  data() {
    return {
      perBoxObj: []
    }
  },
  computed: {
    option() {
      const describesArr = this.group(this.chartData.describes, 4)
      const perBoxObj = []
      const most = ['最多']
      const least = ['最少']
      const average = ['平均']
      const status = ['product']
      const scName = ['name']
      const colors = ['#52A3FF', '#4CDFC1', '#FACF2B']
      this.chartData.datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[this.chartData.columns[key]] = element.itemArray[key]
        }

        perBoxObj.push(dataObj)
      })
      perBoxObj.forEach((element) => {
        status.push(element.LEVEDU)
        most.push(element.MAXNUM)
        const num = ((element.MIDNUM + '').indexOf('.') !== -1) ? element.MIDNUM.toFixed(2) : element.MIDNUM
        average.push(num)
        least.push(element.MINNUM)
        scName.push(element.MAXNAME)
      })
      console.log(scName)
      return {
        legend: {
          show: true,
          bottom: '10'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} {b} {c} {d})'
        },
        dataset: {
          source: [
            status,
            most,
            average,
            least,
            scName
          ]
        },
        xAxis: [
          { type: 'category', gridIndex: 0,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            name: '(人)',
            nameLocation: 'start',
            nameGap: 10,
            nameTextStyle: {
              fontSize: 12,
              color: '#666',
              padding: [25, 0, 0, 0]
            }

          }
        ],
        yAxis: [
          { gridIndex: 0,
            axisTick: { show: false },
            axisLine: { show: false }

          }
        ],
        grid: {
          top: 20,
          left: 60,
          right: 20,
          bottom: 30,
          containLabel: true
        },
        series: describesArr.map((element, i) => ({
          name: element.desTitle,
          type: 'bar',
          barWidth: '20%',
          seriesLayoutBy: 'row',
          itemStyle: {
            normal: {
              color: colors[i],
              label: { show: true,
                formatter: '{a}'
              }
            }
          },
          label: {
            formatter: '{d}'
            // backgroundColor: '#eee',
            // borderColor: '#aaa',
            // borderWidth: 1,
            // borderRadius: 4
          },
          emphasis: {
            itemStyle: {
              // color: '#52A3FF',
            },
            label: { show: true }
          }
        }))
      }
    },
    // option() {
    //   const perBoxObj = []
    //   const describesArr = this.group(this.chartData.describes, 4)
    //   const sourceArr = []
    //   const sourceitem = ['product']
    //   const MAXNAME = ['Matcha Latte']
    //   const MAXNUM = ['Milk Tea']
    //   this.chartData.datas.forEach((element) => {
    //     const dataObj = {}
    //     for (var key in element.itemArray) {
    //       dataObj[this.chartData.columns[key]] = element.itemArray[key]
    //     }

    //     perBoxObj.push(dataObj)
    //   })

    //   perBoxObj.forEach(element => {
    //     sourceitem.push(element.LEVEDU)
    //     MAXNAME.push(element.MAXNAME)
    //     MAXNUM.push(element.MAXNUM)
    //   })
    //   sourceArr.push(sourceitem)
    //   sourceArr.push(MAXNUM)
    //   sourceArr.push(MAXNAME)

    //   console.log(sourceArr)
    //   console.log(describesArr)
    //   return {
    //     dataset: {
    //       source: sourceArr
    //     },
    //     xAxis: [
    //       { type: 'category', gridIndex: 0,
    //         splitLine: { show: false },
    //         axisLine: { show: false },
    //         axisTick: { show: false },
    //         name: '(人)',
    //         nameLocation: 'start',
    //         nameGap: 10,
    //         nameTextStyle: {
    //           fontSize: 12,
    //           color: '#666',
    //           padding: [25, 0, 0, 0]
    //         }
    //       }
    //     ],
    //     yAxis: [
    //       { gridIndex: 0,
    //         axisTick: { show: false },
    //         axisLine: { show: false }
    //       }
    //     ],
    //     grid: {
    //       top: 20,
    //       left: 60,
    //       right: 20,
    //       bottom: 30,
    //       containLabel: true
    //     },
    //     legend: {
    //       show: true,
    //       bottom: '10'
    //     },
    //     series: describesArr.map(element => (
    //       {
    //         name: element.desTitle,
    //         type: 'bar',
    //         barWidth: '20%',
    //         seriesLayoutBy: 'row',
    //         itemStyle: {
    //           normal: {
    //             color: '#52A3FF'
    //           }
    //         },
    //         nameTextStyle: {
    //           fontSize: 12,
    //           color: '#666',
    //           padding: [30, 0, 0, 0]
    //         },
    //         label: {
    //           show: true,
    //           position: 'bottom'
    //         }
    //       }
    //     ))
    //     // series: [
    //     //   {
    //     //     name: '人口最多的学校',
    //     //     type: 'bar',
    //     //     barWidth: '20%',
    //     //     seriesLayoutBy: 'row',
    //     //     itemStyle: {
    //     //       normal: {
    //     //         color: '#52A3FF'
    //     //       }
    //     //     },
    //     //     nameTextStyle: {
    //     //       fontSize: 12,
    //     //       color: '#666',
    //     //       padding: [30, 0, 0, 0]
    //     //     },
    //     //     label: {
    //     //       show: true,
    //     //       position: 'bottom'
    //     //     }
    //     //   },
    //     //   {
    //     //     name: '人口最少的学校',
    //     //     type: 'bar',
    //     //     barWidth: '20%',
    //     //     seriesLayoutBy: 'row',
    //     //     nameGap: 10,
    //     //     nameTextStyle: {
    //     //       fontSize: 12,
    //     //       color: '#666',
    //     //       padding: [30, 0, 0, 0]
    //     //     },
    //     //     itemStyle: {
    //     //       normal: {
    //     //         color: '#4CDFC1'
    //     //       }
    //     //     },
    //     //     label: {
    //     //       show: true,
    //     //       position: 'bottom'
    //     //     }
    //     //   },
    //     //   {
    //     //     name: '平均人口',
    //     //     type: 'bar',
    //     //     barWidth: '20%',
    //     //     seriesLayoutBy: 'row',
    //     //     itemStyle: {
    //     //       normal: {
    //     //         color: '#FACF2B'
    //     //       }
    //     //     },
    //     //     nameTextStyle: {
    //     //       fontSize: 12,
    //     //       color: '#666',
    //     //       padding: [30, 0, 0, 0]
    //     //     },
    //     //     label: {
    //     //       show: true,
    //     //       position: 'bottom'
    //     //     }
    //     //   }
    //     // ]
    //   }
    // },
    cahrtLabel() {
      return this.group(this.chartData.describes, 4)
    }
  },
  methods: {
    group(array, subGroupLength) {
      let index = 0
      const newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength))
      }
      return newArray
    }
  }
}
</script>

<style lang="scss" scoped>
  .row-tableBox{
    display: flex;

    .row-table{
      display: flex;
      .row-left{
        width: 80px;
        padding-top:15px;
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
      padding-top: 5px;
      line-height: 18px;
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
