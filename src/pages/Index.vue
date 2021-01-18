<template>
	<q-page padding class="column items-center justify-evenly">
		<Timer
			:time="timeSetByUserBackup"
			:time-to-stop="distance"
			@timer:start="handleTimerStart"
			@timer:pause="handleTimerPause"
			@timer:stop="handleTimerStop"
			@timer:expire="notify"
		></Timer>
	</q-page>
</template>

<script lang="ts">
import Timer from 'components/Timer/Timer.vue';
import { MyStore } from 'src/store/store';
import { Vue, Component } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';

@Component({
	components: { Timer },
})
export default class PageIndex extends Vue {
	get typedStore() {
		return useStore<MyStore>(this.$store);
	}

	settings = this.typedStore.settings;

	time = 100;

	/**
	 * in seconds
	 * */
	timeSetByUser = this.settings.concentrateTime;

	/**
	 * in seconds
	 * */
	// timeSetByUserBackup = this.settings.concentrateTime;

	timeout!: number;

	interval!: number;

	get distance() {
		return Math.round(this.timeSetByUser);
	}

	/**
	 * in seconds
	 * */
	get timeSetByUserBackup() {
		return this.settings.concentrateTime;
	}

	get notification() {
		const options = {
			title: 'Senior Pomidor',
			body: 'Время вышло',
		};
		return new this.$q.electron.remote.Notification(options);
	}

	handleTimerStart() {
		if (this.timeSetByUser > 0 && this.timeSetByUserBackup > 0) {
			this.run(0, 1000);
		}
	}

	handleTimerPause() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
	}

	handleTimerStop() {
		clearInterval(this.interval);
		clearTimeout(this.timeout);
		this.timeSetByUser = this.settings.concentrateTime;
		// this.timeSetByUserBackup = this.settings.concentrateTime;
	}

	notify() {
		this.notification.show();
		clearInterval(this.interval);
		clearTimeout(this.timeout);
		this.timeSetByUser = this.settings.concentrateTime;
		// this.timeSetByUserBackup = this.settings.concentrateTime;
	}

	run(toStart: number, step: number) {
		this.tick();
		if (toStart) {
			this.timeout = window.setTimeout(() => this.run(0, step), toStart);
		} else {
			this.interval = window.setInterval(this.tick, step);
		}
	}

	tick() {
		this.timeSetByUser -= 1;
	}
}
</script>
