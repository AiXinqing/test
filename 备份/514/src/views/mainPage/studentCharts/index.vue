<template>
  <component
    :is="chartsComponet"
  />

</template>

<script>

import RecentConsumption from './_RecentConsumption'
import RecentAttendance from './_RecentAttendance'
import RecentResults from './_RecentResults'

export default {
  components: {
    RecentConsumption,
    RecentAttendance,
    RecentResults
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
        case 14:
          return RecentConsumption
        case 15:
          return RecentAttendance
        case 16:
          return RecentResults
        default:
          return null
      }
    }
  }
}
</script>

