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
      <singleHollowBar
        v-if="oneData.datas"
        ref="regionChart"
        :chart-data="oneData"
        :title-name="titleOne"
        :unit="'分'"
        :x-axis-name="'分'"
        :data-long="1"
        :grid-left="20"
        width="calc(100% - 30px)"
      />
      <basicLine
        v-if="twoData.datas"
        :chart-data="twoData"
        :title-name="titleTwo"
        :is-label="true"
        width="calc(100% - 30px)"
        :legend="'教职工平均成绩得分'"
      />
      <AchievementLine
        v-if="dataThree.datas"
        :chart-data="dataThree"
        :title-name="titleThree"
        width="calc(100% - 30px)"
        :legend-arr="ThreeTitleData"
      />
      <MonthlyExamBar
        v-if="dataFour.datas"
        ref="popComparison"
        :chart-data="dataFour"
        :is-label="true"
        :title-name="titleFour"
        :list-num="1"
        :legend-arr="FourTitleData"
        width="calc(100% - 30px)"
      />
      <AchievementLine
        v-if="dataFives.datas"
        :chart-data="dataFives"
        :title-name="titleFives"
        width="calc(100% - 30px)"
        :unit="''"
        :is-label="true"
        :legend-arr="FivesTitleData"
      />
      <AchievementLine
        v-if="dataSix.datas"
        :chart-data="dataSix"
        :title-name="titleSix"
        width="calc(100% - 30px)"
        :is-label="true"
        :legend-arr="sixTitleData"
      />
      <singleHollowBar
        v-if="dataSeven.datas"
        ref="regionChart"
        :chart-data="dataSeven"
        :title-name="titleSeven"
        :unit="'分'"
        :grid-left="20"
        :x-axis-name="'分'"
        width="calc(100% - 30px)"
      />
      <AchievementLine
        v-if="dataEight.datas"
        :chart-data="dataEight"
        :title-name="titleEight"
        :unit="''"
        width="calc(100% - 30px)"
        :legend-arr="EightTitleData"
      />
      <AchievementLine
        v-if="dataNine.datas"
        :chart-data="dataNine"
        :title-name="titleNine"
        width="calc(100% - 30px)"
        :legend-arr="nineTitleData"
      />
      <singleHollowBar
        v-if="dataTen.datas"
        ref="regionChart"
        :chart-data="dataTen"
        :title-name="titleTen"
        :unit="'分'"
        :x-axis-name="'分'"
        width="calc(100% - 30px)"
        :is-label="true"
      />
      <SelectedConditionBar
        v-if="dataEleven.datas"
        :chart-data="dataEleven"
        :title-name="titleEleven"
        width="calc(100% - 30px)"
        :legend-arr="elevenTitleData"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import singleHollowBar from '../Charts/Bar/_singleHollowBar'
import basicLine from '../Charts/Line/_basicLine'
import AchievementLine from '../Charts/Line/_AchievementLine'
import SelectedConditionBar from '../Charts/Bar/_SelectedConditionBar'
import MonthlyExamBar from '../Charts/Bar/_MonthlyExamBar'

export default {
  components: {
    singleHollowBar,
    basicLine,
    AchievementLine,
    MonthlyExamBar,
    SelectedConditionBar
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
      titleEleven: '',

      // 图表数据
      oneData: {},
      twoData: {},
      dataThree: {},
      dataFour: {},
      dataFives: {},
      dataSix: {},
      dataSeven: {},
      dataEight: {},
      dataNine: {},
      dataTen: {},
      dataEleven: {},

      // 图表标题数组
      ThreeTitleData: ['教职工平均成绩', '考试平均成绩'],
      FourTitleData: ['高分得分', '达标得分'],
      FivesTitleData: ['高分得分', '达标得分'],
      sixTitleData: ['高分比例', '达标比例'],
      EightTitleData: ['提高得分'],
      nineTitleData: ['提高比例'],
      elevenTitleData: ['平均成绩得分', '高分得分', '达标得分', '提高得分']
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
        const chartLong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
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
          case 6:
            this.dataSix = item
            break
          case 7:
            this.dataSeven = item
            break
          case 8:
            this.dataEight = item
            break
          case 9:
            this.dataNine = item
            break
          case 10:
            this.dataTen = item
            break
          case 11:
            this.dataEleven = item
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
            case 11:
              this.titleEleven = element.name
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

