<template>
  <component
    :is="chartsComponet"
  />

</template>

<script>

import JanuaryConsumption from './_JanuaryConsumption'
import FiveWeeks from './_fiveWeeks'

export default {
  components: {
    JanuaryConsumption,
    FiveWeeks
  },
  computed: {
    attributeId() {
      return this.$route.query.attributeId
    },
    objectId() {
      return this.$route.params.objectId
    },
    chartsComponet() {
      const attrId = parseInt(this.attributeId)
      switch (attrId) {
        case 12:
          return JanuaryConsumption
        case 13:
          return FiveWeeks
        default:
          return null
      }
    }
  }
}
</script>

