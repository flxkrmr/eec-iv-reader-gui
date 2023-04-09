const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainprocess', {
  download: (data) => ipcRenderer.send("download", data),
  version: () => ipcRenderer.invoke("version")
})
