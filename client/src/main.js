import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import 'uno.css';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.provide('appInstance', app);

app.mount('#app');
