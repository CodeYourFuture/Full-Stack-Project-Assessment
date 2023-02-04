const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))
const port = process.env.PORT || 5000

const videos = require("./videos.json")
app.get('/videos', (request, response)=>{
response.json(videos)
})

app.listen(port,()=>console.log(`Server is listening on port ${port}`));
