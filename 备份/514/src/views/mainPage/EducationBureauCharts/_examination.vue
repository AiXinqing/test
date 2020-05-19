<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>2019</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <MultioleGroupSexamination
        v-if="favoriteList.datas"
        :chart-data="favoriteList"
        :title-name="titleThree"
        :list-num="3"
        :is-label="true"
        width="calc(100% - 28px)"
      />
      <MultioleGroupSexamination
        v-if="dislikeList.datas"
        :chart-data="dislikeList"
        :title-name="titleTwo"
        :list-num="3"
        :is-label="true"
        width="calc(100% - 28px)"
      />
      <singleSolidBar
        v-if="overTheYears.datas"
        :chart-data="overTheYears"
        :title-name="titleFour"
        :is-label="true"
        :unit="''"
      />
      <singleHollowBar
        v-if="subjectList.datas"
        :chart-data="subjectList"
        :title-name="titleFives"
        :x-axis-name="''"
        :is-label="true"
        width="calc(70% - 25px)"
      />
      <pieRing
        v-if="monthComparison.datas"
        :chart-data="monthComparison"
        :title-name="titleFives"
        :series-name="'参考人次类型分布...'"
        :unit="'人次'"
        :is-label="true"
        width="calc(30% - 21px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pieRing from '../Charts/Pie/_PieRing'
import singleSolidBar from '../Charts/Bar/_singleSolidBar'
import MultioleGroupSexamination from '../Charts/Bar/_MultioleGroupSexamination'
import singleHollowBar from '../Charts/Bar/_singleHollowBar'

export default {
  components: {
    singleSolidBar,
    pieRing,
    MultioleGroupSexamination,
    singleHollowBar
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',
      titleFives: '',
      // 图表数据
      favoriteList: {},
      dislikeList: {},
      monthComparison: {},
      overTheYears: {},
      subjectList: {}
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
            this.monthComparison = item
            break
          case 2:
            this.dislikeList = item
            break
          case 3:
            this.favoriteList = item
            break
          case 4:
            this.overTheYears = item
            break
          case 5:
            this.subjectList = item
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

