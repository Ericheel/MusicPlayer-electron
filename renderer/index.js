const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
let musicAudio = new Audio()
let allTracks
let currentTrack

$('add-music-button').addEventListener('click', () => {
    ipcRenderer.send('add-music-window')
})

const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const tracksListHTML = tracks.reduce((html, track) => {
        html +=
            `<li class='row music-track list-group-item d-flex justify-content-between align-item-center'>
                <div class='col-10'>
                    <i class="fas fa-music mr-2"></i>
                    <b>${track.fileName}</b>
                </div>
                <div class='col-2'>
                    <i data-id=${track.id} class="fas fa-play mr-2"></i>
                    <i data-id=${track.id} class="fas fa-trash mr-2"></i>
                </div>
            </li>`
        return html
    }, '')
    const emptyTrackHTML = `<div calss='alert alert-primary'>还没有添加任何音乐</div>`
    tracksList.innerHTML = tracks.length ? `<ul class='list-group'>${tracksListHTML}</ul>` : emptyTrackHTML
}
ipcRenderer.on('getTracks', (event, tracks) => {
    //render music tracks to main window
    allTracks = tracks
    renderListHTML(tracks)
})

$('tracksList').addEventListener('click', (event) => {
    event.preventDefault()
    const { dataset, classList } = event.target
    const id = dataset && dataset.id

    if (id && classList.contains('fa-play')) {

        if (currentTrack && currentTrack.id === id) {
            musicAudio.play()
        } else {
            currentTrack = allTracks.find(track => track.id === id)
            musicAudio.src = currentTrack.path
            musicAudio.play()
            const resetIconEle = document.querySelector('.fa-pause')
            if (resetIconEle) {
                resetIconEle.classList.replace('fa-pause', 'fa-play')
            }
        }

        classList.replace('fa-play', 'fa-pause')
    } else if (id && classList.contains('fa-pause')) {
        musicAudio.pause()
        classList.replace('fa-pause', 'fa-play')
    } else if (id && classList.contains('fa-trash')) {
        ipcRenderer.send('delete-track', id)
    }
})