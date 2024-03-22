/// <reference types="vite/client" />

export declare global {
  interface Window {
    api: {
      getVideoInfo: unknown
    }
    ipcRenderer: {
      send(channel: string, data: unknown): void
      receive(channel: string, func: unknown): void
      removeAllListeners(channel: string): void
    }
  }
}
