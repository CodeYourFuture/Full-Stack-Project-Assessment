const express = require("express");
const app = express();
let cors = require("cors");
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());

app.listen(3003, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
const { Pool } = require("pg");
const pool = new Pool({
  user: "asif",
  host: "localhost",
  database: "cyfvideodatabase",
  password: "786god",
  port: 5432,
});
//get all videos
app.get("/", function (req, res) {
  let order = req.query.order;
  let query;
    if (order === "asc")
        query = "SELECT * FROM videos order by rating asc";
  else query = "SELECT * FROM videos order by rating desc";

  pool
    .query(query)
      .then((result) => {
          if (result.rowCount > 0) res.json(result.rows)
         }
  )
    .catch((e) => (res.status(500).send('server error')));
});


app.get("/:id", (req, res) => {
    let videoId = Number(req.params.id);
    
    const query = "select * from videos where id=$1"
    
 
    pool
      .query(query, [videoId])
      .then((result) => {
        if (result.rowCount > 0) res.status(200).json(result.rows);
        else
          res.status(404).json({
            result: "failure",
            message: "Video could not be found",
          });
      })
      .catch((e) => res.status(500).send("server error"));
})




app.post("/", function (req, res) {
    
    let title = req.body.title;
    let url = req.body.url;
    let rating = 0;

    const newvideo = { title, url };
   
    let query;
    let isValid = isvalid(newvideo);
    if (isValid) {
       
        query = "Insert into videos(title,url,rating) values($1,$2,$3) Returning id";
        pool.query(query, [title, url, rating]).then(result => res.status(200).json({
            'id': result.rows[0].id
        })).catch(e => res.status(500).send('server error'))
 
    } else {
        
        res.status(400).send('video cannot be saved,check title and url');
    }
});
     


              


const isvalid = ({ title, url }) => {
  if (title.length > 0 && url.length > 0) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
      return true;
    }
  } else return false;
};


app.delete("/:id", (req, res) => {
    let videoId = Number(req.params.id);
    

    if (videoId) {
        
        const query = "delete from videos where id= $1";
        pool.query(query, [videoId]).then(() => res.status(204).json({}))
            .catch(e => res.status(500).send('server error'));
    }
    else {
        

        res.status(404).send('video cannot be deleted')
    }
  });
