/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	app, BrowserWindow, nativeTheme, Tray, Menu, nativeImage,
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

let mainWindow;
let tray;

function createWindow() {
	/**
   * Initial window options
   */
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

	mainWindow.loadURL(process.env.APP_URL);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}
function createTray() {
	const iconPath = path.join(__dirname, '../icons/icon.ico');
	const icon = nativeImage.createFromPath(iconPath);

	tray = new Tray(icon);
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Maximize', type: 'normal', click: () => mainWindow?.maximize() },
		{ label: 'Minimize', type: 'normal', click: () => mainWindow?.minimize() },
		{ label: 'Exit', type: 'normal', click: () => app.quit() },

	]);
	tray.setToolTip('Senior pomidor');
	tray.setContextMenu(contextMenu);
}

app.on('ready', createWindow);
app.on('ready', createTray);

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
