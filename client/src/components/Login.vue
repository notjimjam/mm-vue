<template>
	<a :href="authUrl">
		Login in with Spotify
	</a>
</template>

<script setup>
	import config from '../../cfg/config.js';
	const authUrl = config.authUrl;
</script>
