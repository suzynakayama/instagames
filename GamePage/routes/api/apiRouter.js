const express = require("express");
const router = express.Router();

const apiIndexRouter = require("./apiIndexRouter");

router.use("/games", apiIndexRouter);

module.exports = router;
