<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>{{ frequencyList.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">

      <consumptionBar
        v-if="frequencyList.datas"
        :chart-data="frequencyList"
        :title-name="titleOne"
        :is-label="true"
        :list-num="3"
        width="calc(100% - 28px)"
      />
      <consumptionBar
        v-if="amountList.datas"
        :chart-data="amountList"
        :title-name="titleTwo"
        :is-label="true"
        :list-num="3"
        width="calc(100% - 28px)"
      />
      <multiplepolylines
        v-if="dailyAverageList.datas"
        :chart-data="dailyAverageList"
        :title-name="titleThree"
        :is-label="true"
        width="calc(50% - 30px)"
      />
      <HorizontalBar
        v-if="usageRateList.datas"
        :chart-data="usageRateList"
        :title-name="titleFour"
        :is-label="true"
        width="calc(50% - 14px)"
      />
      <stackedPolylines
        v-if="cardUsage.datas"
        :chart-data="cardUsage"
        :title-name="titleFives"
        width="calc(50% - 30px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import stackedPolylines from '../Charts/Line/_stackedPolyLine'
import HorizontalBar from '../Charts/Bar/_HorizontalBar'
import multiplepolylines from '../Charts/Line/_multiplepolyLine'
import consumptionBar from '../Charts/Bar/_consumptionBar'

export default {
  components: {
    consumptionBar,
    multiplepolylines,
    stackedPolylines,
    HorizontalBar
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',
      // 图表数据
      frequencyList: {},
      amountList: {},
      dailyAverageList: {},
      usageRateList: {},
      cardUsage: {}
    }
  },
  computed: {
    ...mapState('chachart', [
      'analysisCharts'
    ]),
    attributeId() {
      return this.$route.query.attributeId
    },
    objectId() {
      return this.$route.params.objectId
    },
    caseSelectId() {
      return this.$route.query.caseSelectId
    },
    caseSelectids() {
      return this.$route.query.filterQuery
        .replace(/[\da-zA-Z]*:/g, '')
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(query) {
        const chartLong = [1, 2, 3, 4, 5]
        if (chartLong.length) {
          this.getList()
          chartLong.forEach(element => {
            this.getchartsFunc(element)
          })
        }
      }
    }
  },
  methods: {
    chartsDataFunc() {
      this.analysisCharts.find((item) => {
        switch (item.chartOrder) {
          case 1:
            this.frequencyList = item
            break
          case 2:
            this.amountList = item
            break
          case 3:
            this.dailyAverageList = item
            break
          case 4:
            this.usageRateList = item
            break
          case 5:
            this.cardUsage = item
            break
          default:
        }
      })
    },
    getchartsFunc(attrId) {
      this.$store.dispatch('chachart/getCharts', {
        attributeId: this.attributeId,
        objectId: this.objectId,
        caseSelectids: this.caseSelectids,
        chartOrder: attrId
      }).then(() => {
        this.$nextTick(() => {
          this.chartsDataFunc()
        })
      })
    },
    getList() {
      this.$store.dispatch('chachart/getList', {
        attributeId: this.attributeId
      }).then(res => {
        res.forEach(element => {
          switch (element.chartOrder) {
            case 1:
              this.titleOne = element.name
              break
            case 2:
              this.titleTwo = element.name
              break
            case 3:
              this.titleThree = element.name
              break
            case 4:
              this.titleFour = element.name
              break
            case 5:
              this.titleFives = element.name
              break
            default:
          }
        })
      })
    },
    stuTableFunc() {
      this.$router.push({
        name: 'LEATable',
        params: {
          objectId: this.objectId
        },
        query: this.$route.query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	@import "~@/styles/label.scss";
  .row-box {
    overflow: auto;
    height: 100%;
    padding-bottom: 50px;
  }
</style>

