<template>
	<q-layout view="lHh Lpr lFf">
		<q-header @dblclick="minimize">
			<q-toolbar>
				<q-toolbar-title>
					{{ title }}
				</q-toolbar-title>
				<template v-if="isElectron">
					<q-btn dense flat icon="minimize" @click="minimize"></q-btn>
					<q-btn
						dense
						flat
						icon="crop_square"
						@click="maximize"
					></q-btn>
					<q-btn dense flat icon="close" @click="close"></q-btn>
				</template>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<q-tabs
				v-model="tab"
				dense
				align="right"
				class="bg-primary text-white shadow-2"
				:breakpoint="0"
			>
				<q-tab name="main" icon="home" @click="$router.push('/')" />
				<q-tab
					name="settings"
					icon="settings"
					@click="$router.push('/settings')"
				/>
			</q-tabs>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Tab } from '../typings/index';

@Component
export default class MainLayout extends Vue {
	tab: Tab = this.$route.name as Tab;

	title = 'Senior Pomidor';

	// eslint-disable-next-line class-methods-use-this
	get isElectron() {
		return process.env.MODE === 'electron';
	}

	minimize() {
		if (this.isElectron) {
			this.$q.electron.remote.BrowserWindow.getFocusedWindow()?.minimize();
		}
	}

	maximize() {
		if (this.isElectron) {
			const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

			if (win) {
				if (win.isMaximized()) {
					win.unmaximize();
				} else {
					win.maximize();
				}
			}
		}
	}

	close() {
		if (this.isElectron) {
			this.$q.electron.remote.BrowserWindow.getFocusedWindow()?.close();
		}
	}
}
</script>
