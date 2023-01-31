const express = require("express");
let cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));



const connection = mysql.createConnection
  ({
    host: 'localhost',
    database: 'sys',
    user: 'root',
    password: '',
    port: 3306
  });




const fail = {
  "result": "failure",
  "message": "Video could not be saved"
};


app.get("/videos", (req, res) =>
{
  let sorted = req.query.order;

  connection.query('SELECT * FROM videos', (err, rows) =>
  {
    res.send(Object.values(rows).sort((a, b) => sorted === "asc" ? a.rating - b.rating : b.rating - a.rating));
  })
});

app.post("/videos", (req, res) =>
{
  if (!req.body.title || !req.body.url)
  {
    res.status(400).send(fail);
  }


  else
  {
    connection.connect(function (err)
    {
      const sql = `INSERT INTO videos 
      (
          id, title, url, rating
      )
      VALUES
      (
          ?, ?, ?, ?
      )`;
      connection.query(sql, [req.body.id, req.body.title, req.body.url, req.body.rating], (err, rows) =>
      {
        result = Object.values(rows);
      });
    });
  }
});

app.get("/videos/:id", function (req, res)
{
  const sql = `SELECT * FROM videos WHERE id = ?`;
  connection.query(sql, [req.params.id], (err, rows) =>
  {
    res.send(Object.values(rows));
  });
});

app.delete("/videos/:id", function (req, res)
{
  const sql = `DELETE FROM videos WHERE id = ?`;
  connection.query(sql, [req.params.id], (err, rows) =>
  {
    connection.query(`SELECT * FROM videos`, (err, rows) =>
    {
      res.send(Object.values(rows).sort((a, b) => b.rating - a.rating));
    });
  });
});