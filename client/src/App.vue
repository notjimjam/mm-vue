<template>
	<template v-if="isAppReady">
		<RouterView />
	</template>
	<template v-else>
		<Loading />
	</template>
</template>

<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { onMounted, ref } from 'vue';
	import '@/assets/styles.less';
	import Loading from '@/components/Loading.vue';
	
	const router = useRouter();
	const route = useRoute();
	
	const isAppReady = ref(false);
	
	const initializeApp = async () => {
		await router.isReady();
		setTimeout(() => isAppReady.value = true, 300);
	};
	
	onMounted(initializeApp);
</script>
