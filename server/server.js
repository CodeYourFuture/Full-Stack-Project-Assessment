const { Pool } = require('pg');

const data = require("./exampleresponse.json") 
const cors =require("cors")


const express = require("express");
const app = express();
const port = process.env.PORT || 5009;

app.use(express.json());
app.use(cors())
 app.use(express.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: 'student',
  host: 'localhost',
  database: 'postgres',
  password:'postgres',
  port: 5432, // default PostgreSQL port
});

// Use the pool to query the database
app.get("/videos",(req, res)=> {
  pool.query('SELECT * from videos', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      console.log('Conected to PostgreSQL database');
      console.log('Current date:', result.rows);
      res.json(result.rows)
    }
    // pool.end(); // Clo
  })
  


})


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// get all information from example by writing this get

app.post ("/video",(req, res)=> {
  const postData = req.body
  console.log(req.body)
  const {title, url} = req.body

const q = "insert into videos (title, url) values ($1, $2) "
const info= [title, url]
pool.query (q,info, (err, res)=> {

  if (err) {
    console.log(err)
  }else{
    console.log("data inserted")
    console.log(res.rows)

  }
})



// videos.push({
//   "id": 442452,
//     "title": postData.title,
//     "url": postData.url,
//     "rating": postData.rating
// })
  res.send ("dataRecived")
  
})
