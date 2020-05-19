<template>
  <div>
    <component
      :is="chartsComponet"
    />1
  </div>
</template>

<script>

import studentPop from './_studentPop'
import FacultyPop from './_FacultyPop'
import studentAttendance from './_studentAttendance'
import stuCardAttendance from './_stuCardAttendance'
import examination from './_examination'

export default {
  components: {
    studentPop,
    FacultyPop,
    studentAttendance,
    stuCardAttendance,
    examination
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
        case 1:
          return studentPop
        case 2:
          return FacultyPop
        case 3:
          return studentAttendance
        case 4:
          return stuCardAttendance
        case 5:
          return examination
        default:
          return null
      }
    }
  }
}
</script>

