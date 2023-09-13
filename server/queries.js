const { Pool } = require("pg");

function connect_db() {
  return new Pool({
    connectionString: "postgres://jz:NLNXAWPsYPzOn3kKzExavV08DugCC0rx@dpg-ck107k7dorps738bnga0-a.frankfurt-postgres.render.com/fullstack_3qby",
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

// this was copied from the exampleresponse.json
let videos = [
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23
  },
  {
    "id": 523427,
    "title": "The Coding Train",
    "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
    "rating": 230
  },
  {
    "id": 82653,
    "title": "Mac & Cheese | Basics with Babish",
    "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
    "rating": 2111
  },
  {
    "id": 858566,
    "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
    "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
    "rating": 11
  },
  {
    "id": 453538,
    "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
    "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
    "rating": 3211
  },
  {
    "id": 283634,
    "title": "Learn Unity - Beginner's Game Development Course",
    "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
    "rating": 211
  },
  {
    "id": 562824,
    "title": "Cracking Enigma in 2021 - Computerphile",
    "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
    "rating": 111
  },
  {
    "id": 442452,
    "title": "Coding Adventure: Chess AI",
    "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
    "rating": 671
  },
  {
    "id": 536363,
    "title": "Coding Adventure: Ant and Slime Simulations",
    "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
    "rating": 76
  },
  {
    "id": 323445,
    "title": "Why the Tour de France is so brutal",
    "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
    "rating": 73
  }
];

async function init_db(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(256) NOT NULL,
      url VARCHAR(256) NOT NULL,
      rating INT NOT NULL
    )`
  ).then((result) => {
    // console.log(result);
  }).catch((error) => {
    console.log("error in CREATE:", error);
  });

  const promises = [];
  for (let {id, title, url, rating} of videos) {
    const promise = db.query(`
      INSERT INTO videos (id, title, url, rating)
      SELECT $1, $2, $3, $4
      WHERE NOT EXISTS (
        SELECT id FROM videos WHERE id=$1
      )
    `, [
      id, title, url, rating
    ]).then((result) => {
      // console.log(result);
    }).catch((error) => {
      console.log(id, title, url, rating);
      console.log("error in INSERT:", error);
    });
    promises.push(promise);
  }
  await Promise.all(promises);
}

async function get_all_videos(db) {
  let videos;
  await db.query(`
    SELECT * FROM videos
  `).then((result) => {
    videos = result.rows;
    // console.log(result)
  }).catch((error) => {
    console.log(id, title, url, rating);
    console.log("error in INSERT:", error);
    throw error;
  });
  return videos;
}

module.exports = {
  connect_db: connect_db,
  init_db: init_db,
  get_all_videos: get_all_videos,
};