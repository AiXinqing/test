<template>
  <div class="studentPop-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          {{ title }}
          <dt class="header-name"> {{ titleName }} </dt>
        </template>
        <div
          v-for=" (item, index) in bicaseList"
          :key="index"
          class="condition-box"
        >
          <div class="condition-name">{{ item.name }}</div>
          <div class="condition-btnBox">
            <div
              v-for="(row, a) in item.caseSelects"
              :key="a"
              :class="[{active:a == 0},'btn-item']"
            >{{ row.name }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      title: '',
      titleName: '收起'
    }
  },
  computed: {
    bicaseList() {
      return this.$store.state.bicase.bicaseList
    },
    attributeId() {
      return this.$route.params.attributeId
    },
    objectId() {
      return this.$route.params.objectId
    }
  },
  created: function() {
    console.log(this.objectId)
    this.$store.dispatch('bicase/getlist', { attributeId: this.attributeId, objectId: this.objectId })
  },
  methods: {
    handleChange(val) {
      if (val[0] !== '1') {
        this.title = '筛选条件已收起'
        this.titleName = '展开'
      } else {
        this.title = ''
        this.titleName = '收起'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";

  .header-name{
    position: absolute;
    right: 25px;
  }
  .condition-box{
    margin-top: 10px;
    display: flex;
    .condition-name{
      width: 86px;
      text-indent: 15px;
      line-height: 26px;
      font-size:14px;
      color: $font-666;
    }
    .condition-btnBox{
      width: cacl(100% -86px);
      display: flex;
      flex-wrap: 'table row';
      .btn-item{
        padding: 0 8px;
        height:26px;
        border-radius:4px;
        font-size:14px;
        line-height:26px;
        color: $font-333;
        cursor: pointer;
      }
      .btn-item.active{
        background-color:$main;
        color: $white;
      }
    }
  }
</style>
<style>
  .el-collapse-item.is-active .el-collapse-item__header.is-active{
    position: absolute;
    height:22px;
    right: 10px;
    margin-top: 10px;
    width: 58px;
    border-radius:4px;
    border:1px solid rgba(230,230,230,1);
  }
  .el-collapse-item__wrap{
    border-color: transparent;
  }
</style>
