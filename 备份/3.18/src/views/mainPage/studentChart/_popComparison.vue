<template>
  <div class="row-charts-item popComparison">
    <div class="row-title">各教育等级人口对比</div>
    <el-row
      v-show="cahrtLabel.length > 0"
      class="row-tableBox"
    >
      <el-col
        v-for="(item, i) in cahrtLabel"
        :key="i"
        class="row-table"
        :span="24/cahrtLabel.length"
      >

        <div class="row-left">
          <div class="name">{{ item[0].desTitle }}</div>
          <div class="num"> <span>{{ item[0].val }}</span>人</div>
        </div>
        <div class="row-right">
          <div class="row-item">
            <span class="name">人口最多 : </span>
            <span class="num" style="color:#52A3FF">{{ item[1].val }}</span>
          </div>
          <div class="row-item">
            <span class="name">人口最少 : </span>
            <span class="num" style="color:#4CDFC1">{{ item[2].val }}</span>
          </div>
          <div class="row-item">
            <span class="name">平均人口 : </span>
            <span class="num" style="color:#FACF2B">{{ item[3].val }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
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
      const scNamebox = []
      const colors = ['#52A3FF', '#4CDFC1', '#FACF2B']
      this.chartData.datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[this.chartData.columns[key]] = element.itemArray[key]
        }

        perBoxObj.push(dataObj)
      })
      perBoxObj.forEach((element, is) => {
        status.push(element.LEVEDU)
        most.push(element.MAXNUM)
        const num = ((element.MIDNUM + '').indexOf('.') !== -1) ? element.MIDNUM.toFixed(2) : element.MIDNUM
        average.push(num)
        least.push(element.MINNUM)
        const name = []
        name.push('name' + is, element.MAXNAME, element.MIDNAME, element.MINNAME)
        scNamebox.push(name)
      })
      // const box = []
      // scNamebox.forEach((element, is) => {
      //   console
      //   box.push()
      // })
      return {
        legend: {
          show: true,
          bottom: '10'
        },
        tooltip: {
          trigger: 'item'
        },
        dataset: {
          // dimensions: ['product', '人口最多的学校', '平均人口', '人口最少的学校'],
          source: [
            status,
            most,
            average,
            least,
            ...scNamebox
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
              label: {
                show: true,
                trigger: 'item',
                formatter: '{@name' + i + '}'
              }
            }
          },
          // label: {
          //   formatter: '{@name' + i + '}'
          // },
          emphasis: {
            itemStyle: {
              // color: '#52A3FF',
            },
            label: { show: true }
          }
        }))
      }
    },
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

<style lang="scss">
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
