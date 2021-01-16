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
		<q-input @input="handleInput" />
	</q-page>
</template>

<script lang="ts">
import Timer from 'components/Timer/Timer.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
	components: { Timer },
})
export default class PageIndex extends Vue {
	time = 100;

	/**
	 * in seconds
	 * */
	timeSetByUser = 0;

	timeSetByUserBackup = 0;

	timeout!: number;

	interval!: number;

	get distance() {
		return Math.round(this.timeSetByUser);
	}

	get notification() {
		const options = {
			title: 'Senior Pomidor',
			body: 'Время вышло',
		};
		return new this.$q.electron.remote.Notification(options);
	}

	handleInput(value: string) {
		this.timeSetByUser = Number(value);

		this.timeSetByUserBackup = Number(value);
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
		this.handleInput('');
	}

	notify() {
		this.notification.show();
		clearInterval(this.interval);
		clearTimeout(this.timeout);
		this.handleInput('');
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
