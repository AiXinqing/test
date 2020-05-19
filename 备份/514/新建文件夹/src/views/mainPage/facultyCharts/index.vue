<template>

  <component
    :is="chartsComponet"
  />

</template>

<script>

import teachingOften from './_teachingOften'
import MonthlyTest from './_MonthlyTest'

export default {
  components: {
    teachingOften,
    MonthlyTest
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
        case 10:
          return teachingOften
        case 11:
          return MonthlyTest
        default:
          return null
      }
    }
  }
}
</script>

