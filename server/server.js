import express from "express";
import cors from "cors";
import videos from "./routes/videos.js"

const app = express();
app.use(express.json( {limit: "30mb", extended: true }))
app.use(express.urlencoded( {limit: "30mb", extended: true }))
app.use(cors());


const PORT =  process.env.PORT || 5000;

app.use("/", videos)


// if(process.env.NODE_ENV === "production"){
//     // set static folder
//     app.use("/", express.static("client/build"));
// }


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));