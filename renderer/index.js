const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
$('add-music-button').addEventListener('click', () => {
    ipcRenderer.send('add-music-window')
})

const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const tracksListHTML = tracks.reduce((html, track) => {
        html +=
            `<li class='row music-track list-group-item d-flex justify-content-between align-item-center'>
                <div class='col-10'>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-music-note-beamed mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                        <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                    </svg>
                    <b>${track.fileName}</b>
                </div>
                <div class='col-2'>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                    </svg>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
            </li>`
        return html
    }, '')
    const emptyTrackHTML = `<div calss='alert alert-primary'>还没有添加任何音乐</div>`
    tracksList.innerHTML = tracks.length ? `<ul class='list-group'>${tracksListHTML}</ul>` : emptyTrackHTML
}
ipcRenderer.on('getTracks', (event, tracks) => {
    //render music tracks to main window
    renderListHTML(tracks)
})