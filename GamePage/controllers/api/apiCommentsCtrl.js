const Game = require("../../models/game");

const index = (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        console.log(game);
        let comments = game.comments;
        res.status(200).json(comments);
    });
};

module.exports = { index };
