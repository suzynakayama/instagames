const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/auth/google");
// };

//router.post("/games/:id/comments", isLoggedIn, commentsCtrl.createComment);

router.delete("/games/:id/comments/:comment_id", commentsCtrl.deleteComment);

module.exports = router;
