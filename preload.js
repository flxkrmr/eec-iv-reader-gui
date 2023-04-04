const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainprocess', {
  download: (data) => ipcRenderer.send("download", data)
  //ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})
