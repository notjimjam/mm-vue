import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
