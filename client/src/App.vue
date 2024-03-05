<template>
	<template v-if="isAppReady">
		<RouterView />
	</template>
	<template v-else>
		LOADING
	</template>
</template>

<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { onMounted, ref } from 'vue';
	
	const router = useRouter();
	const route = useRoute();
	
	const isAppReady = ref(false);
	
	const initializeApp = async () => {
		await router.isReady();
		setTimeout(() => isAppReady.value = true, 300);
	};
	
	onMounted(initializeApp);
</script>
