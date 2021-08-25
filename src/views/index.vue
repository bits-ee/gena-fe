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

<style scoped>
.separator {
	width: 66%;
	margin: 0 auto;
}

.parallax {
  background: url(../assets/images/parallax.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

@media (max-width: 767px) {
  .parallax {
    display: none;
  }

  header {
    margin-bottom: 5em;
  }
}

@media (min-width: 768px) {
  .parallax {
    min-height: 400px;
    background-position: center -100px;
  }
}

@media (min-width: 992px) {
  .parallax {
    min-height: 450px;
    background-position: center -100px;
  }
}

@media (min-width: 1200px) {
  .parallax {
    height: 500px;
    background-position: center -100px;
  }
}

@media (min-width: 1400px) {
  .parallax {
    height: 700px;
    background-position: center -150px;
  }
}
</style>