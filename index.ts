import Snoowrap from 'snoowrap'
import { config } from 'dotenv'

config()

const HOUR_IN_MILLISECONDS = 1 * 60 * 60 * 1000

const YOUTUBE_URL_REGEX = /(?:vi?|b?[^r]e|d|[0-9]+)(?:=|\/|%3)([^"&?/\s]{11})/i

const isYouTubeUrl = (url: string) => YOUTUBE_URL_REGEX.test(url)

const getVideoId = (url: string) => url.match(YOUTUBE_URL_REGEX)[1]

// Connect to reddit API
const r = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
})

const run = async () => {
  // Get top post of videos subreddit
  const [topPost] = await r.getTop('videos', { time: 'day' })
  const videoUrl = topPost.url
  if (!isYouTubeUrl(videoUrl)) return
  console.log(getVideoId(videoUrl))

  // Is it a YouTube video?
  //   Extract video id
  //   Is it different to the last id?
  //     add to playlist and set as video
}

run()
setInterval(run, 3000)
