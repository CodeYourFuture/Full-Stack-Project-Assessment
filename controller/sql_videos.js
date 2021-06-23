// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// import express from "express";
// import dotenv  from 'dotenv';
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// dotenv.config();
// const { Pool } = require('pg');

// const pool = new Pool({
//     // connect with  connection string
//     connectionString:process.env.CONNECTIONSTRING,
//     // user: process.env.USER,
//     // host: process.env.HOST,
//     // database: process.env.DATABASE,
//     // password: process.env.PASSWORD,
//     // port: 5432
// });


// //  get all videos
// export const getVideos = (req, res) => {
//     pool.query('SELECT * FROM videos', (error, result) => {
//         if(error) throw error
//         res.json(result.rows);

//     });
// }
// //  delete video by ID
// export const remove = (req, res) => {
//     pool.query(`DELETE FROM videos where ${req.params.id} = videos.id`, (err, result) => {
//         if(err) throw err;
//         res.status(200).json(result.rows);
//     })
// };

// export const order = (req, res) => {
//     let order = req.query.order;
//     if (order=== 'asc') {
//         const SQL = 'SELECT * FROM videos ORDER BY rating ASC'
//         pool.query(SQL,(err,result) => {
//             if(err) throw err;
//             res.json(result.rows)
//         })
//     }else if (order === 'desc') {
//         const SQL = 'SELECT * FROM videos ORDER BY rating DESC'
//         pool.query(SQL,(err,result) => {
//             if(err) throw err;
//             res.json(result.rows)
//         })
//     }
// }

// export const postVideos = (req,res) => {
//     const title = req.body.title
//     const url = req.body.url
//     const rating = req.body.rating
//     const id =req.body.id
//     console.log(title)
//     let SQL = "INSERT INTO videos (id, title, url, rating) VALUES ('" + id + "', '" + title + "', '" + url + "', '" + rating + "')";
//     pool.query(SQL, (err, result) => {
//         if(err) throw err;
//       res.status(200).json(result.rows);
//     })
// }



// export const search = (req, res) => {
//     let title = req.query.title.toLowerCase();
//     if (title) {
//         const SQL = "SELECT * FROM videos WHERE LOWER(title)" + " LIKE '%" + title + "%'"
//         if (SQL) {
//             pool.query(SQL,(err,result) => {
//                 if(err) throw err;
//                 res.json(result.rows)
//             })
//         } else {
//             res.status(400).json({ msg: `No videos with the title of ${title}` });
//         }
//     }
// }
