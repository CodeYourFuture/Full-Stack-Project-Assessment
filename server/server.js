const express = require('express')
const app = express()
const cors = require('cors')
const { Pool } = require('pg')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use(
  cors({
    origin: 'http://localhost:3000',
    method: 'get',
  })
)

const pool = new Pool({
  user: process.env.PG_USER,
  connectionString: process.env.PG_CONNECTION,
  ssl: true,
})

pool.connect()

app.use(express.static(path.resolve(__dirname, '../client/build'))) //to connect server and client side

// GET "/"
app.get('/', (req, res) => {
  res.send(`Welcome to Michelle's Video App(: 
  ask for /videos to get started`)
})

app.get('/videos', (req, res) => {
  pool
    .query(`select * from videos order by video_rating desc`)
    .then((response) => res.json(response.rows))
    .catch((err) => {
      console.log(err)
      res.status(400).json({ id: 'Not found' })
    })
})

app.get('/videos/:id', (req, res) => {
  const id = Number(req.params.id)
  pool
    .query('select * from videos where id = $1', [id])
    .then((response) => res.json(response.rows))
    .catch((error) => console.error(error))
})

app.post('/videos', (req, res) => {
  const title = req.body.title
  const url = req.body.url
  pool
    .query(
      'insert into videos (video_title, video_url, video_rating) values ($1, $2, 0)',
      [title, url]
    )
    .then(() => res.json({ msg: 'Video added' }))
    .catch((err) => {
      console.log(err)
      res
        .status(400)
        .json({ result: 'failure', message: 'Video could not be saved' })
    })
})

app.put('/videos/upvote/:id', (req, res) => {
  const id = Number(req.params.id)
  pool
    .query(
      `update videos 
  set video_rating = video_rating + 1 
  where id = $1`,
      [id]
    )
    .then(() => res.json({ video_rating: '+1' }))
    .catch((err) => {
      console.log(err)
      res
        .status(400)
        .json({ result: 'failure', message: 'Video could not be liked' })
    })
  console.log(id)
})

app.put('/videos/downvote/:id', (req, res) => {
  const id = Number(req.params.id)
  pool
    .query(
      `update videos 
  set video_rating = video_rating - 1 
  where id = $1`,
      [id]
    )
    .then(() => res.json({ video_rating: '-1' }))
    .catch((err) => {
      console.log(err)
      res
        .status(400)
        .json({ result: 'failure', message: 'Video could not be liked' })
    })
  console.log(id)
})

app.delete('/videos/:id', (req, res) => {
  const id = Number(req.params.id)

  pool
    .query('delete from videos where id = $1', [id])
    .then(() => res.json({ msg: 'Video deleted' }))
    .catch((err) => {
      console.log(err)
      res.status(404).json({ id: 'Not found' })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
