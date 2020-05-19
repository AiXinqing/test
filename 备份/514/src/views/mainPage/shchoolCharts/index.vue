<template>
  <component
    :is="chartsComponet"
  />

</template>

<script>

import studentPop from './_studentPop'
import FacultyPop from './_FacultyPop'
import studentAttendance from './_studentAttendance'
import stuCardAttendance from './_stuCardAttendance'
// import examination from './_examination'

export default {
  components: {
    studentPop,
    FacultyPop,
    studentAttendance,
    stuCardAttendance
    // examination
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
        case 6:
          return studentPop
        case 7:
          return FacultyPop
        case 8:
          return studentAttendance
        case 9:
          return stuCardAttendance
        // case 5:
        //   return examination
        default:
          return null
      }
    }
  }
}
</script>

