const { Pool } = require("pg");
const videosPool = new Pool({
  connectionString: "postgres://full_stack_database_aeds_user:k6g9lDKrb8oJ6sAzwQHd0kAtSynN38cn@dpg-cmptg1icn0vc73cq1ugg-a.oregon-postgres.render.com/full_stack_database_aeds",
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = videosPool;
