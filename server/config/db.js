const {Pool} = require("pg");
const fs = require("fs");


const URL = "postgres://hlhsmhxi:rDPeP6iKy52dfIhiwx8QxZQtvD-V8DLe@tai.db.elephantsql.com/hlhsmhxi"
const pool = new Pool({
    connectionString: URL,
})

// const jsonData = JSON.parse(fs.readFileSync("../../exampleresponse.json", "utf8"));

// // Define a function to insert the JSON data into the database
// async function insertData() {
//   try {
//     for (const item of jsonData) {
//       const query = {
//         text: "INSERT INTO YTvideos (id, title, url, ratings) VALUES ($1, $2, $3, $4)",
//         values: [item.id, item.title, item.url, item.rating],
//       };
//       await pool.query(query);
//     }
//     console.log("Data imported successfully");
//   } catch (error) {
//     console.error("Error importing data", error);
//   } finally {
//     // Close the database connection
//     pool.end();
//   }
// }

// // Call the insertData function to start the import
// insertData();

pool.query('SELECT ALL', (error, res) => {
    if (error) {
        console.error("There's an error sug-rrr", error)
    }
   else {
    console.log("Nice sug-rrr ;)", res.rows[0].now)
   }
}
)

module.exports = {
    query: (text, params) => pool.query(text, params),
  };
