<template>
  <section class="ces-table-page">
    <!-- :height="autoHeight?'':theight" -->
    <!-- v-if="autoHeight?``:`:height='theight'`" -->
    <section :class="ispagination?'ces-table':'ces-tableNoPage'">
      <el-table
        v-if="!autoHeight"
        ref="cesTable"
        v-loading="vLoading"
        :height="theight"
        :data="datas"
        :size="size"
        :row-key="rowKey"
        :row-style="rowStyle"
        :row-class-name="rowClassName"
        :highlight-current-row="currentrow"
        class="eltable"
        :border="isborder"
        :default-selections="defaultSelections"
        :row-height="rowHeight"
        @current-change="CurrentRowChange"
        @selection-change="SelectionRowChange"
        @row-click="rowClick"
      >
        <!-- 表头 -->
        <el-table-column v-if="isSelection" type="selection" align="center" :selectable="selectable" :width="35" />
        <el-table-column v-if="isIndex" type="index" :label="indexlabel" align="center" width="50" :fixed="indexFixed" :class-name="'index-column-class'" />
        <slot name="ago" />
        <el-table-column v-for="(item,index) in info" :key="index" :label="item.label" :filters="item.filters" :prop="item.prop" :width="item.width" :min-width="item.minwidth" :align="item.align | align" :fixed="item.fixed | fixed">
          <el-table-column v-for="(items,indexs) in item.multilevel" :key="indexs" :label="items.label" :prop="items.prop" :width="items.width" :align="item.align" />
        </el-table-column>
        <slot name="operation" />
      </el-table>
      <el-table
        v-else
        ref="cesTable"
        v-loading="vLoading"
        :data="datas"
        :size="size"
        :row-key="rowKey"
        :row-style="rowStyle"
        :row-class-name="rowClassName"
        :highlight-current-row="currentrow"
        class="eltable"
        :border="isborder"
        :default-selections="defaultSelections"
        :row-height="rowHeight"
        @current-change="CurrentRowChange"
        @selection-change="SelectionRowChange"
        @row-click="rowClick"
      >
        <!-- 表头 -->
        <el-table-column v-if="isSelection" type="selection" align="center" :selectable="selectable" :width="35" />
        <el-table-column v-if="isIndex" type="index" :label="indexlabel" align="center" width="50" :fixed="indexFixed" :class-name="'index-column-class'" />
        <slot name="ago" />
        <el-table-column v-for="(item,index) in info" :key="index" :label="item.label" :filters="item.filters" :prop="item.prop" :width="item.width" :min-width="item.minwidth" :align="item.align | align" :fixed="item.fixed | fixed">
          <el-table-column v-for="(items,indexs) in item.multilevel" :key="indexs" :label="items.label" :prop="items.prop" :width="items.width" :align="item.align" />
        </el-table-column>
        <slot name="operation" />
      </el-table>
    </section>
    <div v-if="ispagination" class="ces-pagination">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :pager-count="pagerCount"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>
<script>
// import { scrollTo } from '@/utils/scroll-to'
import Sortable from 'sortablejs'
export default {
  name: 'TablePaging',
  filters: {
    //  固定列需要使用fixed属性，它接受 Boolean 值或者left right，表示左边固定还是右边固定。
    fixed(val) {
      if ((val == null || val === undefined || val === 'undefined') || (val !== 'true' && val !== 'false' && val !== 'left' && val !== 'right')) {
        return false
      }
    },
    align(val) {
      if (val === 'left' || val === 'right' || val === 'center') {
        return val
      }
      return 'left'
    }
  },
  props: {
    rowClassName: {
      type: String,
      default: ''
    },
    rowKey: {
      type: String,
      default: ''
    },
    rowStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    info: {
      type: Array,
      default() {
        return []
      }
    },
    datas: {
      type: Array,
      default() {
        return []
      }
    },
    // 遮罩
    vLoading: {
      type: Boolean,
      default: false
    },
    // 是否显示表格复选框
    isSelection: {
      type: [Boolean, String],
      default: false
    },
    selectable: { type: Function, default: () => true },
    defaultSelections: { type: [Array, Object], default: () => null },
    isborder: {
      type: [Boolean, String],
      default: false
    },
    cellStyle: {
      type: Function,
      default: () => {
        return false
      }
    },
    // 设置行高亮
    currentrow: {
      type: Boolean,
      default: false
    },
    // 行高,为计算显示区域
    rowHeight: {
      type: Number,
      default: 30
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    // 表格高度
    theight: { type: [String, Number], default: '100%' },
    // 表格型号：mini,medium,small
    size: { type: String, default: 'mini' },
    // 是否显示表格索引
    isIndex: {
      type: [Boolean, String],
      default: false
    },
    indexlabel: { type: String, default: '序号' },
    indexFixed: { type: Boolean, default: false },
    align: {
      type: String,
      default: 'center'
    },
    // 通过设置max-height属性为 Table 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条
    maxheight: {
      type: [Number, String],
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    // 是否隐藏分页
    ispagination: {
      type: [Boolean, String],
      default: true
    },
    // 页码按钮数量
    pagerCount: {
      type: [Number, String],
      default: 7
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  mounted() {
    // this.rowDrop()
    // this.columnDrop()
  },
  methods: {
    rowClick(row, column, event) {
      this.$emit('rowClick', { row: row, column: column, event: event })
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    },
    // 单选(可以取到当前行所有数据)
    CurrentRowChange(val) {
      this.$emit('CurrentRowChange', val)
    },
    // 多选（数据）
    SelectionRowChange(val) {
      this.$emit('SelectionRowChange', val)
    },
    handleSizeChange(val) {
      this.$emit('pagination', { page: 1, limit: val })
      if (this.autoScroll) {
        // scrollTo(0, 800)
        this.$nextTick(function() {
          if (typeof this.afterRender === 'function') {
            const that = this
            that.afterRender(that.$refs.cesTable)
          }
          if (this.$refs.cesTable.$el.childNodes[2]) {
            const node = this.$refs.cesTable.$el.childNodes[2]
            node.scrollTop = 0
            node.scrollLeft = 0
          }
        })
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        // scrollTo(0, 800)
        this.$nextTick(function() {
          if (typeof this.afterRender === 'function') {
            const that = this
            that.afterRender(that.$refs.cesTable)
          }
          if (this.$refs.cesTable.$el.childNodes[2]) {
            const node = this.$refs.cesTable.$el.childNodes[2]
            node.scrollTop = 0
            node.scrollLeft = 0
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.ces-pagination {
  position: absolute;
  bottom: 0px;
  left: 0;
  overflow: auto;
  white-space: nowrap;
  height: 43px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-pagination{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span:not([class*=suffix]),button{
      display: inline-block;
      font-size: 12px;
      min-width: 35.5px;
      height: 24px;
      line-height: 24px;
      vertical-align: top;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .el-pagination__sizes{
      height: 24px;
      line-height: 24px;
      .el-input--mini .el-input__inner{
        height: 24px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .el-pager li{
      height: 24px;
      line-height: 24px;
      font-size: 10px;
    }
    .el-pagination__jump .el-pagination__editor .el-input__inner{
      height: 24px;
    }
  }
}
.ces-table-page {
  position: relative;
  height: 100% !important;
  width: 100%;
}
.ces-table{
  width: 100%;
  height: calc(100% - 43px);
  position: relative;
}
.ces-tableNoPage{
  width: 100%;
  height: 100%;
  position: relative;
}
.eltable{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-table tr{
  height: 30px;
}
.el-table th.is-leaf,.el-table td{
  border-bottom: 1px solid #eee;
}
.el-table--mini td{
  padding: 2px 0;
}
.el-table--mini th{
  padding: 3px 0;
}
.el-table-column--selection .cell{
  padding-left: 10px;
  padding-right: 10px;
}
</style>
