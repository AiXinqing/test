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
      <AttendanceHollow
        v-if="beLateList.datas"
        :chart-data="beLateList"
        :is-label="true"
        :title-name="titleTwo"
        :title-contten="'迟到'"
        :list-num="3"
        width="calc(100% - 28px)"
      />
      <AttendanceHollow
        v-if="leaveEarly.datas"
        :chart-data="leaveEarly"
        :is-label="true"
        :title-name="titleThree"
        :title-contten="'早退'"
        :list-num="3"
        width="calc(100% - 28px)"
      />
      <AttendanceSolidBar
        v-if="attendanceList.datas"
        :chart-data="attendanceList"
        :is-label="true"
        :title-name="titleFour"
        :list-num="3"
        :legend-arr="legendFour"
        width="calc(100% - 28px)"
      />
      <pieRing
        v-if="attendanceType.datas"
        :chart-data="attendanceType"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="'人次'"
        :is-label="true"
        width="calc(33.33% - 10px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import pieRing from '../Charts/Pie/_PieRing'
import AttendanceHollow from '../Charts/Bar/_AttendanceHollow'
import AttendanceSolidBar from '../Charts/Bar/_AttendanceSolid'

export default {
  components: {
    pieRing,
    AttendanceHollow,
    AttendanceSolidBar
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      // 图表数据
      attendanceType: {},
      beLateList: {},
      leaveEarly: {},
      attendanceList: {},
      //
      legendFour: ['迟到', '早退']
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
        const chartLong = [1, 2, 3, 4]
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
            this.beLateList = item
            break
          case 3:
            this.leaveEarly = item
            break
          case 4:
            this.attendanceList = item
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

