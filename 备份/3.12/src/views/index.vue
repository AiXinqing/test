<template>
  <div class="main-container">
    <menu-nav />
    <div class="right-contten">
      <head-nav />
      <component
        :is="iscomponent"
      />
    </div>

  </div>
</template>

<script>
import MenuNav from './menuFeatures/index'
import headNav from './head/index'
import Home from './mainPage/home'
import studentPop from './mainPage/studentPop/index'

export default {
  components: {
    MenuNav,
    headNav,
    Home,
    studentPop
  },
  data() {
    return {
      currentNode: null
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    iscomponent() {
      switch (this.currentNode) {
        case '':
          break
        default:
          return studentPop
      }
    }
  }

}
</script>

<style lang="scss" scoped>
	.main-container{
    display: flex;

    .right-contten{
      width: 100%;
    }
	}
</style>
