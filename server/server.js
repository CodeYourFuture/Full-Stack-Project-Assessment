const data = require("./exampleresponse.json") 
const cors =require("cors")


const express = require("express");
const app = express();
const port = process.env.PORT || 5009;

app.use(express.json());
app.use(cors())
 app.use(express.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

// get all information from example by writing this get
app.get("/videos",(req, res)=> {
  
  res.json(data)

  
})
app.post ("/video",(req, res)=> {
  const postData = req.body
  console.log(postData)
  res.send ("dataRecived")
})
