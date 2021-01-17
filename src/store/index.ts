import Vuex from 'vuex';

import Vue from 'vue';

import { createVuexStore } from 'vuex-simple';

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
