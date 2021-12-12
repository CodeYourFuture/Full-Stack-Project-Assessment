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
          else res.status(404).json({ 'message': 'Unable to retrieve videos' }) }
  )
    .catch((e) => console.error(e));
});


app.get("/:id", (req, res) => {
    let videoId = Number(req.params.id);
    
    const query = "select * from videos where id=$1"
    //let result = data.find((video) => video.id === videoId);
 
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
      .catch((e) => console.error(e));
})




app.post("/", function (req, res) {
 // let id = Math.floor(Math.random() * 100000000) + 1;
  let title = req.body.title;
  let url = req.body.url;
  let rating = 0;

  const newvideo = {title, url};
    let count;
    let query;
  let isValid = isvalid(newvideo);
    //if (isValid) {
        // videos.push(newvideo);
        // query = 'select * from videos';
        // pool.query(query).then(result => count = result.rowCount);
        query = "Insert into videos(title,url,rating) values($1,$2,$3)";
        pool.query(query, [title, url, rating]).then(

            result => {
                query = "select * from videos where title = $1";
                pool.query(query, [title]).then(result =>
                    res.status(200).json({ 'id': result.rows })).catch(e => console.error(e))
            } ).catch();
 //   }
     

          
                // } else {
                //     res.status(400).json({
                //         data: videos,
                //         result: "failure",
                //         message: "Video could not be saved",
                //     });
                // }
            
    
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