const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const validate = require("../validations/users");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require("config");

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const rs = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
    if (rs.rowCount <= 0) return res.status(400).json({ message: "User already registered." });

    const validPassword = await bcrypt.compare(req.body.password, rs.rows[0].password);
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password." });

    const token = jwt.sign({ uId: rs.rows[0].id, email: rs.rows[0].email }, config.get("jwtPrivateKey"));

    res.json({ token });
});

module.exports = router;