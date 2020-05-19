<template>
  <div class="studentPop-container">
    <div ref="collapseBox" class="collapse-box">
      <div
        class="collapse-title"
        :style="'height:' + collapseHeight"
      >
        <span class="title-style">{{ title }}</span>
        <dt
          class="header-name"
          @click="handleChange(upDown)"
        > {{ titleName }} <i :class="'el-icon-arrow-'+ upDown" /> </dt>
      </div>
      <condition-box
        v-for=" (item, index) in bicaseList"
        v-show="conditionBox"
        ref="conditionItem"
        :key="index"
        class="condition-box"
        :condition-item="item"
        @handel-condition="handelCondition"
      />
    </div>
    <div
      class="ststistics-box"
      @click="stuChartFunc"
    >
      <span><i />图表统计</span>
    </div>
    <div class="table-box" :style="'height:' + tabBoxHeight +'px'">
      <TablePaging
        :datas="tableList"
        :info="tablecolumn"
        :v-loading="tableLoading"
        :total="recordCount"
        :isborder="isborder"
        :page="currentPage"
        :limit="pSize"
        :theight="theight"
        @pagination="currentChangePage"
      />
    </div>
  </div>
</template>

<script>
import TablePaging from '@/components/TablePaging'
import conditionBox from './_condition'

export default {
  components: {
    TablePaging,
    conditionBox
  },
  data() {
    return {
      activeNames: ['1'],
      title: '',
      titleName: '收起',
      upDown: 'up',
      isborder: true,
      theight: 500,
      tabBoxHeight: 540,
      bodyHeight: 0,
      currentPage: this.pageIndex,
      pSize: this.pageSize,
      collapseHeight: 0,
      conditionBox: true,
      caseSelec: 0,
      casesStr: [],
      caseSelectId: [],
      chartOrder: []
    }
  },
  computed: {
    bicaseList() {
      return this.$store.state.bicase.bicaseList
    },
    tableList() {
      return this.$store.state.tab.tableList
    },
    tablecolumn() {
      return this.$store.state.tab.tablecolumn
    },
    pageIndex() {
      return this.$store.state.tab.pageIndex
    },
    pageSize() {
      return this.$store.state.tab.pageSize
    },
    recordCount() {
      return this.$store.state.tab.recordCount
    },
    tableLoading() {
      return this.$store.state.tab.tableLoading
    },
    attributeId() {
      return this.$route.query.attributeId
    },
    objectId() {
      return this.$route.query.objectId
    },
    clientHeight() {
      return this.$refs.collapseBox.clientHeight
    }
  },
  watch: {
    $route: {
      handler: function(query) {
        if (query) {
          this.getlistFunc()
        }
      }
    },
    bodyHeight: function(nv, ov) {
      if (nv !== ov) {
        this.theight = nv - (this.clientHeight + 161)
        this.tabBoxHeight = this.theight + 50
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.onresize = () => {
        return (() => {
          this.bodyHeight = window.document.body.offsetHeight
        })()
      }
      this.bodyHeight = window.document.body.offsetHeight
    })
  },
  created: function() {
    this.getlistFunc()
  },
  methods: {
    handleChange(val) {
      switch (val) {
        case 'up':
          this.title = '筛选条件已收起'
          this.titleName = '展开'
          this.collapseHeight = '43px'
          this.upDown = 'down'
          this.conditionBox = false
          this.theight = this.theight + this.clientHeight - 50
          this.tabBoxHeight = this.theight + 50
          break
        default:
          this.title = ''
          this.titleName = '收起'
          this.collapseHeight = 0
          this.upDown = 'up'
          this.conditionBox = true
          this.theight = this.theight - this.clientHeight + 50
          this.tabBoxHeight = this.theight + 50
      }
    },
    getlistFunc() {
      this.$store.dispatch('bicase/getlist', { attributeId: this.attributeId, objectId: this.objectId })
        .then(res => {
          this.casesStr = []
          this.caseSelectId = []
          res.forEach(item => {
            const str = item.caseId + ':' + item.caseSelects[0].name
            this.casesStr.push(str)
            this.caseSelectId.push(item.caseSelects[0].caseSelectId)
            this.chartOrder.push(item.caseId)
          })
          this.$store.dispatch('tab/getpage', {
            attributeId: this.attributeId,
            objectId: this.objectId,
            cases: this.casesStr.toString(),
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          })
        })
    },
    currentChangePage(list) {
      const { limit, page } = list
      this.currentPage = page
      this.pagesize = limit
      this.$store.dispatch('tab/getpage', {
        attributeId: this.attributeId,
        objectId: this.objectId,
        cases: '1:2019,2:成都市',
        pageIndex: page,
        pageSize: limit
      })
    },
    handelCondition(condition) {
      this.casesStr[condition.caseId - 1] = condition.caseId + ':' + condition.name
      this.$store.dispatch('tab/getpage', {
        attributeId: this.attributeId,
        objectId: this.objectId,
        cases: this.casesStr.toString(),
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    },
    stuChartFunc() {
      this.$router.push({
        path: '/home/stuChart',
        query: {
          attributeId: this.attributeId,
          objectId: this.objectId,
          caseSelectId: this.caseSelectId.toString(),
          chartOrder: this.chartOrder
        }})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";
  .collapse-title{
    position: relative;
    height: 43px;
    border:1px dashed #EDEDED;
    .title-style{
      position: absolute;
      left: 15px;
      display: inline-block;
      top: 13px;
      color: $font-999;
      font-size: 13px;
    }
  }
  .header-name{
    position: absolute;
    right: 25px;
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
    @include wH(58px,20px);
    color: $font-999;
    border-radius:4px;
    border:1px solid rgba(230,230,230,1);
    cursor: pointer;
  }
  .rowTable{
    width: 100%;
    height: calc(100% - 50px);
  }
  .table-box{
    margin: 0 10px;
  }
  .ststistics-box{
    position: relative;
    height: 40px;
    span{
      position: absolute;
      display: inline-block;
      @include wH(82px,26px);
      background-color: $main;
      right: 10px;
      top: 7px;
      border-radius: 2px;
      color: $white;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      i{
        @include graphics(18px, 18px, 4px, 0);
         background-image: url('../../../assets/tab/ststistics.png');
        @extend %bg-parameter;
        margin-right: 3px;
      }
    }
  }
</style>

