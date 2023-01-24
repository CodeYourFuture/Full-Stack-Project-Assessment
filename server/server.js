const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post(3000, (req, res) => {
    fs.readFile('./exampleresponse.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading exampleresponse.json file');
        }
        let videos = JSON.parse(data);
        videos.push(req.body);
        fs.writeFile('./exampleresponse.json', JSON.stringify(videos), (err) => {
   if (err) {
      console.error(err);
      return res.status(500).send('Error writing to exampleresponse.json file');
   }
   res.json(videos);
});
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});