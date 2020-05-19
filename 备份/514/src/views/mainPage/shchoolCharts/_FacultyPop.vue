<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span v-if="genderList">{{ genderList.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <singleLine
        v-if="popVariety.datas"
        :chart-data="popVariety"
        :title-name="titleSeven"
        width="calc(66.67% - 24px)"
        :is-label="true"
      />
      <pieCahrt
        v-if="genderList.datas"
        :chart-data="genderList"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="'人'"
        width="calc(33.33% - 24px)"
        :is-label="true"
      />
      <pieCahrt
        v-if="teacherAge.datas"
        :chart-data="teacherAge"
        :title-name="titleThree"
        :series-name="titleThree"
        :unit="'人'"
        :title-num="2"
        width="calc(33.33% - 24px)"
        :is-label="true"
      />
      <pieCahrt
        v-if="politicalStatus.datas"
        :chart-data="politicalStatus"
        :title-name="titleFour"
        :series-name="titleFour"
        :unit="'人'"
        :title-num="2"
        width="calc(33.33% - 16px)"
        :is-label="true"
      />
      <pieRing
        v-if="popStatistics.datas"
        :chart-data="popStatistics"
        :title-name="titleTwo"
        :series-name="titleTwo"
        width="calc(33.33% - 24px)"
      />
      <Funnel
        v-if="Organization.datas"
        :chart-data="Organization"
        :title-name="titleFives"
        :series-name="titleFives"
        width="calc(33.33% - 24px)"
        :is-label="true"
      />
      <Funnel
        v-if="schoolData.datas"
        :chart-data="schoolData"
        :title-name="titleSix"
        :series-name="titleSix"
        :is-label="true"
        width="calc(33.33% - 24px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import singleLine from '../Charts/Line/_singleLine'
import pieCahrt from '../Charts/Pie/_pieChart'
import pieRing from '../Charts/Pie/_PieRing'
import Funnel from '../Charts/Funnel/_funnel'

export default {
  components: {
    singleLine,
    pieCahrt,
    pieRing,
    Funnel
  },
  props: {
    nodeName: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      // title
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',
      titleSix: '',
      titleSeven: '',
      // 图表数据
      genderList: {},
      popStatistics: {}, // 人口统计
      teacherAge: {}, // 教师性别
      politicalStatus: {}, // 政治面貌
      Organization: {}, // 组织架构
      schoolData: {},
      popVariety: {} // 人口变化
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
        const chartLong = [1, 2, 3, 4, 5, 6, 7]
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
            this.popStatistics = item
            break
          case 3:
            this.teacherAge = item
            break
          case 4:
            this.politicalStatus = item
            break
          case 5:
            this.Organization = item
            break
          case 6:
            this.schoolData = item
            break
          case 7:
            this.popVariety = item
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

