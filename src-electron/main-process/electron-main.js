/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	app, BrowserWindow, nativeTheme, Tray, Menu, nativeImage, MenuItem, ipcMain, globalShortcut,
} from 'electron';

import fs from 'fs';
import path from 'path';

try {
	if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
		fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'));
	}
} catch (_) {
	throw new Error(`Error: ${_}`);
}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
	global.__statics = __dirname;
}

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let tray;
let menu;

async function createWindow() {
	/**
   * Initial window options
   */
	if (!mainWindow) {
		mainWindow = new BrowserWindow({
			width: 1000,
			height: 600,
			useContentSize: true,
			frame: false,
			webPreferences: {
				// Change from /quasar.conf.js > electron > nodeIntegration;
				// More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
				nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
				nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

				// More info: /quasar-cli/developing-electron-apps/electron-preload-script
				// preload: path.resolve(__dirname, 'electron-preload.js')
			},
		});
		mainWindow.hide();
		await mainWindow.loadURL(process.env.APP_URL);
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

const menuItemQuit = new MenuItem({ label: 'Quit', role: 'quit', type: 'normal' });

const menuItemActivate = new MenuItem({
	label: 'Activate',
	type: 'normal',
	click: async () => {
		if (!mainWindow) {
			await createWindow();
		}
		mainWindow.show();
	},
});

function createTray() {
	const iconPath = path.join(__statics, 'tray-icon.png');
	const icon = nativeImage.createFromPath(iconPath);

	tray = new Tray(icon);
	menu = new Menu();

	menu.insert(0, menuItemActivate);
	menu.insert(1, menuItemQuit);

	tray.setToolTip('Senior pomidor');
	tray.setContextMenu(menu);
	ipcMain.on('tray-timer-update-event', (event, time) => {
		tray.setImage(icon);
		tray.setTitle(time);
	});
}

app.whenReady().then(() => {
	const gotTheLock = app.requestSingleInstanceLock();

	if (!gotTheLock) {
		app.exit(0);
	}

	if (!isDev) {
		globalShortcut.register('CommandOrControl+R', () => {
			console.log('CommandOrControl+R is pressed: Shortcut Disabled');
		});
	}
	createWindow();
	createTray();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
	if (tray === null) {
		createTray();
	}
});
