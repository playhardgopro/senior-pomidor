import { State, Mutation } from 'vuex-simple';

export class SettingsModule {
	@State()
	concentrateTime = 45

	@State()
	shortBreakTime = 5

	@State()
	longBreakTime = 15

	@Mutation()
	setConcentrateTime(time: number) {
		this.concentrateTime = time;
	}

	@Mutation()
	setShortBreakTime(time: number) {
		this.shortBreakTime = time;
	}

	@Mutation()
	setLongBreakTime(time: number) {
		this.longBreakTime = time;
	}
}
