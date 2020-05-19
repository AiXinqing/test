<template>
  <div class="main-container">
    <menu-nav />
    <div class="right-contten">
      <head-nav />
      <mainPage />
    </div>

  </div>
</template>

<script>
import MenuNav from './menuFeatures/index'
import headNav from './head/index'
import mainPage from './mainPage/index'

export default {
  components: {
    MenuNav,
    headNav,
    mainPage
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
          return mainPage
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
