import { contextBridge, ipcRenderer } from 'electron'
import { updater } from './updater'

// Custom APIs for renderer
const api = {
  getVideoInfo: (url): unknown => {
    return ipcRenderer.on('getVideoInfo', url)
  }
}
const titleBarOptions = {
  close: (): void => {
    return ipcRenderer.send('closeWindow')
  },
  maximize: (): void => {
    return ipcRenderer.send('maximizeWindow')
  },
  minimize: (): void => {
    return ipcRenderer.send('minimizeWindow')
  }
}

if (process.contextIsolated) {
  try {
    const validChannels = ['update-downloaded']
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('titleBarOptions', titleBarOptions)
    contextBridge.exposeInMainWorld('updater', updater)
    contextBridge.exposeInMainWorld('ipcRenderer', {
      send: (channel, data) => {
        // whitelist channels
        if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data)
        }
      },
      receive: (channel, func) => {
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (_, ...args) => func(...args))
        }
      },
      removeAllListeners: (channel) => {
        if (validChannels.includes(channel)) {
          ipcRenderer.removeAllListeners(channel)
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}
