<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>{{ oneData.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <pieCahrt
        v-if="oneData.datas"
        :chart-data="oneData"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="'人'"
        :is-label="true"
        :percent-sign="''"
        :title-long="1"
        width="calc(50% - 25px)"
      />
      <pieRing
        v-if="twoData.datas"
        ref="piechart"
        :chart-data="twoData"
        :title-name="titleTwo"
        :series-name="titleTwo"
        :unit="''"
        :is-label="true"
        width="calc(50% - 25px)"
      />
      <singleSolidBar
        v-if="dataThree.datas"
        :chart-data="dataThree"
        :title-name="titleThree"
        :is-label="true"
        width="calc(100% - 35px)"
      />
      <TrendLine
        v-if="dataFour.datas"
        :chart-data="dataFour"
        :title-name="titleFour"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <BlisteringImage
        v-if="dataFives.datas"
        ref="regionChart"
        :chart-data="dataFives"
        :title-name="titleFives"
        :unit="'次'"
        :x-axis-name="''"
        :data-long="1"
        width="calc(100% - 30px)"
      />

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BlisteringImage from '../Charts/Image/_BlisteringImage'
import TrendLine from '../Charts/Line/_TrendLine'
import pieCahrt from '../Charts/Pie/_pieChart'
import pieRing from '../Charts/Pie/_PieRing'
import singleSolidBar from '../Charts/Bar/_singleSolidBar'

export default {
  components: {
    BlisteringImage,
    pieCahrt,
    pieRing,
    singleSolidBar,
    TrendLine
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',

      // 图表数据
      oneData: {},
      twoData: {},
      dataThree: {},
      dataFour: {},
      dataFives: {},

      // 图表标题数组
      FourTitleData: ['日均刷卡金额', '异常消费金额'],
      FivesTitleData: ['日均刷卡次数', '异常消费次数']
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
        const chartLong = [1, 2, 3, 4, 5] //, 6, 7, 8, 9, 10, 11]
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
            this.oneData = item
            break
          case 2:
            this.twoData = item
            break
          case 3:
            this.dataThree = item
            break
          case 4:
            this.dataFour = item
            break
          case 5:
            this.dataFives = item
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
  .main-container .right-contten{
    overflow: auto;
  }
</style>

