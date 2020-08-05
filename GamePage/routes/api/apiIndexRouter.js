const express = require("express");
const router = express.Router();

const apiIndexCtrl = require("../../controllers/api/apiIndexCtrl");
// const apiCommentsCtrl = require("../../controllers/api/apiCommentsCtrl");

// router.use("/:id/comments", apiCommentsCtrl.createComment);
router.use("/all", apiIndexCtrl.index);

module.exports = router;
