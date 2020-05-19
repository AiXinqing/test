<template>
  <section>
    <div class="condition-name">{{ conditionItem.name }}</div>
    <div class="condition-btnBox">
      <div
        v-for="(row, a) in conditionItem.caseSelects"
        :key="a"
        :class="[{active: conditionState == row.caseSelectId || initialState == a},'btn-item']"
        @click="handelCondition(row,conditionItem.caseId)"
      >{{ row.name }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    conditionItem: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      conditionBox: '',
      conditionState: this.currentCondition,
      initialState: 0
    }
  },
  computed: {
    currentCondition() {
      return this.conditionItem.caseSelects[0].caseSelectId
    }
  },
  methods: {
    handelCondition(conditionItem, caseId) {
      this.initialState = -1
      this.conditionState = conditionItem.caseSelectId
      const obj = {
        ...conditionItem,
        caseId: caseId
      }
      this.$emit('handel-condition', obj)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/label.scss";
  .condition-box{
    margin-top: 10px;
    display: flex;
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

