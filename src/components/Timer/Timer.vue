<template>
	<div>
		<div class="row justify-center">
			<q-circular-progress
				reverse
				:value="(timeToStop / time) * 100"
				size="200px"
				:thickness="0.22"
				color="light-blue"
				track-color="grey-3"
				class="q-ma-md"
			/>
		</div>
		<h1 class="text-center">{{ timeToStop }}</h1>
		<q-btn color="green" @click="startTimer">Start timer</q-btn>
		<q-btn color="green" @click="pauseTimer">Pause timer</q-btn>
		<q-btn color="green" @click="stopTimer">Stop timer</q-btn>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
	@Prop({ required: true }) readonly time!: number;

	@Prop({ required: true }) readonly timeToStop!: number;

	@Watch('showNotification')
	notify() {
		if (this.showNotification === true) {
			this.notification.show();
			this.stopTimer();
		}
	}

	get notification() {
		const options = {
			title: 'Время вышло',
			body: `Таймер: ${this.timeToStop}`,
		};
		return new this.$q.electron.remote.Notification(options);
	}

	get showNotification() {
		return this.timeToStop === 0;
	}

	startTimer() {
		this.$emit('timer:start');
	}

	pauseTimer() {
		this.$emit('timer:pause');
	}

	stopTimer() {
		this.$emit('timer:stop');
	}
}
</script>
