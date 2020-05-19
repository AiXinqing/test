<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>{{ dailyList.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <BlisteringScatter
        v-if="dailyList.datas"
        ref="piechart"
        :chart-data="dailyList"
        :title-name="titleOne"
        width="calc(50% - 22px)"
        :unit="['历史每日人均刷卡次数','区间内每日人均刷卡次数']"
        :is-label="true"
      />
      <BlisteringScatter
        v-if="AmountList.datas"
        ref="piechart"
        :chart-data="AmountList"
        :title-name="titleTwo"
        width="calc(50% - 23px)"
        :unit="['历史每日人均刷卡金额','区间内每日人均刷卡金额']"
        :is-label="true"
      />
      <BlisteringScatter
        v-if="Average.datas"
        ref="piechart"
        :chart-data="Average"
        :title-name="titleThree"
        width="calc(50% - 22px)"
        :unit="['历史次均刷卡金额','区间内次均刷卡金额']"
        :title-num="1"
        :is-label="true"
      />
      <BlisteringScatter
        v-if="DailyCreditCard.datas"
        ref="piechart"
        :chart-data="DailyCreditCard"
        :title-name="titleFour"
        width="calc(50% - 23px)"
        :unit="['历史每日刷卡人数','区间内每日刷卡人数']"
        :title-num="1"
        :is-label="true"
      />
      <singleSolidBar
        v-if="cardUsage.datas"
        :chart-data="cardUsage"
        :title-name="titleFives"
        :x-axis-name="''"
        :title-num="2"
        :compare="2"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <singleSolidBar
        v-if="AllGrades.datas"
        :chart-data="AllGrades"
        :title-name="titleSix"
        :x-axis-name="''"
        :title-num="2"
        :compare="2"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <singleSolidBar
        v-if="AverageSeven.datas"
        :chart-data="AverageSeven"
        :title-name="titleSeven"
        :x-axis-name="''"
        :title-num="1"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <singleSolidBar
        v-if="DailyAverage.datas"
        :chart-data="DailyAverage"
        :title-name="titleEight"
        :x-axis-name="''"
        :title-num="2"
        :compare="2"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <basisRadar
        v-if="nineData.datas"
        :chart-data="nineData"
        :title-name="titleNine"
        width="calc(50% - 22px)"
        :is-label="true"
      />
      <stackedPolyLineTwo
        v-if="tenData.datas"
        :chart-data="tenData"
        :title-name="titleTen"
        width="calc(50% - 24px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import singleSolidBar from '../Charts/Bar/_singleSolidBar'
import stackedPolyLineTwo from '../Charts/Line/_stackedPolyLineTwo'
import basisRadar from '../Charts/Radar/_basisRadar'
import BlisteringScatter from '../Charts/Scatter/_BlisteringScatter'

export default {
  components: {
    BlisteringScatter,
    singleSolidBar,
    basisRadar,
    stackedPolyLineTwo
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',
      titleSix: '',
      titleSeven: '',
      titleEight: '',
      titleNine: '',
      titleTen: '',
      // 图表数据
      dailyList: {},
      AmountList: {},
      Average: {},
      DailyCreditCard: {},
      cardUsage: {},
      AllGrades: {},
      AverageSeven: {},
      DailyAverage: {},
      nineData: {},
      tenData: {}
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
        const chartLong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
            this.dailyList = item
            break
          case 2:
            this.AmountList = item
            break
          case 3:
            this.Average = item
            break
          case 4:
            this.DailyCreditCard = item
            break
          case 5:
            this.cardUsage = item
            break
          case 6:
            this.AllGrades = item
            break
          case 7:
            this.AverageSeven = item
            break
          case 8:
            this.DailyAverage = item
            break
          case 9:
            this.nineData = item
            break
          case 10:
            this.tenData = item
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
            case 6:
              this.titleSix = element.name
              break
            case 7:
              this.titleSeven = element.name
              break
            case 8:
              this.titleEight = element.name
              break
            case 9:
              this.titleNine = element.name
              break
            case 10:
              this.titleTen = element.name
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

