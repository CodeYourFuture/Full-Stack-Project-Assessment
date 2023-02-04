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
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     method: 'get',
//   })
// )
require('dotenv').config()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

const pool = new Pool({
  user: process.env.PG_USER,
  connectionString: process.env.PG_CONNECTION,
  ssl: true,
})

pool.connect()

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
} else {
  app.use(express.static(path.resolve(__dirname, '../client/build'))) //to connect server and client side
}

// GET "/"
app.get('/', (req, res) => {
  res.send(`Welcome to Michelle's Video App(: 
  ask for /videos to get started`)
  // res.send({ express: 'Your Backend Service is Running' })
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

app.get('/videos', (req, res) => {
  // let orderQuery = req.query.order
  // const desc = videosCopy.sort((a, b) => b.rating - a.rating)
  // const asc = videosCopy.sort((a, b) => a.rating - b.rating)
  // orderQuery === 'desc'
  //   ? res.json(desc)
  //   : orderQuery === 'asc'
  //   ? res.json(asc)
  //   : res.status(404).json({ msg: 'Not found' })
  // pool
  //   .query(`select * from videos order by video_rating`)
  //   .then((result) => res.json(result.rows))
  //   .catch((err) => {
  //     console.log(err)
  //   })
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
