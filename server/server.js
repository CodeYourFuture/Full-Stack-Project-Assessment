const express = require("express");
const app = express();
app.use(express.json()); 
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

const { Pool } = require('pg');

const pool = new Pool({
    user: 'nishka_kisten',
    host: 'dpg-cf5g8a1gp3jqkqlpgrm0-a.oregon-postgres.render.com',
    database: 'cyf_assessment',
    password: 'z78MncETM7niotplQvTT7vJM1bjJOVUD',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// GET "/"
app.get("/", (req, res) => {
  // res.send(videos).json;
  pool.query('SELECT * FROM video')
  .then((result) => res.send(result.rows).json)
  .catch((error) => {
      console.error(error);
      res.status(500).json(error);
  });
});

// POST "/"
app.post('/', (req, res) => {
  let title = req.body.title;
  let url = req.body.url;
  let rating = req.body.rating
pool
.query("INSERT INTO video (title, url, rating) VALUES ($1, $2, $3);", [title, url, rating])
.then((result) => {
  if (result.rows.length > 0) {
    return res
      .status(400)
      .send("Video exists!");
  } else {
    const query =
    "INSERT INTO video (title, url, rating) VALUES ($1, $2, $3)";
    pool
      .query(query,  [title, url, rating])
      .then(() => res.send("Video created!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});
});

//`GET` "/{id}"
app.get("/:id", (req, res) =>{
let videoId = req.params.id;
pool.query('SELECT * FROM video WHERE id=$1', [videoId])
.then((result) =>  
res.json(result.rows))
.catch((error) => {
    console.error(error);
    res.status(500).json(error);
  });
});


// `DELETE` "/{id}"
app.delete('/:id', (req, res)=> {
let vidId = req.params.id;
// let toDel = videos.find(opt => opt.id === id);
// let notDel = videos.filter(opt => opt.id !== id);
pool
.query("DELETE FROM video WHERE id=$1", [vidId])
.then(() => res.send(`Video ${vidId} deleted!`))
.catch((error) => {
  console.error(error);
  res.status(500).json(error);
});
// if(toDel === undefined){
//   res.send(400).send({
//     "result": "failure",
//     "message": "Video could not be deleted"
//   })
// }else {
//   res.send({}).status(200);
// }
// videos = notDel;
})

app.listen(port, () => console.log(`Listening on port ${port}`));



