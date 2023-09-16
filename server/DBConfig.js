const { Pool } = require("pg");
const videosPool = new Pool({
  connectionString: "postgres://full_stack_database_jp62_user:JfOA8mzl7maxtJEnTL28nmslJ5JSqVfe@dpg-ck2p2hvqj8ts73fm2m5g-a.oregon-postgres.render.com/full_stack_database_jp62",
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = videosPool;
