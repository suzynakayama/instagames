const Game = require("../../models/game");

const index = (req, res) => {
    Game.find({}, (err, games) => {
        res.status(200).json(games);
    });
};

module.exports = { index };
