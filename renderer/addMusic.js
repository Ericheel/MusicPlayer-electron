const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
$('select-music').addEventListener('click', () => {
    ipcRenderer.send('open-music-file')
})

let musicFilesPath = []
ipcRenderer.on('selected-file', (event, path) => {
    if (Array.isArray(path)) {
        musicFilesPath = path
        console.log(musicFilesPath);
    }
})