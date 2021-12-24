const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const uuid = require('uuid');
const { Pool } = require('pg');

const pool = new Pool({
	user: 'unczpcbmsqldur',
	host: 'ec2-34-250-92-138.eu-west-1.compute.amazonaws.com',
	database: 'd10i41fpm2m2b1',
	password: '20e08ccc8e63fad1e0b68fdf8c5bb0c7eda9682e379c805e9baf48ca2f776b0a',
	port: 5432,
	ssl: { rejectUnauthorized: false },
});

const cors = require('cors');
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

app.listen(port, () => console.log(`Listening on port ${port}`));

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
		rating: 2111,
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
];

// GET "/"
app.get('/', (req, res) => {
	let order = req.query.order;
	const sort = (way) => {
		if (way === 'asc') {
			videos.sort((a, b) => {
				let videoA = a.rating;
				let videoB = b.rating;

				if (videoA < videoB) return -1;
				if (videoA > videoB) return 1;
				return 0;
			});
		} else if (way === 'desc') {
			videos.sort((a, b) => {
				let videoA = a.rating;
				let videoB = b.rating;

				if (videoA > videoB) return -1;
				if (videoA < videoB) return 1;
				return 0;
			});
		}
	};
	if (order) {
		sort(order);
	}
	pool.query(`select * from videos`).then((result) => {
		res.json(result.rows);
	});
	// res.json(videos);
});

app.get('/:id', (req, res) => {
	const id = req.params.id;
	pool.query(`select * from videos where id = ${id}`).then((result) => {
		if (result.rows.length === 0) {
			res.status(404).send({
				message: 'Sorry we could not find video with such ID',
			});
			return;
		}
		res.status(200).json(result.rows);
	});
});

app.delete('/:id', (req, res) => {
	const id = +req.params.id;
	pool.query(`delete from videos where id = ${id}`).then((result) => {
		if (result.rowCount === 0) {
			res.status(400).send({
				result: 'failure',
				message: 'Video could not be deleted',
			});
			return;
		}
		pool.query(`select * from videos`).then((resultAfterDelete) => {
			res.status(200).json(resultAfterDelete.rows);
		});
	});
});

app.post('/', (req, res) => {
	const title = req.body.title;
	const url = req.body.url;

	if (title.length > 0 && url.length > 0) {
		pool
			.query(`insert into videos (title, url, rating) values ($1, $2, $3)`, [
				title,
				url,
				0,
			])
			.then(() => res.status(202).send('Added'))
			.catch((e) => console.error(e));
	} else {
		let error = {
			result: 'failure',
			message: 'Video could not be saved',
		};
		res.status(400).send(error);
	}
});
