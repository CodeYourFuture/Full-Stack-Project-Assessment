const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
    user: "osuceosjjbpuuq",
    host: "ec2-54-155-87-214.eu-west-1.compute.amazonaws.com",
    database: "db4tgrcf7b55ru",
    password: "c0dfb6cf8c0a14ac13c41c0ddb6b8f3c202a66e3b0083edbde40f00ac6d5f4c7",
    port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

//GET "/?order=asc OR desc"
app.get("/", (req, res) => {
    pool
        .query("SELECT * FROM videos")
        .then((result) => {
            if (req.query.order) {
                let videos = result.rows
                let order = req.query.order.toLowerCase()

                order === 'asc' ? res.json(videos.sort((videoA, videoB) => videoA.rating - videoB.rating)) :
                    order === "desc" ? res.json(videos.sort((videoA, videoB) => videoB.rating - videoA.rating)) :
                        res.status(400).json({
                            "result": "failure",
                            "message": "Please enter 'asc' or 'desc' in your search"
                        });
            } else {
                let defaultOrder = result.rows.sort((videoA, videoB) => videoB.rating - videoA.rating);
                res.json(defaultOrder);
            }
        })
        .catch((e) => console.error(e));
});

// POST "/"
app.post("/", (req, res) => {
    const title = req.body.title;
    const url = req.body.url;
    const rating = 0;

    if (req.body.title && req.body.url) {
        const query =
            "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
        pool
            .query(query, [title, url, rating])
            .then(() => res.json({
                "result": "success",
                "message": "Video is saved "
            }))
            .catch((error) => console.error(error));
    } else {
        res.status(400).json({
            "result": "failure",
            "message": "Video could not be saved"
        })
    }
});

//GET "/:id"
app.get("/:id", (req, res) => {
    const videoId = +req.params.id;

    pool
        .query("SELECT * FROM videos WHERE id=$1", [videoId])
        .then((result) => {
            if (result.rowCount) {
                res.send(result.rows)
            } else {
                res.status(404).json({
                    "result": "failure",
                    "message": `No Video with ID ${videoId}`
                })
            }
        })
        .catch((error) => console.error(error));
});

//DELETE "/:id"
app.delete("/:id", (req, res) => {
    const videoId = +req.params.id;

    pool
        .query("DELETE FROM videos WHERE id=$1 RETURNING *", [videoId])
        .then((result) => {
            if (result.rowCount) {

                res.json({
                    "result": "success",
                    "message": `Video ${videoId} is deleted`
                });
            } else {
                res.json({
                    "result": "failure",
                    "message": "Video could not be deleted"
                });
            }
        })
        .catch((error) => console.error(error));
})

//UPDATE "/id"
app.put("/:id", (req, res) => {
    const customerId = +req.params.id;

    pool
        .query("SELECT * FROM videos WHERE id=$1", [customerId])
        .then((result) => {
            const newTitle = req.body.title;
            const newUrl = req.body.url;
            const newRating = req.body.rating;

            const currentName = result.rows[0].title;
            const currentUrl = result.rows[0].url;
            const currentRating = result.rows[0].rating;

            const query =
                "UPDATE videos SET title=$1, url=$2, rating=$3 WHERE id=$4";
            pool
                .query(query, [newTitle || currentName, newUrl || currentUrl, newRating || currentRating, customerId])
                .then(() => res.json({
                    "result": "success",
                    "message": "Video is updated"
                }))
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
})



app.listen(port, () => console.log(`Listening on port ${port}`));
