<template>
  <div class="main-menu-container">
    <div class="conpany-name">宏劲科技</div>
    <div class="analysis-object">
      <div class="nav-label">
        <i />
        <span>分析对象</span>
      </div>
      <hj-menu
        :treedata="menuList"
        :props="{ children: 'children', label: 'describe' }"
      />
    </div>
    <div class="object-properties">
      <div class="nav-label">
        <i />
        <span>对象属性</span>
      </div>
      <div class="menu-objAttr-wrap">
        <div
          v-for="(item, index) in objAttr"
          :key="index"
          class="wrap-item"
        >{{ item }}</div>
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
      menuList: [
        {
          describe: '一级 1',
          children: [{
            describe: '二级 1-1',
            children: [{
              describe: '三级 1-1-1'
            }]
          }]
        }, {
          describe: '一级 2',
          children: [{
            describe: '二级 2-1',
            children: [{
              describe: '三级 2-1-1'
            }]
          }, {
            describe: '二级 2-2',
            children: [{
              describe: '三级 2-2-1'
            }]
          }]
        }, {
          describe: '一级 3',
          children: [{
            describe: '二级 3-1',
            children: [{
              describe: '三级 3-1-1'
            }]
          }, {
            describe: '二级 3-2',
            children: [{
              describe: '三级 3-2-1'
            }]
          }]
        }
      ],
      objAttr: ['学生人口', '学生考勤', '教职工人口', '学生校园卡消费']
    }
  },
  computed: {
    resultList() {
      return this.$store.state.biobject.resultList
    }
  },
  created: function() {
    this.$store.dispatch('biobject/getroot')
      .then(res => {

      })
  }
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";

  .main-menu-container{
    width: 220px;
    height: auto;
    background-color: $menuBg;

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
      height: 60%;
      overflow: auto;
      border-bottom: 1px solid #4D5C72
    }
    .object-properties{
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
    padding: 0 5px;
    height: 28px;
    line-height: 28px;
    width: 85%;
  }
  .el-tree-node__content:hover span.tree-label,
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content span.tree-label{
    background-color: #0A95FF;
    color: #fff;
    border-radius: 3px;
  }
  .el-tree-node:focus>.el-tree-node__content{
    background-image: #283D57 !important;
  }
</style>
