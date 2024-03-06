<template>
	<main
		class="layout-default"
		id="main"
	>
		<Header />
		<article id="article">
			<RouterView />
		</article>
		<Footer />
	</main>
</template>

<script setup>
	import Header from '@/components/Header.vue';
	import Footer from '@/components/Footer.vue';
</script>
