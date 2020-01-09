const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};

router.get("/", isLoggedIn, usersCtrl.index);

module.exports = router;
