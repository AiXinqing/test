<template>
  <section class="hjtree">
    <section v-show="issearch" class="search">
      <el-input v-model="filterText" :placeholder="placeholder">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
    </section>
    <section :class="issearch?'treerow':'issearchtreerow'">
      <el-scrollbar wrap-class="scrollbar-wrapper" class="wrapper">
        <!-- 如果开启搜索功能需在调用组件页面配置  :filter-node-method="filterNode" -->
        <el-tree
          ref="HjTree"
          class="filter-tree"
          :data="treeData"
          :draggable="draggable"
          :allow-drop="allowDrop"
          v-bind="$attrs"
          :props="defaultProps"
          node-key="id"
          :highlight-current="highlightCurrent"
          :expand-on-click-node="expandonclicknode"
          default-expand-all
          :check-on-click-node="checkOnClickNode"
          :allow-drag="allowDrag"
          @node-drop="sort"
          @node-click="nodeclick"
          @current-change="handcurrentchange"
          v-on="$listeners"
        >
          <!-- 带数据的作用域插槽 -->
          <slot slot-scope="{ node }" :node="node" />
        </el-tree>
      </el-scrollbar>
    </section>
  </section>
</template>
<script>
// import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'HjTree',
  // components: {
  //   SvgIcon
  // },
  inheritAttrs: true,
  props: {
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          id: 'id'
        }
      }
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否显示搜索文本框
    issearch: {
      type: Boolean,
      default: true
    },
    // 是否高亮显示节点
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    expandonclicknode: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    siblingDrag: {
      type: Boolean,
      default: true
    },
    checkOnClickNode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.HjTree.filter(val)
    }
  },
  methods: {
    setCurrentKey(nodes) {
      this.$refs.HjTree.setCurrentKey(nodes)
    },
    nodeclick(data, node, temp) {
    //   console.log(data, node, temp)
      this.$emit('nodeclick', { data: data, node: node, temp: temp })
    },
    handcurrentchange(data, node) {
      this.$emit('nodechange', { data: data, node: node })
    },
    getNode(data) {
      return this.$refs.HjTree.getNode(data)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (this.siblingDrag) {
        if (draggingNode.level === dropNode.level) {
          if (draggingNode.parent.id === dropNode.parent.id) {
          // 向上拖拽 || 向下拖拽
            return type === 'prev' || type === 'next'
          }
        } else {
        // 不同级进行处理
          return false
        }
      } else {
        return true
      }
    },
    sort(draggingNode, dropNode, type, event) {
      // console.log('排序')
      // console.log("<><><>>><><<><><><><><><><>")
      //  拖拽之后的重新组合的数组
      // console.log(dropNode.parent); //dropNode.parent.childNodes =[]
      const obj = {
        aboveId: '',
        arr: []
      }
      obj.aboveId = dropNode.data.aboveId
      for (const item of dropNode.parent.childNodes) {
        obj.arr.push(item.data.id)
      }
      this.$emit('sort', { draggingNode: draggingNode, dropNode: dropNode, type: type, event: event })
    },
    allowDrag(draggingNode) {
      return draggingNode.data.id === '0000' ? -1 : 1
    }
  }
}
</script>
<style lang="scss">
.hjtree{
    width: 100%;
    height: 100%;
    .search{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 50px;
    }
    .issearchtreerow{
        width: 100%;
        height: 100%;
    }
    .treerow{
        width: 100%;
        height: calc(100% - 50px);
    }
    .treerow,.issearchtreerow{
        .wrapper{
            width: 100%;
            height: 100%;
            .is-current>.el-tree-node__content{
              background-color: #42b983;
              border-radius: 2px;
              color: var(--white)
            }
            .svgIcon{
              color:var(--cyan);
              width: 18px;
              height: 18px;
            }
            .subsvgIcon{
              color: blanchedalmond;
              width: 14px;
              height: 14px;
            }
        }
    }
    .el-tree-node__content{
      height: 36px;
      &:hover{
        span.tree-label{
          display: inline-block;
          padding: 5px 8px;
          background-color: $mian
        }
      }
    }
  }
</style>

