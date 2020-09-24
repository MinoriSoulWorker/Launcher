import { BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

export const useAutoUpdate = (win: BrowserWindow) => {
  const sendStatusToWindow = (status: string, ...args: any[]) => {
    win.webContents.send(status, ...args);
  };

  // Turn off Automatic Updates
  autoUpdater.autoDownload = false;

  // APP quit when the automatic installation
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    // version can be updated
    sendStatusToWindow('autoUpdater-canUpdate', info);
  });

  // autoUpdater.on('update-not-available', (info) => {
  // // can not be updated
  // })
  autoUpdater.on('error', (err) => {
    // Update Error
    sendStatusToWindow('autoUpdater-error', err);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    // download progress being downloaded
    sendStatusToWindow('autoUpdater-progress', progressObj);
  });

  autoUpdater.on('update-downloaded', (info) => {
    // Download completed
    sendStatusToWindow('autoUpdater-downloaded');
  });
};
