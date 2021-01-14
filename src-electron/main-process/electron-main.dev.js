/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

import electronDebug from 'electron-debug';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { app, BrowserWindow } from 'electron';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startApp = async () => {
	await app.whenReady();
	// allow for a small delay for mainWindow to be created
	await sleep(250);
	// Install `electron-debug` with `devtron`
	electronDebug({ showDevTools: false });

	// Install vuejs devtools
	try {
		const name = await installExtension(VUEJS_DEVTOOLS);
		console.log(`Added Extension: ${name}`);
		// get main window
		const win = BrowserWindow.getFocusedWindow();
		if (win) {
			win.webContents.on('did-frame-finish-load', () => {
				win.webContents.once('devtools-opened', () => {
					win.webContents.focus();
				});
				// open electron debug
				console.log('Opening dev tools');
				win.webContents.openDevTools();
			});
		}
	} catch (err) {
		console.error('An error occurred: ', err);
	}
};

startApp().catch((e) => console.error('Error to start app:', e));

import './electron-main';
