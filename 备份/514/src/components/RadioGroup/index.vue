<template>
  <el-radio-group
    class="hj-radio-group"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-radio
      v-for="(item, index) in items"
      :key="index"
      :label="item.id"
      :disabled="item.disabled"
    >
      <i>{{ item.name }} </i>
      <b>{{ item.hint }}</b>
    </el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: 'RadioGroup',
  inheritAttrs: true,
  props: {
    items: {
      default() {
        return []
      },
      type: Array
    }
  }
}
</script>
<style>
  .hj-radio-group i{
    font-style: normal;
  }
  .hj-radio-group b{
    font-weight: normal;
    color:#999999;
  }
  .hj-radio-group .el-radio__inner{
    width: 16px;
    height: 16px;
    border-color: #c2c2c2;
  }
  .hj-radio-group .is-checked .el-radio__inner{
    border-color: #1AB394;
    background: #ffffff;
  }
  .hj-radio-group .is-checked .el-radio__inner::after{
    width: 8px;
    height: 8px;
    background-color: #1AB394;
  }
  .hj-radio-group .el-radio__label {
    color: #333333;
    padding-left: 3px;
  }
  .hj-radio-group .is-checked+.el-radio__label{
    color: #333333;
  }
  /* 纵向排列 */
  .verticalRadio label{
    display: block;
    line-height: 26px;
  }
  .hj-radio-group .el-radio__input.is-disabled+span.el-radio__label {
    color: #999999;
  }
</style>
