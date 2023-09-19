const pgp = require("pg-promise")();

const db = pgp({
  connectionString:
    "postgres://bediomuri:oBhV3xpvp72RbVq0zx1XO7pGK12aVwZ4@dpg-ck44gg41g3fs73a5cpvg-a.frankfurt-postgres.render.com/full_stack_project_r08c",
  ssl: {
    rejectUnauthorized: false,
  },
});

db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY  ,
      title  VARCHAR(256) ,
      url VARCHAR(256) ,
      rating INT 
    )
  `);

module.exports = db;
