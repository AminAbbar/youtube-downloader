import { autoUpdater } from 'electron-updater'
import log from 'electron-log/main'
import { ipcMain } from 'electron'
let downloaded = false
autoUpdater.logger = log
export async function initializeUpdater(mainWindow, app): Promise<void> {
  log.info('Checking for updates')
  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = false
  autoUpdater.checkForUpdates()

  autoUpdater.on('update-downloaded', () => {
    log.info(`Update downloaded. Current version ${app.getVersion()}`)
    mainWindow.webContents.send(`update-downloaded`)
    downloaded = true
  })

  autoUpdater.on('update-available', () => {
    log.info(`Update available. Current version ${app.getVersion()}`)
  })

  autoUpdater.on('update-not-available', () => {
    log.info(`No update available. Current version ${app.getVersion()}`)
  })

  autoUpdater.on('error', (info) => {
    log.info(info)
  })

  ipcMain.on('installTheUpdate', () => {
    if (!downloaded) return
    autoUpdater.quitAndInstall()
  })
}
