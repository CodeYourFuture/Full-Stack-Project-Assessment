const { Pool } = require("pg");

const itemsPool = new Pool({
  user: "ramo",
  host: "dpg-cjmvldsdfrcc73cqdgj0-a",
  database: "full_stack_assessment_database",
  password: "QM8CiEFShmAod1u3wlJxKFzv0OPDmNaP",
  port: "5432",
});

module.exports = itemsPool;
