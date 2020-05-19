<template>
  <el-drawer
    title="学校档案搜索"
    class="eldrawer"
    v-bind="$attrs"
    :visible.sync="drawer"
    :append-to-body="true"
    :show-close="false"
    :size="drawersize"
    v-on="$listeners"
  >
    <slot />
  </el-drawer>
</template>
<script>
export default {
  inheritAttrs: true
}
</script>
<style lang="scss">

</style>
