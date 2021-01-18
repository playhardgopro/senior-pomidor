import { Module, State } from 'vuex-simple';
import { SettingsModule } from './settings';

export class MyStore {
	@Module()
	public settings = new SettingsModule();

	@State()
	public version = '0.0.1';
}
