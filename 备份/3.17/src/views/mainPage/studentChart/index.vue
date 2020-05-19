<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>2019</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <chartCategory
        v-if="categoryList.datas"
        ref="category"
        :chart-data="categoryList"
      />
      <regionChart
        v-if="regionList.datas"
        ref="regionChart"
        :chart-data="regionList"
      />
      <popComparison
        v-if="popComparisonList.datas"
        ref="popComparison"
        :chart-data="popComparisonList"
      />
      <pieCahrt
        v-if="pieList.datas"
        ref="piechart"
        :chart-data="pieList"
      />
      <pieCahrt
        v-if="pieTwoList.datas"
        ref="piechart"
        :chart-data="pieTwoList"
      />
    </div>
  </div>
</template>

<script>
import chartCategory from './_category'
import regionChart from './_regionChart'
import popComparison from './_popComparison'
import pieCahrt from './_pieChart'

export default {
  components: {
    chartCategory,
    regionChart,
    popComparison,
    pieCahrt
  },
  data() {
    return {
      chartOrderS: this.chartOrder
    }
  },
  computed: {
    categoryList() {
      return this.$store.state.chachart.categoryList
    },
    regionList() {
      return this.$store.state.chachart.regionList
    },
    popComparisonList() {
      return this.$store.state.chachart.popComparisonList
    },
    pieList() {
      return this.$store.state.chachart.pieList
    },
    pieTwoList() {
      return this.$store.state.chachart.pieTwoList
    },
    attributeId() {
      return this.$route.query.attributeId
    },
    objectId() {
      return this.$route.query.objectId
    },
    caseSelectId() {
      return this.$route.query.caseSelectId
    },
    chartOrder() {
      return this.$route.query.chartOrder
    }
  },
  watch: {
    $route: {
      handler: function(query) {
        if (query) {
          this.getchartsFunc(1)
          this.getchartsFunc(2)
          this.getchartsFunc(3)
          this.getchartsFunc(4)
          this.getchartsFunc(5)
        }
      }
    }
  },
  mounted() {
    this.getchartsFunc(1)
    this.getchartsFunc(2)
    this.getchartsFunc(3)
    this.getchartsFunc(4)
    this.getchartsFunc(5)
  },
  methods: {
    getchartsFunc(order = 5) {
      this.$store.dispatch('chachart/getCharts', {
        attributeId: this.attributeId,
        objectId: this.objectId,
        caseSelectids: this.caseSelectId,
        chartOrder: order
      })
    },
    stuTableFunc() {
      this.$router.push({
        path: '/home/studentTab',
        query: {
          attributeId: this.attributeId,
          objectId: this.objectId
        }})
    }
  }
}
</script>

<style lang="scss" scoped>
	@import "~@/styles/label.scss";
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 40px);
    background-color: $bf-f7;
  }
  .p-c-info-title{
      padding: 10px 0 0 15px;
      font-size: 16px;
      color: $font-333;
      position: relative;
      height: 35px;

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
      .ststistics-box{
        position: absolute;
        height: 40px;
        right: 10px;
        top:0;

        span{
          position: absolute;
          display: inline-block;
          @include wH(82px,26px);
          background-color: $main;
          right: 10px;
          top: 7px;
          border-radius: 2px;
          color: $white;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
          i{
            @include graphics(14px, 10px, 1px, 0);
            background-image: url('../../../assets/tab/fold.png');
            @extend %bg-parameter;
            margin-right: 3px;
          }
        }
      }
  }
  .row-box{
    display: flex;
    flex-flow: row wrap;

    .row-charts-item{
      margin: 10px 15px 0 15px;
      background-color: $white;
      border-radius: 4px;
      height: 260px;
      padding: 10px 15px;

      .row-title{
        height: 19px;
        font-size: 14px;
        color: $font-333;
      }
    }
    .row-charts-item.region{
      width: calc(100% - 424px);
    }
    .row-charts-item.popComparison{
       width: calc(100% - 30px);
    }
  }
</style>

