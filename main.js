const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const { AppWindow } = require('./class/AppWindow')


app.on('ready', () => {
    const mainWindow = new AppWindow({}, './renderer/index.html')

    ipcMain.on('add-music-window', (event, arg) => {
        const addMusicWindow = new AppWindow({
            width: 640,
            height: 480,
            parent: mainWindow
        }, './renderer/addMusic.html')
    })

    ipcMain.on('open-music-file', (event, arg) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Music', extensions: ['mp3'] }]
        }).then(files => {
            if (files) {
                event.sender.send('selected-file', files.filePaths)
            }
        }).catch(err => {
            console.log(err);
        })
    })
})