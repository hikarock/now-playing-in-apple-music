const songNameSelector = '.web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper'
const artistNameWithAlbumTitleSelector = '.web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper'
const slackWebhookUrl = '{YOUR_SLACK_WEBHOOK_URL}'
const separator = '—'
let payload = { text: '' }
setInterval(() => {
  const songNameEl = document.querySelector(songNameSelector)
  const artistNameWithAlbumTitleEl = document.querySelector(artistNameWithAlbumTitleSelector)
  if (songNameEl === null) {
    return
  }
  if (artistNameWithAlbumTitleEl === null) {
    return
  }
  const songName = songNameEl.innerText.trim()
  const artistNameWithAlbumTitle = artistNameWithAlbumTitleEl.innerText
  const artistName = artistNameWithAlbumTitle.split(separator)[0].trim()
  const albumTitle = artistNameWithAlbumTitle.split(separator)[1].trim()
  const currentPayload = {
    text: `🍏🎵 "${songName}" 👨‍🎤 ${artistName} 💿 ${albumTitle}`
  }
  if (currentPayload.text === payload.text) {
    return
  }
  fetch(slackWebhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json charset=utf-8'
    },
    body: JSON.stringify(currentPayload)
  })
  payload = currentPayload
}, 10000)
