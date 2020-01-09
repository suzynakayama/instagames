const Game = require("../models/game");

const index = (req, res, next) => {
    const user = req.user;
    Game.find({ user: user.id })
        .sort({ name: 1 })
        .exec((err, games) => {
            res.render("users/index", {
                title: "My Games",
                games,
                user
            });
        });
};

module.exports = {
    index
};
