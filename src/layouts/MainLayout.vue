<template>
	<q-layout view="lHh Lpr lFf">
		<q-header>
			<q-toolbar>
				<q-toolbar-title>
					Senior Pomidor
				</q-toolbar-title>

				<q-btn dense flat icon="minimize" @click="minimize"></q-btn>
				<q-btn dense flat icon="crop_square" @click="maximize"></q-btn>
				<q-btn dense flat icon="close" @click="close"></q-btn>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MainLayout extends Vue {
	minimize() {
		if (process.env.MODE === 'electron') {
			// eslint-disable-next-line no-unused-expressions
			this.$q.electron.remote.BrowserWindow.getFocusedWindow()?.minimize();
		}
	}

	maximize() {
		if (process.env.MODE === 'electron') {
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
		if (process.env.MODE === 'electron') {
			// eslint-disable-next-line no-unused-expressions
			this.$q.electron.remote.BrowserWindow.getFocusedWindow()?.close();
		}
	}
}
</script>
