import { RouteConfig } from 'vue-router';
import type { Tab } from '../typings/index';

interface RouterConfigTabs extends RouteConfig {
	name?: Tab
}

const routes: RouterConfigTabs[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		name: 'main',
		children: [
			{ path: '', name: 'main', component: () => import('pages/Index.vue') },
			{ path: 'settings', name: 'settings', component: () => import('pages/Settings.vue') },

		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue'),
	},
];

export default routes;
