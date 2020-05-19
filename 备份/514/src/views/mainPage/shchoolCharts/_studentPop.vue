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
      <singleSolidBar
        v-if="gradeList.datas"
        :chart-data="gradeList"
        :title-name="titleFives"
        :title-num="2"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <pieCahrt
        v-if="genderList.datas"
        :chart-data="genderList"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="'人'"
        :is-label="true"
        width="364px"
      />
      <singleLine
        v-if="popHistoryList.datas"
        :chart-data="popHistoryList"
        :title-name="titleFour"
        width="calc(100% - 412px)"
        :is-label="true"
      />
      <pieRing
        v-if="commuteList.datas"
        :chart-data="commuteList"
        :title-name="titleTwo"
        :series-name="titleTwo"
        :is-label="true"
        width="364px"
      />
      <pieProportion
        v-if="ProportionList.datas"
        :chart-data="ProportionList"
        :title-name="titleThree"
        :is-label="true"
        width="364px"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import singleLine from '../Charts/Line/_singleLine'
import singleSolidBar from '../Charts/Bar/_singleSolidBar'
import pieCahrt from '../Charts/Pie/_pieChart'
import pieRing from '../Charts/Pie/_PieRing'
import pieProportion from '../Charts/Pie/_pieProportion'

export default {
  components: {
    singleSolidBar,
    singleLine,
    pieCahrt,
    pieRing,
    pieProportion
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
      // 图表数据
      genderList: {},
      commuteList: {},
      ProportionList: {},
      popHistoryList: {},
      gradeList: {}
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
            this.commuteList = item
            break
          case 3:
            this.ProportionList = item
            break
          case 4:
            this.popHistoryList = item
            break
          case 5:
            this.gradeList = item
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

