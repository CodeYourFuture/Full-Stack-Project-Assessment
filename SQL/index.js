import express from "express";


const app = express();

// const { Pool } = require("pg");




// const db = new Pool({
//     user: "tekre",
//     host: "localhost",
//     database: "fsp_videos",
//     password: "185606",
//     port: 5432,
// });






const port = 6000 || process.env.PORT;





app.listen(port, () => console.log(`Connected to backend ${port}`));

postgres://postgres:[185606]@db.vdbnhqozmlzdsaejdxwr.supabase.co:5432/postgres

