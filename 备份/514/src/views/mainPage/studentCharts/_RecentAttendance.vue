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
      <singleSolidBar
        v-if="twoData.datas"
        :chart-data="twoData"
        :title-name="titleTwo"
        :is-label="true"
        width="calc(100% - 35px)"
      />
      <TrendLine
        v-if="dataThree.datas"
        :chart-data="dataThree"
        :title-name="titleTwo"
        :is-label="true"
        width="calc(100% - 30px)"
      />
      <pieRing
        v-if="oneData.datas"
        ref="piechart"
        :chart-data="oneData"
        :title-name="titleOne"
        :series-name="titleOne"
        :unit="''"
        :is-label="true"
        width="364px"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pieRing from '../Charts/Pie/_PieRing'
import singleSolidBar from '../Charts/Bar/_singleSolidBar'
import TrendLine from '../Charts/Line/_TrendLine'

export default {
  components: {
    pieRing,
    singleSolidBar,
    TrendLine
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',

      // 图表数据
      oneData: {},
      twoData: {},
      dataThree: {}
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
        const chartLong = [1, 2, 3] //, 6, 7, 8, 9, 10, 11]
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

