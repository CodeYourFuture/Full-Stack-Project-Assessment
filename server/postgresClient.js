const { Client } = require("pg");

function getPostgresClient() {
  // return new Client({
  //   host: "localhost",
  //   database: "videos",
  //   port: 5432,
  //   user: "postgres",
  //   password: process.env.PASSWORD,
  // });
  return new Client({
    connectionString:
      "postgres://video_recommendation_user:Wne3nYZC6CKKJONp6fuY5GJUhpMN1vKR@dpg-cfcj5h6n6mpierpiluig-a.frankfurt-postgres.render.com/video_recommendation",
    ssl: { rejectUnauthorized: false }
  });
}

module.exports = getPostgresClient;
