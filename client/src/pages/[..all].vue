<template>
	<h1>
		404
	</h1>
	<div>
		Page Not Found
	</div>
	<button @click="router.back()">
		Back
	</button>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	
	const router = useRouter();
</script>
