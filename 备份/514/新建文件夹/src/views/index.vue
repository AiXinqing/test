<template>
  <div class="main-container">
    <menu-nav />
    <div class="right-contten">
      <head-nav />
      <router-view />
    </div>

  </div>
</template>

<script>
import MenuNav from './_menu'
import headNav from './_head'

export default {
  components: {
    MenuNav,
    headNav
  },
  data() {
    return {
      currentNode: null
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
