const { Pool } = require("pg");

const videosPool = new Pool({
  connectionString:
    "postgres://project_data_eqrf_user:MldQZenHLTFNPhwOUA6Nx6a9zrKRMfXc@dpg-ck1o4bnhdsdc739osv00-a.oregon-postgres.render.com/project_data_eqrf",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = videosPool;/q