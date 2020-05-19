<template>
  <div class="main-menu-container">
    <div class="conpany-name">宏劲科技</div>
    <div class="analysis-object">
      <div class="nav-label">
        <i />
        <span>分析对象</span>
      </div>
      <div
        v-show="lev == 2 && jumper"
        class="superior_class"
        @click="handelSuperiorFunc"
      >
        <i class="el-icon-arrow-left" />
        <span>上级菜单</span>
      </div>
      <hj-menu
        ref="tree"
        :treedata="resultList"
        :props="{ children: 'items', label: 'name' }"
        :render-content="renderContent"
        :has-icon="true"
        node-key="id"
        @node-click="nodeClickFunc"
      />
    </div>
    <div class="object-properties">
      <div class="nav-label">
        <i />
        <span>对象属性</span>
      </div>
      <div class="menu-objAttr-wrap">
        <div
          v-for="(item, index) in attrsList"
          ref="treeList"
          :key="index"
          class="wrap-item"
          @click="handelObjAttr(item)"
        >{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HjMenu from '@/components/HjMenu'
export default {
  components: {
    HjMenu
  },
  data() {
    return {
      renderContent: (h, { data }) => {
        let attrs = ''
        let Arr = []
        switch (data.currentNode) {
          case 4 :
            attrs = 'tree-label tree-subordinate'
            if (data.jumper === '2') {
              Arr = [
                h('i', {
                  attrs: { class: 'el-icon-arrow-right' }
                }, ' ')
              ]
            }
            break
          default :
            attrs = 'tree-label'
        }
        return h('span', {
          attrs: { class: attrs }
        }, [data.name,
          ...Arr]
        )
      },
      node: [],
      lev: 1,
      jumper: -1
    }
  },
  computed: {
    resultList() {
      let list = []
      if (this.lev === 1) {
        list = this.$store.state.biobject.resultList
      } else {
        list = this.$store.state.biobject.objAttr
      }
      return list
    },
    attrsList() {
      return this.$store.state.biattribute.attrsList
    }
  },
  created: function() {
    this.$store.dispatch('biobject/getroot')
  },
  methods: {
    nodeClickFunc() {
      this.node = this.$refs.tree.getCurrentNode()
      switch (this.node.currentNode) {
        case 1:
          this.jumper = this.node.jumper
          this.$store.dispatch('biattribute/getlist', { objectId: this.node.objectId })
          this.$router.push({
            path: '/home/dashboard',
            query: {}})
          break
        case 4:
          this.lev = 2
          this.jumper = this.node.jumper
          this.$store.dispatch('biobject/getsub', { objectId: this.node.id })
          break
        default:
          this.jumper = this.node.jumper
          this.$store.dispatch('biattribute/getlist', { objectId: this.node.objectId })
      }
    },
    handelObjAttr(objAttrItme) {
      this.$router.push({
        path: '/home/studentTab',
        query: {
          attributeId: objAttrItme.attributeId,
          objectId: this.node.objectId
        }})
    },
    handelSuperiorFunc() {
      this.lev = 1
      this.jumper = 2
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";

  .main-menu-container{
    width: 220px;
    height: 100%;
    background-color: $menuBg;

    .superior_class{
      width:84px;
      height:28px;
      border-radius:4px;
      border:1px solid $main;
      line-height: 28px;
      text-align: center;
      color: $main;
      font-size: 14px;
      margin: 5px 0 0px 29px;
      cursor: pointer;
    }

    .conpany-name{
      width: 220px;
      height: 40px;
      line-height: 40px;
      font-size:21px;
      font-weight:bold;
      background:$menuBg;
      color: $white;
      text-align: center;
    }

    .analysis-object{
      height: calc(100% - 349px);
      border-bottom: 1px solid #4D5C72;
      overflow: auto;
    }
    .object-properties{
      height: 304px;
      margin-top: 5px;
      .nav-label{
        i{
          background-image: url('../../assets/menu/menuobj-attr.png');
        }
      }

      .menu-objAttr-wrap{
        display: flex;
        flex-wrap: wrap;

        .wrap-item{
          padding: 7px 10px;
          border-radius: 4px;
          color: $white;
          background-color: $menuBg-btn;
          font-size: 14px;
          margin-top: 14px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
    .nav-label{
      height: 43px;
      line-height: 43px;
      background-color: $menuBg-shallow;
      color: $white;
      font-size: 14px;
      text-indent: 15px;

      i{
        @include graphics(14px, 14px, 1px, 0);
        background-image: url('../../assets/menu/menu-object.png');
        @extend %bg-parameter;
        margin-right: 5px;
      }
    }
  }

</style>

<style>
  .el-tree-node__content:hover,
  .el-tree-node__content:focus,
  .el-tree-node__content:visited,
  .el-tree-node__content:active{
    background-color: #283D57 !important;
  }
  span.tree-label{
    display: inline-block;
    background-color: transparent;
    padding: 0 3px 0 5px;
    height: 28px;
    line-height: 28px;
    max-width: 85%;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border:1px solid transparent;
  }
  .el-tree-node__content:hover span.tree-label,
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content span.tree-label{
    background-color: #0A95FF;
    color: #fff;
    border-radius: 3px;

  }

.el-tree--highlight-current .el-tree-node > .el-tree-node__content span.tree-label.tree-subordinate{
   background-color:transparent;
   border-color: #0A95FF;
   color: #0A95FF;
}
  .el-tree-node:focus>.el-tree-node__content{
    background-image: #283D57 !important;
  }
  .el-tree-node:focus>.el-tree-node__content {
    background-color: #283D57 !important;
  }
  span.tree-label.tree-subordinate{
    border:1px solid transparent;
    background-color:transparent !important;
    border-color: #0A95FF;
    color: #0A95FF;
    border-radius: 4px;
  }
.el-tree{ background-color: transparent;}
</style>
