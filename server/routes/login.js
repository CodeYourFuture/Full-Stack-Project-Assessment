const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const validate = require("../validations/users");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const rs = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
    if (rs.rowCount <= 0) return res.status(400).json({ message: "User already registered." });
});

module.exports = router;