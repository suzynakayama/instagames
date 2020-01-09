const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/games");
    } else {
        res.render("index", { title: "InstaGames" });
    }
});

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/oauth2callback",
    passport.authenticate("google", {
        successRedirect: "/users",
        failureRedirect: "/"
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;
