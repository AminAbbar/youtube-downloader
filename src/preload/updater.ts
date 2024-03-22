import { ipcRenderer } from 'electron'

export const updater = {
  updateInstall: (): void => {
    return ipcRenderer.send('installTheUpdate')
  }
}

ipcRenderer.on('update-downloaded', () => {
  ipcRenderer.send('update-downloaded')
})
