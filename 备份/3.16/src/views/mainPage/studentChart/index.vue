<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>2019</span>
    </div>
    <chart ref="chart1" :options="orgOptions" :auto-resize="true" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      orgOptions: {}
    }
  },
  mounted() {
    this.orgOptions = {
      xAxis: {
        type: 'polarArea',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
	@import "~@/styles/label.scss";
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
  .p-c-info-title{
      padding: 10px 0 0 15px;
      font-size: 16px;
      color: $font-333;

      i{
        @include graphics(3px, 16px, 3px, 0, $chart);
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        margin-right: 5px;
      }
      span{
        strong{
          color: $main;
          font-size: 20px;
          margin: 0 2px;
        }
      }
    }
</style>

