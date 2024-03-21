import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  getVideoInfo: (url): unknown => {
    return ipcRenderer.on('getVideoInfo', url)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}
