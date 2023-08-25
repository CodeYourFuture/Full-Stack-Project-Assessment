const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

async function seed() {
    await pool.query('DELETE FROM users WHERE email != $1', ['haroon@gmail.com']);
    await pool.query('TRUNCATE TABLE videos RESTART IDENTITY');

    await pool.query("INSERT INTO videos (u_id, video_id, title, views, upload_date, author) VALUES($1, $2, $3, $4, $5, $6)", [
        1,
        'NQ-2eJvakBo',
        'Mortal Kombat 1 | Official GamePlay and Roaster / What to expect',
        1358,
        '2023-08-23',
        'Bravo Gaming'
    ]);
}

module.exports.seed = seed;