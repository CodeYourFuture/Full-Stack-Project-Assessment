const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const validate = require("../validations/users");

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    res.json({ message: "User registered." });
});

module.exports = router;