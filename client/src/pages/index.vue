<template>
	<div v-if="! code">
		<Login />
	</div>
	<div v-else>
		<Dashboard />
	</div>
</template>

<script setup>
	import Login from '../components/Login.vue';
	import Dashboard from '../components/Dashboard.vue';
	
	const code = ref('');
	
	const getCode = () => {
		const newCode = new URLSearchParams(window.location.search).get('code');
		if (newCode) {
			code.value = newCode;
		}
	};
	
	watch(() => window.location.search, getCode, { immediate: true });
</script>
