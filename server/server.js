const express = require('express')
const app = express()
const cors = require('cors')
const { Pool } = require('pg')
// LEVEL 300
// CREATE A VIDEOS DATABASE (fsa_videos)
// HOST IT
// CONNECT IT TO FILE
const pool = new Pool({
  user: 'michelle',
  host: 'localhost',
  database: 'fsa_videos',
  password: 'michelle',
  port: 5432,
})

pool.connect()

const exampleResponse = require('../client/src/exampleresponse.json')

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use(express.json())

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = exampleResponse

// GET "/"
app.get('/', (req, res) => {
  res.send(`Welcome to Michelle's Video App(: 
  ask for /videos to get started`)
  // res.send({ express: 'Your Backend Service is Running' })
})

app.get('/videos', (req, res) => {
  pool
    .query(`select * from videos`)
    .then((response) => res.json(response.rows))
    .catch((err) => console.log(err))
  // res.json(videos)
})

// app.get('/videos', (req, res) => {
//   let orderQuery = req.query.order
//   const desc = videosCopy.sort((a, b) => b.rating - a.rating)
//   const asc = videosCopy.sort((a, b) => a.rating - b.rating)
//   orderQuery === 'desc'
//     ? res.json(desc)
//     : orderQuery === 'asc'
//     ? res.json(asc)
//     : res.status(404).json({ msg: 'Not found' })
// })

app.get('/videos/:id', (req, res) => {
  const id = Number(req.params.id)
  pool
    .query('select * from videos where id = $1', [id])
    .then((response) => res.json(response.rows))
    .catch((error) => console.error(error))
})

app.post('/videos', (req, res) => {
  // res.send(req.body.id)
  // res,json({result: 'failure', message: 'Video could not be saved'})
  const id = videos.length
  const title = req.body.title
  const url = req.body.url

  pool
    .query(
      'insert into videos (video_title, video_url, video_rating) values ($1, $2, 0)',
      [title, url]
    )
    .then((response) => res.json(response.rows))
    .catch((err) => console.log(err))

  // !(title || url) &&
  //   res
  //     .status(400)
  //     .send({ result: 'failure', message: 'Video could not be saved' })

  // const newVideo = {
  //   id: id,
  //   title: title,
  //   url: url,
  //   rating: 0,
  // }

  // videos.push(newVideo)
  // res.json({ id: id })
})

app.delete('/videos/:id', (req, res) => {
  const id = Number(req.params.id)
  // const videoId = videos.find((video) => video.id === id)
  // const videoIndex = videos.findIndex((video) => video.id === id)

  // !videoId &&
  //   res.status(404).json({
  //     result: 'failure',
  //     message: 'Video could not be deleted',
  //   })

  // videos.splice(videoIndex, 1)
  // res.send(videos)

  pool
    .query('delete from videos where id = $1', [id])
    .then((response) => res.json({ msg: 'Video deleted' }))
    .catch((err) => console.log(err))
})

app.listen(3001, () => console.log(`Listening on port 3001`))
