<template>
  <div class="row-charts-item">
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
        <div class="name">{{ item[0].desTitle }}<div>
          <div class="num">
            <span class="num-data">{{ item[0].val }}</span>
            人
            <span class="num-compareCon">{{ item[1].desTitle }}</span>
            <span class="num-compare">
              <i class="el-icon-caret-top" />{{ item[1].val }}%</span>
          </div>
        </div>
        </div>
      </el-col>
    </el-row>
    <chart id="chartLine" style="width: 334px; height:192px" :options="option" />

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
    }
  },
  computed: {
    cahrtLabel() {
      return this.group(this.chartData.describes, 2)
    },
    option() {
      const perBoxObj = []
      this.chartData.datas.forEach((element) => {
        const dataObj = {}
        for (var key in element.itemArray) {
          dataObj[this.chartData.columns[key]] = element.itemArray[key]
        }
        perBoxObj.push(dataObj)
      })

      const perChart = []
      perBoxObj.forEach((element) => {
        switch (this.titleName) {
          case '性别':
            perChart.push({
              name: element.SEX,
              value: element.VAL
            }, {
              name: '女',
              value: 3201,
              selected: true
            })
            break
          default:
            perChart.push({
              name: element.MOD,
              value: element.VAL
            })
        }
      })
      console.log(perBoxObj)
      return {
        // tooltip: {
        //   trigger: 'item'
        // },
        legend: {
          orient: 'vertical',
          left: 10
        },
        color: ['#52A3FF', '#FACF2B', '#4CDFC1'],
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: '55%',
            center: ['50%', '50%'],
            data: perChart,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              },
              label: {
                formatter: '{d}%'
              }
            },
            labelLine: {
              normal: {
                show: false // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            }

          }
        ]
      }
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
  .row-year{
    font-size: 12px;
    color: #999;
    padding-top: 5px;
    .num{
      .num-data{
        font-size: 18px;
        color: #666
      }
      .num-compare{
        color: #52A3FF
      }
    }
  }
</style>

