<template>
  <section>
    <div class="condition-name">{{ conditionItem.name }}</div>
    <div class="condition-btnBox">
      <div
        v-for="row in conditionItem.caseSelects"
        :key="row.caseSelectId"
        :class="{
          active: selectedId === row.caseSelectId
        }"
        class="btn-item"
        @click="handelCondition(row)"
      >{{ row.name }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    conditionItem: {
      type: Object,
      required: true
    },
    selectedId: {
      type: [Number, String],
      required: true
    }
  },

  methods: {
    handelCondition(option) {
      this.$emit('condition-change', option, this.conditionItem.caseId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/label.scss";

  .condition-box{
    margin-top: 5px;
    display: flex;
    min-height: 31px;

    .condition-name{
      @include wH(86px,auto);
      min-width: 86px;
      text-indent: 15px;
      line-height: 26px;
      font-size:14px;
      color: $font-666;
    }
    .condition-btnBox{
      width: cacl(100% -86px);
      display: flex;
      flex-flow: row wrap;
      .btn-item{
        padding: 0 8px;
        border-radius:4px;
        font-size:14px;
        color: $font-333;
        cursor: pointer;
        margin-bottom: 5px;
        @include wH(auto,26px);
      }
      .btn-item.active{
        background-color:$main;
        color: $white;
      }
    }
  }
</style>

