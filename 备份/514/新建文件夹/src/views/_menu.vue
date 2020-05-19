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
        @click="handelSuperiorFunc(lev)"
      >
        <i class="el-icon-arrow-left" />
        <span>上级菜单</span>
      </div>
      <div
        v-show="lev == 3 && jumper"
        class="superior_class"
        @click="handelSuperiorFunc(lev)"
      >
        <i class="el-icon-arrow-left" />
        <span>上级菜单</span>
      </div>
      <hj-menu
        ref="tree"
        :treedata="treeData"
        :props="{ children: 'items', label: 'name' }"
        :render-content="renderContent"
        :has-icon="true"
        :accordion="true"
        :default-expand-all="false"
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
          v-for="item in attrsList"
          ref="treeList"
          :key="item.attributeId"
          class="wrap-item"
          :class="{Active: isActive === item.attributeId}"
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
      jumper: -1,
      isActive: null,
      treeData: []
    }
  },
  computed: {
    resultList() {
      let list = []
      switch (this.lev) {
        case 1:
          list = this.$store.state.biobject.resultList
          break
        case 2:
          list = this.$store.state.biobject.objAttr
          break
        case 3:
          list = this.$store.state.biobject.lastAttr
          break
        default:
          list = []
      }
      return list
    },
    attrsList() {
      return this.$store.state.biattribute.attrsList
    }
  },
  created: function() {
    this.$store.dispatch('biobject/getroot').then(() => {
      this.$nextTick(() => {
        this.treeData = this.resultList
      })
    })
  },
  methods: {
    nodeClickFunc() {
      this.node = this.$refs.tree.getCurrentNode()
      const { currentNode, jumper, objectId, id, lves } = this.node
      switch (currentNode) {
        case 1:
        case 2:
        case 3:
          this.jumper = jumper
          this.$store.dispatch('biattribute/getlist', { objectId: objectId })
            .then((res) => {
              this.isActive = null
              if (res.length > 0) {
                this.$nextTick(() => {
                  this.routerFunc(this.attrsList.map(item => item.attributeId))
                })
              } else {
                this.$router.push({
                  name: 'noData'
                })
              }
            })
          break
        case 4:
          this.lev = lves
          this.treeData = []
          this.$store.dispatch('biobject/getroot').then(() => {
            this.$nextTick(() => {
              this.treeData = this.resultList
            })
          })
          if (this.lev === 2) {
            this.$store.dispatch('biobject/getsub', { objectId: id })
          } else if (this.lev === 3) {
            this.$store.dispatch('biobject/getLastSub', { objectId: id })
          }
          this.jumper = jumper
          break
        default:
          this.jumper = jumper
          this.$store.dispatch('biattribute/getlist', { objectId: objectId })
          this.$router.push({
            name: 'noData'
          })
      }
    },
    handelObjAttr(objAttrItme) { // 对象属性跳转表单页面
      const { description } = this.node

      this.isActive = objAttrItme.attributeId
      this.$router.push({
        name: 'LEATable',
        query: {
          attributeId: objAttrItme.attributeId
        },
        params: {
          objectId: this.node.objectId,
          analysis: description
        }
      })
    },
    handelSuperiorFunc(lev) {
      this.treeData = []
      if (this.lev === 2) {
        this.lev = 1
      } else if (this.lev === 3) {
        this.lev = 2
      }
      this.$nextTick(() => {
        this.$store.dispatch('biobject/getroot').then(() => {
          this.$nextTick(() => {
            this.treeData = this.resultList
          })
        })
      })
      this.jumper = 2
    },
    routerFunc(List) {
      const { description, objectId, name } = this.node
      this.$router.push({
        name: 'dashboard',
        params: {
          objectId: objectId,
          nodeName: name,
          attributeIdArr: List.join(','),
          analysisObject: description // 判断是什么分析对象....
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";

  %btn {
    border-color: $main;
    background:transparent;
    color: $main;
  }

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
          background-image: url('../assets/menu/menuobj-attr.png');
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
          border:1px solid transparent;
          &:hover{
            @extend %btn ;
          }
        }
        .wrap-item.Active {
          @extend %btn ;
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
        background-image: url('../assets/menu/menu-object.png');
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
span.is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
    display: none;
}
</style>
