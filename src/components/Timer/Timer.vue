<template>
	<div>
		<div class="row justify-center">
			<q-circular-progress
				reverse
				:value="progress"
				size="200px"
				:thickness="0.22"
				color="accent"
				track-color="secondary"
				class="q-ma-md"
			/>
		</div>
		<h1 class="text-center">{{ timeToStop }}</h1>
		<q-btn-group outline>
			<q-btn
				color="positive"
				:disable="isTimerDisabled"
				@click="startTimer"
				>Start timer</q-btn
			>
			<q-btn
				color="warning"
				:disable="isTimerDisabled"
				@click="pauseTimer"
				>Pause timer</q-btn
			>
			<q-btn
				color="negative"
				:disable="isTimerDisabled"
				@click="stopTimer"
				>Stop timer</q-btn
			>
		</q-btn-group>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
	@Prop({ required: true }) readonly time!: number;

	@Prop({ required: true }) readonly timeToStop!: number;

	@Watch('timeToStop')
	expireTimer() {
		if (this.timeToStop === 0 && !this.isTimerDisabled) {
			this.$emit('timer:expire');
		}
	}

	get isTimerDisabled() {
		return this.timeToStop === 0 && this.time === 0;
	}

	get progress() {
		return (this.timeToStop / this.time) * 100;
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
