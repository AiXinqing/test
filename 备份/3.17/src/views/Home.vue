<template>
  <div class="main-container">
    <menu-nav />
    <head-nav />
  </div>
</template>

<script>
import MenuNav from './menuFeatures/index'
import headNav from './head/index'

export default {
  components: {
    MenuNav,
    headNav
  }

}
</script>

<style lang="scss" scoped>
	.main-container{
		display: flex
	}
</style>
