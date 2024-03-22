/// <reference types="vite/client" />

export declare global {
  interface Window {
    api: {
      getVideoInfo: unknown
    }
    titleBarOptions: {
      close(): void
      maximize(): void
      minimize(): void
    }
    ipcRenderer: {
      send(channel: string, data: unknown): void
      receive(channel: string, func: unknown): void
      removeAllListeners(channel: string): void
    }
  }
}
