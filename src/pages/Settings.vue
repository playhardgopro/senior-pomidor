<template>
	<q-page padding class="shrink column items-center">
		<h2>Settings</h2>
		<q-form class="column q-gutter-md">
			<h4 class="row justify-between items-center">
				<span class="q-ma-md">Pomodoro time </span>
				<q-knob
					:step="1"
					v-model="concentrateTime"
					show-value
					:min="1"
					:max="100"
					size="90px"
					:thickness="0.22"
					color="accent"
					track-color="secondary"
					class="text-secondary q-ma-md"
				/>
			</h4>
			<h4 class="row justify-between items-center">
				<span class="q-ma-md">Short break time </span>
				<q-knob
					:step="1"
					v-model="shortBreakTime"
					show-value
					:min="1"
					:max="100"
					size="90px"
					:thickness="0.22"
					color="warning"
					track-color="secondary"
					class="text-secondary q-ma-md"
				/>
			</h4>
			<h4 class="row justify-between items-center">
				<span class="q-ma-md">Long break time </span>
				<q-knob
					:step="1"
					v-model="longBreakTime"
					show-value
					:min="1"
					:max="100"
					size="90px"
					:thickness="0.22"
					color="positive"
					track-color="secondary"
					class="text-secondary q-ma-md"
				/>
			</h4>
		</q-form>
	</q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { MyStore } from '../store/store';

@Component
export default class PageIndex extends Vue {
	get typedStore() {
		return useStore<MyStore>(this.$store);
	}

	settings = this.typedStore.settings;

	get concentrateTime() {
		return this.settings.concentrateTimeMinutes;
	}

	set concentrateTime(value) {
		this.settings.setConcentrateTime(value);
	}

	get shortBreakTime() {
		return this.settings.shortBreakTimeMinutes;
	}

	set shortBreakTime(value) {
		this.settings.setShortBreakTime(value);
	}

	get longBreakTime() {
		return this.settings.longBreakTimeMinutes;
	}

	set longBreakTime(value) {
		this.settings.setLongBreakTime(value);
	}
}
</script>
