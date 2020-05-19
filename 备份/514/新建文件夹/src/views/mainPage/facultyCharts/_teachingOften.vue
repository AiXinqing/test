<template>
  <div class="chart-container">
    <div class="p-c-info-title">
      <i />
      <span>{{ TeachingOftenList.description }}</span>
      <div
        class="ststistics-box"
        @click="stuTableFunc"
      >
        <span><i />数据列表</span>
      </div>
    </div>
    <div class="row-box">
      <teachingLine
        v-if="TotalTeaching.datas"
        :chart-data="TotalTeaching"
        :title-name="titleThree"
        width="calc(100% - 35px)"
      />
      <towGroupScatter
        v-if="FourData.datas"
        :chart-data="FourData"
        :title-name="titleFour"
        width="calc(100% - 35px)"
      />
      <pieBarTwoGroups
        v-if="TeachingOftenList.datas"
        :chart-data="TeachingOftenList"
        :title-name="titleOne"
        width="calc(50% - 15px)"
        :is-label="true"
      />
      <subjectHorizontalBar
        v-if="SubjectTeaching.datas"
        :chart-data="SubjectTeaching"
        :title-name="titleTwo"
        :is-label="true"
        width="calc(50% - 35px)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pieBarTwoGroups from '../Charts/pieBar/_TwoGroups'
import subjectHorizontalBar from '../Charts/Bar/_subjectHorizontalBar'
import teachingLine from '../Charts/Line/_teachingLine'
import towGroupScatter from '../Charts/Scatter/_towGroupScatter'

export default {
  components: {
    pieBarTwoGroups,
    subjectHorizontalBar,
    teachingLine,
    towGroupScatter
  },
  data() {
    return {
      titleOne: '',
      titleTwo: '',
      titleThree: '',
      titleFour: '',

      // 图表数据
      TeachingOftenList: {},
      SubjectTeaching: {},
      TotalTeaching: {},
      FourData: {}
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
            this.TeachingOftenList = item
            break
          case 2:
            this.SubjectTeaching = item
            break
          case 3:
            this.TotalTeaching = item
            break
          case 4:
            this.FourData = item
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

<style lang="scss" scoped>
	@import "~@/styles/label.scss";
  .main-container .right-contten{
    overflow: auto;
  }

</style>

