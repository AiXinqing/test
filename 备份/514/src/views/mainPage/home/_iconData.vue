<template>
  <div
    v-if="cardList !== undefined"
    class="data-card"
  >
    <div class="card-title">
      <i class="card-tig" />
      <span>{{ cardList.description }}</span>
      <span
        class="card-jump"
        @click="handleSeeDetail"
      >详情 <i class="el-icon-arrow-right" /></span>
    </div>

    <div
      v-show="cardListBox.graphicsData.length > 0"
      class="card-circleBox"
      :style="{width:167.5 * cardListBox.graphicsData.length + 40 +'px'}"
    >
      <div
        v-for="(row, d) in cardListBox.graphicsData"
        :key="d"
        class="card_multiple"
        :style="{width:100/cardListBox.graphicsData.length + '%'}"
      >
        <div :class="[row.class, 'graphics-style']">
          <div class="num">{{ row.num }}</div>
          <div class="unit">{{ row.unit }}</div>
        </div>

        <div class="name">{{ row.name }}</div>
      </div>
    </div>
    <div
      v-for="(row, i) in cardListBox.columns"
      v-show="cardListBox.columns.length > 0"
      :key="i"
      class="card-imgBox"
    >
      <div :class="[row.classImg, 'card-imgStyle']" />
      <div class="imgData-num">
        <span>{{ row.text }}</span>
        <span class="num">{{ row.num }}</span>
        <span>{{ row.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardId: {
      type: String,
      default: '1'
    }
  },
  computed: {
    cardList() {
      return this.$store.state.chaicon.attributes.find((item) => {
        return item.caseId === this.cardId
      })
    },
    cardListBox() {
      const cardListBox = {
        graphicsData: [],
        columns: []
      }
      if (this.cardList !== undefined) {
        const { datas, columns } = this.cardList
        if (datas !== undefined) {
          const perBoxObj = datas.map((element) => {
            const dataObj = {}
            for (var key in element.itemArray) {
              dataObj[columns[key]] = element.itemArray[key]
            }
            return dataObj
          })
          if (perBoxObj.length > 1) {
            perBoxObj.forEach((element, index) => {
              let objList = {}
              const str = element.VAL + ''
              let num = 0
              if (str.indexOf('.') === -1) {
                num = parseFloat(str).toFixed(2)
              } else {
                num = element.VAL
              }

              objList = {
                name: element.TYPE,
                unit: element.UNAME,
                num: num === '' ? 0 : num, //
                class: index === 0 ? 'graphics-one' : index === 1 ? 'graphics-two' : 'graphics-three'
              }
              cardListBox.graphicsData.push(objList)
            })
          } else {
            perBoxObj.forEach((element, index) => {
              let objList = {}
              objList = {
                text: element.TYPE,
                unit: element.UNAME,
                num: element.VAL === '' ? 0 : element.VAL,
                classImg: element.TYPE.indexOf('学生人数') !== -1 ? 'student-img'
                  : element.TITLE.indexOf('教职工') !== -1 ? 'teacher-img'
                    : element.TYPE.indexOf('考试') !== -1 ? 'examination-img' : 'public-img'

              }
              cardListBox.columns.push(objList)
            })
          }
        }
      }

      return cardListBox
    }
  },
  methods: {
    handleSeeDetail() {
      this.$emit('handleSeeDetail')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
