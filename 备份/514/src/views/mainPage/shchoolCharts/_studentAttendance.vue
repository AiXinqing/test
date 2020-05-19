<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>{{ attendanceType.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <singleStackBar
        v-if="attendanceList.datas"
        ref="piechart"
        :chart-data="attendanceList"
        :title-name="titleTwo"
        width="calc(100% - 30px)"
        :is-label="true"
      />
      <TwoGroupsBar
        v-if="Probability.datas"
        ref="piechart"
        :chart-data="Probability"
        :title-name="titleThree"
        width="calc(100% - 30px)"
        :is-label="true"
      />
      <TwoGHollowBar
        v-if="timeList.datas"
        ref="popComparison"
        :chart-data="timeList"
        :is-label="true"
        :title-name="titleFives"
        :list-num="1"
        width="calc(100% - 30px)"
      />
      <singleScatter
        v-if="Overview.datas"
        ref="piechart"
        :chart-data="Overview"
        :title-name="titleFour"
        :x-unit="'统计人次'"
        :y-unit="'考勤人次'"
        width="calc(66.67% - 24px)"
        :is-label="true"
      />
      <pieRing
        v-if="attendanceType.datas"
        ref="piechart"
        :chart-data="attendanceType"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="'人次'"
        width="calc(33.33% - 24px)"
        :is-label="true"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import pieRing from '../Charts/Pie/_PieRing'
import TwoGroupsBar from '../Charts/Bar/_TwoGroupsBar'
import singleStackBar from '../Charts/Bar/_singleStackBar'
import singleScatter from '../Charts/Scatter/_singleScatter'
import TwoGHollowBar from '../Charts/Bar/_TwoGHollowBar'

export default {
  components: {
    pieRing,
    TwoGroupsBar,
    singleStackBar,
    singleScatter,
    TwoGHollowBar
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',
      // 图表数据
      attendanceType: {},
      attendanceList: {},
      Probability: {},
      Overview: {},
      timeList: {}
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
            this.attendanceType = item
            break
          case 2:
            this.attendanceList = item
            break
          case 3:
            this.Probability = item
            break
          case 4:
            this.Overview = item
            break
          case 5:
            this.timeList = item
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

