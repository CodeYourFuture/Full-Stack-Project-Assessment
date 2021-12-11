const express = require("express");
const app = express();
let cors = require("cors");
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(express.json());

app.listen(3000, function () {
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