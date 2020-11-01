const { app, ipcMain, dialog } = require('electron')
const { AppWindow } = require('./class/AppWindow')


app.on('ready', () => {
    const mainWindow = new AppWindow({}, './renderer/index.html')

    ipcMain.on('add-music-window', (event, arg) => {
        const addMusicWindow = new AppWindow({
            width: 480,
            height: 320,
            parent: mainWindow
        }, './renderer/addMusic.html')
    })

    ipcMain.on('open-music-file', (event, arg) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Music', extensions: ['mp3'] }]
        }).then(files => {
            console.log(files)
        }).catch(err => {
            console.log(err);
        })
    })
})