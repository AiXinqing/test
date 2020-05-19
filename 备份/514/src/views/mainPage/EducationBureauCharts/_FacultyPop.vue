<template>
  <div class="chart-container">
    <div v-show="popComparisonList.description" class="p-c-info-title">
      <i />
      <span>{{ popComparisonList.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <MultipleGroupsPop
        v-if="popComparisonList.datas"
        :chart-data="popComparisonList"
        :is-label="true"
        :title-name="titleSix"
        :split-number="3"
        width="calc(100% - 28px)"
        :dimensions-array="SchoolSection"
      />
      <singleHollowBar
        v-if="FarewellList.datas"
        :chart-data="FarewellList"
        :title-name="titleSeven"
        width="calc(100% - 28px)"
        :unit="'人'"
        :is-label="true"
        :title-num="2"
      />
      <singleLine
        v-if="teacherPop.datas"
        :chart-data="teacherPop"
        :title-name="titleOne"
        :is-label="true"
        width="calc(33.33% - 15px)"
      />
      <pieRing
        v-if="ageList.datas"
        ref="piechart"
        :chart-data="ageList"
        :title-name="titleTwo"
        :series-name="titleTwo"
        width="calc(33.33% - 15px)"
        :is-label="true"
      />
      <pieRing
        v-if="educationList.datas"
        ref="piechart"
        :chart-data="educationList"
        :title-name="titleThree"
        :series-name="titleThree"
        width="calc(33.33% - 28px)"
        :is-label="true"
      />
      <pieRing
        v-if="titleCategory.datas"
        ref="piechart"
        :chart-data="titleCategory"
        :title-name="titleFour"
        :series-name="titleFour"
        width="calc(33.33% - 15px)"
        :is-label="true"
      />
      <pieCahrt
        v-if="genderList.datas"
        ref="piechart"
        :chart-data="genderList"
        :title-name="titleFives"
        :series-name="titleFives"
        width="calc(33.33% - 15px)"
        :unit="'人'"
        :is-label="true"
      />
      <pieCahrt
        v-if="administrative.datas"
        ref="piechart"
        :chart-data=" administrative"
        :title-name="titleEight"
        :series-name="titleEight"
        width="calc(33.33% - 28px)"
        :unit="'人'"
        :is-label="true"
      />

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import singleLine from '../Charts/Line/_singleLine'
import MultipleGroupsPop from '../Charts/Bar/_MultipleGroupsPop'
import pieCahrt from '../Charts/Pie/_pieChart'
import singleHollowBar from '../Charts/Bar/_singleHollowBar'
import pieRing from '../Charts/Pie/_PieRing'

export default {
  components: {
    singleLine,
    pieCahrt,
    singleHollowBar,
    MultipleGroupsPop,
    pieRing
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
      // 图表数据
      teacherPop: {},
      ageList: {},
      titleCategory: {},
      genderList: {},
      FarewellList: {},
      administrative: {},
      educationList: {},
      popComparisonList: {},
      SchoolSection: ['人数最多的学校', '人数最少的学校', '平均人数']
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
        const chartLong = [1, 2, 3, 4, 5, 6, 7, 8]
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
            this.teacherPop = item
            break
          case 2:
            this.ageList = item
            break
          case 3:
            this.educationList = item
            break
          case 4:
            this.titleCategory = item
            break
          case 5:
            this.genderList = item
            break
          case 6:
            this.popComparisonList = item
            break
          case 7:

            this.FarewellList = item
            break
          case 8:
            this.administrative = item
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

  .row-box{
    overflow: auto;
    height: 100%;
    padding-bottom: 50px;
  }

</style>

