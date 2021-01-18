import Vuex from 'vuex';

import Vue from 'vue';

import { createVuexStore } from 'vuex-simple';

export interface StateInterface {
	// Define your own store structure, using submodules if needed
	// example: ExampleStateInterface;
	// Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
	example: unknown;
}

import { MyStore } from './store';

Vue.use(Vuex);

// create our module class instance
const instance = new MyStore();

// create and export our store
export default createVuexStore(instance, {
	strict: !!process.env.DEBUGGING,
	modules: {},
	plugins: [],
});
