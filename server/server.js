const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const videoData = require('./../exampleresponse.json');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: '*', // Or could have it as http://localhost:3000/ if that's the only thing I want to be able to interact with this api
}))

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));



// GET "/" - http://localhost:5000/ will return all of the video stored
app.get("/", (req, res) => {
    res.send(videoData);
});


// POST "/" - http://localhost:5000/ This will add a video to the data store
app.post("/", (req, res) => {
  // When using postman to get this body.title and body.url working, we have to send it in the body, as raw data. And then set it to 
  // .json and send something like this: 
  // {
  //     "title": "test title",
  //     "url": "test url"
  // }
  
  const title = req.body.title;
  const url = req.body.url;
  // console.log(req.body);
  console.log(title);
  console.log(url);

  if ((title.length > 0)&&(url.length > 0)){
    // console.log(req.body.title);
    // console.log(req.body.url);
    
    // Need to add the title and the URL to my json file - both need to be here 
    // The video ID seems to be a random number

    const newVideo = {
      "id":videoData.length,
      "title": req.body.title,
      "url":req.body.url
    }
    videoData.push(newVideo); 

    res.send(videoData);
    // return res.status(400).send({
    //   message: 'Error - The Name or Message fields are empty!' 
    // });
  } else {
    res.send(
    {
      "result": "failure",
      "message": "Video could not be saved"
    });
  }
});


// GET "/" - http://localhost:5000/{id} This will return the video with the id put as a parameter
app.get("/:id", (req, res) => {
  const inputID = req.params.id;
  console.log(inputID);

  let returnedData = videoData.forEach(element => {
    if (element.id == inputID){
      res.send(element);
      return element;
    }
  })

  console.log(returnedData);

  // if (returnedData != undefined){
  //   console.log("success>")
  // } else {
  //   console.log("fail")
  //   // res.send("No video found with ID " + inputID);
  // }
});


// DELETE "/" - http://localhost:5000/{id} This will return the video with the id put as a parameter
app.delete("/:id", (req, res) => {
  console.log("DELETE run")
  console.log(req.params.id) // 1 

  let indexToRemove;

  for (let index = 0; index < videoData.length; index++) {
    const element = videoData[index];
    if (element.id == req.params.id){
      console.log(element);
      indexToRemove = index;
    }
  }
  console.log(indexToRemove);
  
  if (indexToRemove > -1) {
    videoData.splice(indexToRemove, 1);
    console.log(videoData)
    res.json(videoData); 
  } else {
    res.json({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  }
});


// PUT "/" - http://localhost:5000/{id} This will update the rating
app.put("/:id", (req, res) => {
  console.log("PUT update run")
  console.log(req.params.id)
  console.log(req.body.updatedRatings)

  let indexToUpdate;

  for (let index = 0; index < videoData.length; index++) {
    const element = videoData[index];
    if (element.id == req.params.id){
      console.log(element);
      indexToUpdate = index;
    }
  }
  console.log(indexToUpdate);
  console.log("LOOK BELOW FOR DATA RATING")
  console.log(videoData[indexToUpdate].rating);

  if (indexToRemove > -1) {
    videoData[indexToUpdate].rating = req.body.updatedRatings;
    res.json({"message": "rating updated"}); 
  } else {
    res.json({
      "result": "failure",
      "message": "Video could not be found"
    })
  }
});


app.get("/videos/:search", function(request, response){
  console.log("/videos/:id run");
  // console.log(request.query.text)
  console.log(request.params.search);

  

    if (request.params.search != undefined) {
      const searchTerm = request.params.search.toLowerCase();

      let returnedList = videoData.filter((element,index) =>{
        const lowerElementTitle = element.title.toLowerCase();

        if (index < 10){
          return lowerElementTitle.includes(searchTerm)
        }
      });
      console.log(returnedList);
      response.json(returnedList);
    } else {
      response.send({
        "result": "failure",
        "message": "Video could not be found"
      })
    }
    


  // if (messages[request.params.search] != undefined){
  //   response.json(messages[request.params.search]); 
  
  // } else if (request.query.text != undefined) {
  //   const searchTerm = request.query.text.toLowerCase();

  //   const returnedList = messages.filter((element,index) =>{
  //     //  console.log(element);
  //     // console.log(element.text.includes(searchTerm));
  //     const lowerElement = element.text.toLowerCase();
  //     if (index < 10){
  //       return lowerElement.includes(searchTerm)
  //     }
  //   });
  //   console.log(returnedList);
  //   response.json(returnedList); 
  // }
});