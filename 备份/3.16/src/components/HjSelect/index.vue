<template>
  <div :class="{'has-error':error}" class="hj-select">
    <el-select
      v-if="!group"
      popper-class="hj-select-dropdown"
      v-bind="$attrs"
      :disabled="isdisabled"
      :clearable="clearable"
      :multiple="multiple "
      v-on="$listeners"
    >
      <el-option
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-else
      popper-class="hj-select-dropdown"
      v-bind="$attrs"
      :disabled="isdisabled"
      :clearable="clearable"
      :multiple="multiple "
      v-on="$listeners"
    >
      <el-option-group
        v-for="(item,index) in items"
        :key="index"
        :label="item.label"
      >
        <el-option
          v-for="tmp in item.items"
          :key="tmp.value"
          :label="tmp.label"
          :value="tmp.value"
        />
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'HjSelect',
  inheritAttrs: true,
  props: {
    items: {
      default() {
        return []
      },
      type: Array
    },
    group: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    isdisabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // change(value) {
    //   this.$emit('change', value)
    // }
  }
}
</script>
<style>
.hj-select input{
  height: 26px;
  padding: 0 8px;
  line-height: 26px;
  color: #333333;
}
.hj-select .el-select {
  width: 202px;
}
.hj-select .el-input__suffix{
  right: 0;
  top: 0px;
}
.hj-select .is-focus .el-input__suffix{
  top: -7px;
}
.hj-select .el-select .el-input.is-focus .el-input__inner,.hj-select .el-select .el-input__inner:focus {
  border-color: #8CD9C9;
}
.hj-select-dropdown .el-select-dropdown__item{
  padding: 0 23px;
  height: 24px;
  line-height: 24px;
  font-size: 13px;
  color: #333333;
}
.hj-select-dropdown .el-select-dropdown__item.selected{
  margin: 0 10px;
  padding: 0 13px;
  color: #ffffff;
  background-color: #1AB394;
  border-radius: 4px;
  font-weight: normal;
}
</style>
<style lang="scss">
.hj-select.has-error{
  input {
    border-color: #f56c6c;
  }
}
</style>
