<template>
  <div class="row-charts-item region">
    <div class="row-title">行政区划</div>
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
    <chart id="chartLine" style="width: 100%; height:184px" :options="option" />
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
          bottom: 30,
          containLabel: true
        },
        xAxis: [
          {
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
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '20%',
            barMinWidth: '20px',
            barMaxWidth: '40px',
            data: this.chartData.datas.map((item) => item.itemArray[1]),
            itemStyle: {
              normal: {
                color: 'rgba(255, 255, 255,.1)',
                borderColor: '#52A3FF'
              }
            },
            emphasis: { // houver
              itemStyle: {
                color: '#52A3FF'
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
