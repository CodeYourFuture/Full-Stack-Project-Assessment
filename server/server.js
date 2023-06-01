const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// GET "/"
app.get('/', (req, res) => {
// Read example response from file
//   const response = JSON.parse(fs.readFileSync('./exampleresponse.json', 'utf8'));
//   res.json(response);
// });
    // Resolve the correct file path
  const filePath = path.join(__dirname, 'exampleresponse.json');
  // Read example response from file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ result: 'failure', message: 'Error reading file' });
    } else {
      const response = JSON.parse(data);
      res.json(response);
    }
  });
});












app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
// app.get("/", (req, res) => {
 
//   res.send({ express: "Your Backend Service is Running" });
// });
