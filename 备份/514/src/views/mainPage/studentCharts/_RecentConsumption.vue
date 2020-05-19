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
      <basisScatter
        v-if="oneData.datas"
        ref="regionChart"
        :chart-data="oneData"
        :title-name="titleOne"
        :unit="'次'"
        :x-axis-name="''"
        :data-long="1"
        width="calc(100% - 30px)"
      />
      <singleSolidBar
        v-if="twoData.datas"
        :chart-data="twoData"
        :title-name="titleTwo"
        :is-label="true"
        :unit="''"
      />
      <singleSolidBar
        v-if="dataThree.datas"
        :chart-data="dataThree"
        :title-name="titleThree"
        :is-label="true"
        :unit="''"
      />

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import basisScatter from '../Charts/Scatter/_basisScatter'
import singleSolidBar from '../Charts/Bar/_singleSolidBar'

export default {
  components: {
    basisScatter,
    singleSolidBar
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

