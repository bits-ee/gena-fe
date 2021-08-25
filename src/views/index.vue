<template>
  	<header>
		<navbar-component></navbar-component>
		<div class="parallax"></div>
	</header>

	<main>
		<div class="container my-5">
			<megaicons-component></megaicons-component>
		</div>

		<hr class="separator">

		<div class="container-fluid my-5">
			<locator-component></locator-component>
		</div>

		<hr class="separator">

		<div class="container-fluid my-5">
			<bottomline-component></bottomline-component>
		</div>
	</main>
	<footer-component></footer-component>
</template>

<script>
import c_locator from '../components/locator.vue'
import c_navbar from '../components/navbar.vue'
import c_megaicons from '../components/megaicons.vue'
import c_bottomline from '../components/bottomline.vue'
import c_footer from '../components/footer.vue'
import { defineComponent } from 'vue'
export default defineComponent({
	components:{
		'locator-component': c_locator,
        'navbar-component': c_navbar,
        'megaicons-component': c_megaicons,
        'bottomline-component': c_bottomline,
        'footer-component': c_footer
	}
})
</script>

<style>
</style>