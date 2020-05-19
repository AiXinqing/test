<template>
  <div class="row-charts-item">
    <div class="row-title">学年人口统计</div>
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
    }
  },
  computed: {
    cahrtLabel() {
      return this.group(this.chartData.describes, 2)
    },
    option() {
      return {
        grid: {
          top: 20,
          left: 60,
          right: 20,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          name: '(人)',
          data: this.chartData.datas.map((item) => item.itemArray[0]),
          nameLocation: 'start',
          nameGap: 10,
          nameTextStyle: {
            fontSize: 12,
            color: '#666',
            padding: [25, 0, 0, 0]
          },
          axisLabel: {
            color: '#333'
          },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666'
            }
          },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        series: [{
          data: this.chartData.datas.map((item) => item.itemArray[1]),
          type: 'line'
        }]
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

