import { State, Mutation, Getter } from 'vuex-simple';

export class SettingsModule {
	@State()
	concentrateTime = 2700

	@State()
	shortBreakTime = 300

	@State()
	longBreakTime = 900

	@Getter()
	get concentrateTimeMinutes() {
		return this.concentrateTime / 60;
	}

	@Getter()
	get shortBreakTimeMinutes() {
		return this.shortBreakTime / 60;
	}

	@Getter()
	get longBreakTimeMinutes() {
		return this.longBreakTime / 60;
	}

	@Mutation()
	setConcentrateTime(time: number) {
		this.concentrateTime = time * 60;
	}

	@Mutation()
	setShortBreakTime(time: number) {
		this.shortBreakTime = time * 60;
	}

	@Mutation()
	setLongBreakTime(time: number) {
		this.longBreakTime = time * 60;
	}
}
