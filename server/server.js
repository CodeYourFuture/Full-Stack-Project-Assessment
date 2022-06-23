const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const { query } = require('express')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Listening on port ${port}`))

const pool = new Pool({
  database: 'mstpkekb',
  user: 'mstpkekb',
  password: 'p2pphG8NZQDtpxAnPtGUXRN_E8hhhO8_',
  host: 'kandula.db.elephantsql.com',
  port: 5432,
})

app.get('/', (req, res) => {
  pool
    .query('Select * From videos')
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => res.status(500).json(error))
})

app.post('/', (req, res) => {
  const { title, url } = req.body
  const queryString = `Insert Into videos (title, url) values ($1, $2)`
  pool
    .query(queryString, [title, url])
    .then((result) => res.status(200).send('Video added!'))
    .catch((error) => res.status(500).json(error))
})

app.put('/:videoId/rating', (req, res) => {
  const id = req.params.videoId
  const rate = req.body.rating
  const queryString = `Update videos Set rating = $1 Where id = $2`
  pool
    .query(queryString, [rate, id])
    .then((result) => res.status(201).send('Rating has been updated!'))
    .catch((error) => res.status(500).json(error))
})

app.delete('/:videoId', (req, res) => {
  const id = req.params.videoId
  const queryCheck = `Select * From videos where id = $1`
  const queryString = `Delete From videos where id = $1`
  pool
    .query(queryCheck, [id])
    .then((result) => {
      if (result.rows.length == 0) res.status(404).send('Video does not exist!')
      else {
        pool
          .query(queryString, [id])
          .then((result) => res.status(200).send('Video has been deleted!'))
          .catch((error) => res.status(500).json(error))
      }
    })
    .catch((error) => res.status(500).json(error))
})
