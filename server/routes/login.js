const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const validate = require("../validations/users");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    
});

module.exports = router;