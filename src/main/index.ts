import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import log from 'electron-log/main'
import { initializeUpdater } from './updater'
export let mainWindow: null | BrowserWindow
function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    minHeight: 700,
    minWidth: 1000,
    show: false,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('getVideoInfo', () => {
    log.info('Get video info')
  })
  await initializeUpdater(createWindow(), app)

  ipcMain.on('minimizeWindow', (event) => {
    const window = BrowserWindow.fromId(event.frameId)
    window?.minimize()
  })
  ipcMain.on('closeWindow', (event) => {
    const window = BrowserWindow.fromId(event.frameId)
    window?.close()
  })
  ipcMain.on('maximizeWindow', (event) => {
    const window = BrowserWindow.fromId(event.frameId)
    window?.isMaximized() ? window?.unmaximize() : window?.maximize()
  })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
