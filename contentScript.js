const songNameSelector = '.web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper'
const artistNameWithAlbumTitleSelector = '.web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper'
const artworkImageSelector = '.media-artwork-v2__image'
const slackWebhookUrl = '{YOUR_SLACK_WEBHOOK_URL}'
const separator = '—'
let payload = {
  attachments: [
    {}
  ]
}
setInterval(() => {
  const songNameEl = document.querySelector(songNameSelector)
  const artistNameWithAlbumTitleEl = document.querySelector(artistNameWithAlbumTitleSelector)
  const artworkImageEl = document.querySelector(artworkImageSelector)
  if (songNameEl === null) {
    return
  }
  if (artistNameWithAlbumTitleEl === null) {
    return
  }
  if (artworkImageEl === null) {
    return
  }
  const songName = songNameEl.innerText.trim()
  const artistNameWithAlbumTitle = artistNameWithAlbumTitleEl.innerText
  const artistName = artistNameWithAlbumTitle.split(separator)[0].trim()
  const albumTitle = artistNameWithAlbumTitle.split(separator)[1].trim()
  const artworkImageUrl = artworkImageEl.getAttribute('srcset').split(' ') [2]

  console.log(`${artworkImageUrl}`)

  const currentPayload = {
    attachments: [
      {
        color: '#00FFC9',
        title: `🎵 "${songName}"`,
        author_name: `👨‍🎤 ${artistName}`,
        text: `💿 ${albumTitle}`,
        thumb_url: `${artworkImageUrl}`
      }
    ]
  }
  if (currentPayload.attachments[0].text === payload.attachments[0].text) {
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
