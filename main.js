const { app, BrowserWindow, ipcMain } = require('electron')
const AppWindow = require('./class/AppWindow')


app.on('ready', () => {
    const mainWindow = new AppWindow({}, './renderer/index.html')

    ipcMain.on('add-music-window', (event, arg) => {
        const addMusicWindow = new AppWindow({
            width: 480,
            height: 320,
            parent: mainWindow
        }, './renderer/addMusic.html')
    })
})