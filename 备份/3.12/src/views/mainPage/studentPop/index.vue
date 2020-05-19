<template>
  <div class="studentPop-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          {{ title }}
          <dt class="header-name"> {{ titleName }}</dt>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
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
  .header-name{
    position: absolute;
    right: 25px;
  }
</style>
