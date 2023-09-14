const { Pool } = require("pg");

const itemsPool = new Pool({
  user: "ramo",
  host: "dpg-cjmvldsdfrcc73cqdgj0-a",
  database: "full_stack_assessment_database",
  password: "QM8CiEFShmAod1u3wlJxKFzv0OPDmNaP",
  port: "5432",
});

module.exports = itemsPool;

// // Example query
// pool.query("SELECT * FROM your_table", (err, res) => {
//   if (err) {
//     console.error("Error executing query:", err);
//   } else {
//     console.log("Query result:", res.rows);
//   }
// });
