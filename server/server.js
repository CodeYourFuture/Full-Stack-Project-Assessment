const express = require("express");
const app = express();
const videoRoutes = require('./routes/videos.js');
const cors = require("cors");
app.use(cors());
app.use(express.json());
//routes
app.use('/api/videos', videoRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
