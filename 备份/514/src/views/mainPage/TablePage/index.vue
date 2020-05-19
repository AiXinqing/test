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
      <template v-for="item in bicaseList">
        <condition-box
          v-if="selectedOptions[item.caseId]"
          v-show="conditionBox"
          :key="item.caseId"
          :condition-item="item"
          :selected-id="selectedOptions[item.caseId].caseSelectId"
          class="condition-box"
          @condition-change="handleConditionChange"
        />
      </template>
    </div>
    <div
      class="ststistics-box"
    >
      <span @click="EducationBureauFunc"><i />图表统计</span>
    </div>
    <div
      class="table-box"
      :style="'height:' + tabBoxHeight +'px'"
    >
      <TablePaging
        :datas="tableList"
        :info="tablecolumn"
        :v-loading="tableLoading"
        :total="recordCount"
        :isborder="isborder"
        :page="pageIndex"
        :limit="pageSize"
        :theight="theight"
        @pagination="currentChangePage"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TablePaging from '@/components/TablePaging' //
import conditionBox from './_condition'

export default {
  components: {
    TablePaging,
    conditionBox
  },
  data() {
    return {
      isborder: true,
      theight: 500,
      tabBoxHeight: 540,
      bodyHeight: 0,
      clientHeight: 0,
      pageIndex: 1,
      pageSize: 20,
      conditionBox: true,
      caseSelec: 0,
      casesStr: [],
      caseSelectId: [],
      chartOrder: [],
      bicaseTable: {},
      selectedOptions: {}
    }
  },
  computed: {
    ...mapState('tab', [
      'tableList',
      'tablecolumn',
      'recordCount',
      'tableLoading'
    ]),
    ...mapState('bicase', ['bicaseList']),
    title() {
      return this.conditionBox ? '' : '筛选条件已收起'
    },
    titleName() {
      return this.conditionBox ? '收起' : '展开'
    },
    upDown() {
      return this.conditionBox ? 'up' : 'down'
    },
    collapseHeight() {
      return this.conditionBox ? 0 : '43px'
    },
    attributeId() {
      return this.$route.query.attributeId
    },
    analysis() {
      return this.$route.params.analysis
    },
    objectId() {
      return this.$route.params.objectId
    },
    querySelectId() {
      return this.$route.query.caseSelectId
    },
    filterQuery() {
      // {
      //   key: option
      // }
      // ===>
      // key:option.caseSelectId,...
      return Object.keys(this.selectedOptions).map((key) => {
        return `${key}:${this.selectedOptions[key].caseSelectId}`
      }).join(',')
    }
  },
  watch: {
    filterQuery() {
      this.$router.push({
        name: 'LEATable',
        params: {
          objectId: this.objectId
        },
        query: {
          attributeId: this.attributeId,
          filterQuery: this.filterQuery
        }
      })
      this.getPage()
    },
    pageIndex() {
      this.getPage()
    },
    pageSize() {
      this.getPage()
    },
    bicaseList() {
      this.initialSelectedOptions(this.$route.query.filterQuery)
    },
    bodyHeight: function(nv, ov) {
      if (nv !== ov) {
        this.theight = nv - (parseInt(this.clientHeight) + 127)
        this.tabBoxHeight = this.theight + 50
      }
    },
    bicaseTable: function(nv, ov) {
      if (nv !== ov) {
        this.bicaseTable = nv
      }
    },
    attributeId() {
      this.getFilterList()
    }
  },
  created() {
    this.getFilterList()
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
  methods: {
    initialSelectedOptions(filterQuery = '') {
      const querys = filterQuery.split(',').reduce((acc, item) => {
        const [caseId, caseSelectId] = item.split(':').map(t => parseInt(t))
        acc[caseId] = caseSelectId
        return acc
      }, {})
      this.selectedOptions = this.bicaseList.reduce((acc, item) => {
        const { caseId } = item
        acc[caseId] = item.caseSelects.find(o => o.caseSelectId === querys[caseId]) ||
          item.caseSelects[0]
        return acc
      }, {})
    },
    handleChange(val) {
      this.conditionBox = !this.conditionBox
      switch (val) {
        case 'up':
          this.theight = this.theight + this.clientHeight - 50
          break
        default:
          this.theight = this.theight - this.clientHeight + 50
      }
      this.tabBoxHeight = this.theight + 50
    },
    getFilterList() {
      this.$store.dispatch('bicase/getlist', {
        attributeId: this.attributeId,
        objectId: this.objectId
      }).then(() => {
        this.$nextTick(() => {
          this.clientHeight = this.$refs.collapseBox.offsetHeight
          this.tabBoxHeight = this.bodyHeight - (this.clientHeight + 95)
          this.theight = this.tabBoxHeight - 50
          this.getPage()
        })
      })
    },
    currentChangePage(list) {
      const { limit, page } = list
      this.pageIndex = page
      this.pageSize = limit
    },
    handleConditionChange(option, category_id) {
      this.$set(this.selectedOptions, category_id, option)
    },
    getPage() {
      this.$store.dispatch('tab/getpage', {
        attributeId: this.attributeId,
        objectId: this.objectId,
        pageIndex: this.pageIndex,
        cases: Object.entries(this.selectedOptions)
          .map((item) => `${item[0]}:${item[1].caseSelectName || ''}`)
          .join(','),
        pageSize: this.pageSize
      })
    },
    EducationBureauFunc() {
      // 根据传过来的分心对象决定跳转

      const type = this.analysis
      const analysisObject = {
        name: type === '机构' ? 'EducationBureau'
          : type === '学校' ? 'shchoolCharts'
            : type === '教职工' ? 'facultyCharts'
              : type === '班级' ? 'classCharts'
                : type === '学生' ? 'studentCharts' : ''
      }
      this.$router.push({
        name: analysisObject.name,
        params: {
          objectId: this.objectId,
          analysis: type
        },
        query: this.$route.query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";
  .studentPop-container {
    width: calc(100% - 20px);
  }
  .collapse-title{
    position: relative;
    height: 43px;
    border-bottom:1px dashed #EDEDED;
    margin-bottom: 10px;

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
    right: 0;
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
    margin: 0 0 0 10px;
  }
  .ststistics-box{
    // position: relative;
    height: 40px;
    span{
      position: absolute;
      display: inline-block;
      @include wH(82px,26px);
      background-color: $main;
      right: 20px;
      // top: 7px;
      border-radius: 2px;
      color: $white;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      z-index: 999;
      i{
        @include graphics(18px, 18px, 4px, 0);
         background-image: url('../../../assets/tab/ststistics.png');
        @extend %bg-parameter;
        margin-right: 3px;
      }
    }
  }
</style>
<style >
   .el-table .cell{font-size: 14px;}
   .el-table--border th, .el-table--border td{border-right-color: transparent !important;}
   .el-table tr{
     background-color: #fff;
   }
   .el-table tr:nth-child(even){
     background-color: #FAFAFA;
   }
   .has-gutter tr th{
     background-color: #EDEDED;
   }
   .el-table th.is-leaf, .el-table td{
     border-color: transparent;
   }
   .el-table th.is-leaf, .el-table td{
     border-color: transparent;
   }
</style>

