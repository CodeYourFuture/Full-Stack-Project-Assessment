const express = require("express");
const cors = require ("cors");
const app = express();

//const {Pool} = require("pg");

const port = process.env.PORT || 5000;


// const pool = new Pool({
//   user: 'ptgs',
//   host: 'dpg-cg0qgb7dvk4ovd26hei0-a.oregon-postgres.render.com',
//   database: 'cyfdbcourse',
//   password: '2CY6mAb7GKWpWb1Rq49MIweALl1Zsb5m',
//   port: 5432
//   , ssl: {
//     rejectUnauthorized: false
//   }
// });

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let values = require ("./exampleresponse.json");

//let video = [values];

// GET "/"
app.get("/api", (req, res) =>{
  console.log('This is my Home');
  res.send('Welcome to my home.matt');
});

//Display all the data
app.get("/api/values", (req, res) =>{
  res.status(200).json(values);
});

//Post to the array
app.post("/api/values", (req, res) =>{
const newData = req.body;
values.push(newData);
res.status(200).json({success: true, data:values})
});


//Get with(id)
app.get("/api/values/:id", (req, res) =>{
const valId = parseInt(req.params.id);
const oneElement = values.find(item => item.id === valId);
if(!oneElement){
  return res.send('No element with this Id')
}
res.json({success: true, data: oneElement });
});

//Delete
app.delete("/api/values/:id", (req, res) =>{
  const valueId = Number(req.params.id);
  const deleted = values.filter(item => item.id !== valueId);
 
  if(deleted){
    return res.status(200).json({success: true, message: "item deleted"})
  }
  res.status(404).json({success: false, message: "no such an id to delete"})
});







app.listen(port, () => console.log(`Listening on port ${port}`));




