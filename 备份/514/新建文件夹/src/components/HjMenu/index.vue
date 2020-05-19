<template>
  <div class="hj-tree">
    <el-tree
      ref="tree"
      :data="treedata"
      :props="props"
      :node-key="nodeKey"
      :default-expanded-keys="open"
      highlight-current
      v-bind="$attrs"
      v-on="$listeners"
      @node-collapse="closeNode"
    >
      <span v-if="isCustomer" slot-scope="{node , data}" class="tree-label">
        <img v-if="hasIcon" :src="node.isCurrent ? data.currentIconPath : data.iconPath" alt="">
        <!-- 用户更改了 props 的 label 映射后 data.name 不再生效-->
        {{ node.label }}
        <i v-if="hasSub">{{ data.sub }}</i>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { Tree } from 'element-ui'
export default {
  name: 'hjTree',
  components: {
    elTree: Tree
  },
  inheritAttrs: true,
  props: {
    treedata: { type: Array },
    rootNode: { type: String },
    hasIcon: {
      type: Boolean,
      default: false
    },
    hasSub: {
      type: Boolean,
      default: false
    },
    isCustomer: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: 'childrens',
          label: 'name'
        }
      }
    },
    nodeKey: {
      type: String,
      default: 'orgId'
    }
  },
  data() {
    return {
      open: [], // 默认展开节点
      currentN: ''
    }
  },
  methods: {
    closeNode(node) {
      if (node.orgId === this.rootNode) {
        // window.console.log('正在关闭0节点')
        this.open = [this.rootNode]
        // this.open = ["001"]
      }
    },
    // 通过 key 设置某个节点的当前选中状态
    setCurrentKey(key) {
      this.open = [key]
      this.$refs.tree.setCurrentKey(key)
      return this.$refs.tree.getNode(key)
    },
    // 根据 data 或者 key 拿到 Tree 组件中的 node
    getNode(key) {
      return this.$refs.tree.getNode(key)
    },
    // 为 Tree 中的一个节点追加一个子节点
    append(data, node) {
      this.$refs.tree.append(data, node)
    },
    // 为 Tree 的一个节点的后面增加一个节点
    insertAfter(data, node) {
      this.$refs.tree.insertAfter(data, node)
    },
    // 返回目前被选中的节点所组成的数组
    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    // 返回目前被选中的节点的 key 所组成的数组(新加的)
    getCheckedKeys(leafOnly) {
      return this.$refs.tree.getCheckedKeys(leafOnly)
    },
    // 设置目前勾选的节点
    setCheckedNodes(nodes) {
      this.$refs.tree.setCheckedNodes(nodes)
    },
    // 设置目前勾选的节点
    setChecked(data, checked, deep) {
      this.$refs.tree.setCheckedNodes(data, checked, deep)
    },
    // 通过 keys 设置目前勾选的节点
    setCheckedKeys(keys, leafOnly) {
      this.$refs.tree.setCheckedKeys(keys, leafOnly)
    },
    // 对树节点进行筛选操作
    filter(val) {
      this.$refs.tree.filter(val)
    },
    remove(node) {
      this.$refs.tree.remove(node)
    },
    // 获取当前选中节点的data
    getCurrentNode() {
      return this.$refs.tree.getCurrentNode()
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  .el-tree-node__content{
    height: 38px;
    background-color: $menuBg;
    color: $menuText;
    font-size: 14px;
  }
  .el-icon-caret-right:before{
    color: $white;
  }
  .el-tree-node.is-current.is-focusable{
    .el-tree-node__content{
      background-image: $main;
    }
  }

</style>

<style lang="scss">
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #283D57
  }
</style>

