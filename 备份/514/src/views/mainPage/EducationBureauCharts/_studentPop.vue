<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>{{ genderList.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <singleLine
        v-if="popRegionList.datas"
        :chart-data="popRegionList"
        :title-name="titleFives"
        :is-label="true"
        :unit="'人'"
        width="calc(50% - 25px)"
      />
      <singleHollowBar
        v-if="popStatisticsList.datas"
        ref="regionChart"
        :chart-data="popStatisticsList"
        :title-name="titleFour"
        :unit="'人'"
        :is-label="true"
        width="calc(50% - 26px)"
        :title-num="2"
      />
      <MultipleGroupsPop
        v-if="popCompareList.datas"
        :chart-data="popCompareList"
        :is-label="true"
        :title-name="titleThree"
        :split-number="2"
        width="calc(100% - 36px)"
        :dimensions-array="SchoolSection"
      />
      <pieCahrt
        v-if="genderList.datas"
        :chart-data="genderList"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="'人'"
        :is-label="true"
        width="calc(25% - 25px)"
      />
      <pieCahrt
        v-if="FarewellList.datas"
        :chart-data="FarewellList"
        :title-name="titleTwo"
        :series-name="titleTwo"
        :unit="'人'"
        :is-label="true"
        width="calc(25% - 25px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import singleLine from '../Charts/Line/_singleLine'
import singleHollowBar from '../Charts/Bar/_singleHollowBar'
import MultipleGroupsPop from '../Charts/Bar/_MultipleGroupsPop'
import pieCahrt from '../Charts/Pie/_pieChart'

export default {
  components: {
    singleLine,
    singleHollowBar,
    MultipleGroupsPop,
    pieCahrt
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',
      // 图表数据
      genderList: {},
      FarewellList: {},
      popCompareList: {},
      popStatisticsList: {},
      popRegionList: {},
      //
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
            this.genderList = item
            break
          case 2:
            this.FarewellList = item
            break
          case 3:
            this.popCompareList = item
            break
          case 4:
            this.popStatisticsList = item
            break
          case 5:
            this.popRegionList = item
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

