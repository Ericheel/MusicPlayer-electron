const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const { AppWindow } = require('./class/AppWindow')
const DataStore = require('./class/MusicDataStore')

//electron提供的持久化工具
const store = new DataStore()

app.on('ready', () => {
    const mainWindow = new AppWindow({}, './renderer/index.html')

    ipcMain.on('add-music-window', (event, arg) => {
        const addMusicWindow = new AppWindow({
            width: 640,
            height: 480,
            parent: mainWindow,
            modal: true //模态框
        }, './renderer/addMusic.html')
    })

    ipcMain.on('add-tracks', (event, tracks) => {
        const updatedTracks = store.addTracks(tracks).getTracks()
        console.log(updatedTracks);
    })

    ipcMain.on('open-music-file', (event, arg) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Music', extensions: ['mp3'] }]
        }).then(files => { //electron dialog 新版使用 promise，callback失效
            if (files) {
                event.sender.send('selected-file', files.filePaths)
            }
        }).catch(err => {
            console.log(err);
        })
    })
})