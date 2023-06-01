const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8080
const pool = new Pool({
	connectionString: process.env.DB_URL,
	ssl: { rejectUnauthorized: false },
})

app.listen(port, () => console.log(`Listening on port ${port}`))

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [
	{
		id: 523523,
		title: 'Never Gonna Give You Up',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		rating: 23,
	},
	{
		id: 523427,
		title: 'The Coding Train',
		url: 'https://www.youtube.com/watch?v=HerCR8bw_GE',
		rating: 230,
	},
	{
		id: 82653,
		title: 'Mac & Cheese | Basics with Babish',
		url: 'https://www.youtube.com/watch?v=FUeyrEN14Rk',
		rating: 1112,
	},
	{
		id: 858566,
		title: 'Videos for Cats to Watch - 8 Hour Bird Bonanza',
		url: 'https://www.youtube.com/watch?v=xbs7FT7dXYc',
		rating: 11,
	},
	{
		id: 453538,
		title:
			'The Complete London 2012 Opening Ceremony | London 2012 Olympic Games',
		url: 'https://www.youtube.com/watch?v=4As0e4de-rI',
		rating: 3211,
	},
	{
		id: 283634,
		title: "Learn Unity - Beginner's Game Development Course",
		url: 'https://www.youtube.com/watch?v=gB1F9G0JXOo',
		rating: 211,
	},
	{
		id: 562824,
		title: 'Cracking Enigma in 2021 - Computerphile',
		url: 'https://www.youtube.com/watch?v=RzWB5jL5RX0',
		rating: 111,
	},
	{
		id: 442452,
		title: 'Coding Adventure: Chess AI',
		url: 'https://www.youtube.com/watch?v=U4ogK0MIzqk',
		rating: 671,
	},
	{
		id: 536363,
		title: 'Coding Adventure: Ant and Slime Simulations',
		url: 'https://www.youtube.com/watch?v=X-iSQQgOd1A',
		rating: 76,
	},
	{
		id: 323445,
		title: 'Why the Tour de France is so brutal',
		url: 'https://www.youtube.com/watch?v=ZacOS8NBK6U',
		rating: 73,
	},
]

// GET "/"
app.get('/', (req, res) => {
	// Delete this line after you'vea confirmed your server is running
	res.send({ express: 'Your Backend Service is Running' })
})

app.get('/videos', async (req, res) => {
	try {
		const query = 'SELECT * FROM videoss'
		const result = await pool.query(query)
		const orderedVideos = result.rows
		res.status(200).json(orderedVideos)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Error Message' })
	}
})

// const isValidYouTubeURL = (url) => {
// 	// Regular expression to match YouTube URL pattern
// 	const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
// 	return youtubeRegex.test(url)
// }

app.post('/videos', async (req, res) => {
	try {
		const { title, url } = req.body
		const rating = 0
		const query =
			'INSERT INTO videoss (title, url, rating) VALUES ($1,$2,$3) RETURNING *'
		const values = [title, url, rating]
		const result = await pool.query(query, values)
		const addVideos = result.rows[0]
		res.status(201).json(addVideos)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Error Message' })
	}
})

app.delete('/videos/:id', async (req, res) => {
	try {
		const videoID = Number(req.params.id)
		const query = 'DELETE FROM videoss WHERE id = $1 RETURNING *'
		const values = [videoID]
		const result = await pool.query(query, values)
		const deleteVideos = result.rows[0]

		if (deleteVideos) {
			res.status(200).json(deleteVideos)
		} else {
			res.status(404).json({ message: 'Video Not Found' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Error Message' })
	}
})

app.put('/videos/:id/rating', async (req, res) => {
	try {
		const videoID = Number(req.params.id)
		const { rating } = req.body
		const query = 'UPDATE videoss SET rating = $1 WHERE id = $2'
		const values = [rating, videoID]
		await pool.query(query, values)
		res.json('Rating Updated Successfully')
	} catch (error) {
		res.status(500).json({ error: 'Error Message' })
	}
})
