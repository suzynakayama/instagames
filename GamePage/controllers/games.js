const Game = require("../models/game");
const User = require("../models/user");
const cloudinary = require("cloudinary");

const index = (req, res) => {
    let inputQuery = req.query.gameSearch
        ? { name: new RegExp(req.query.gameSearch, "i") }
        : {};
    let sortKey = req.query.sort || "name";

    let user = req.user;
    Game.find(inputQuery)
        .sort(sortKey)
        .exec((err, games) => {
            if (err)
                return res.send(
                    "Oooops! Something went wrong. We are working hard to fixed it for you!"
                );
            return res.render("games/index", { title: "Games", games, user });
        });
};

const newGame = (req, res) => {
    let user = req.user;
    res.render("games/new", { title: "Add a Game", user });
};

const showGame = (req, res) => {
    let user = req.user;
    Game.findById(req.params.id, (err, game) => {
        User.find({ game: game.id }).exec((err, users) => {
            return res.render("games/show", {
                title: game["name"],
                users,
                game,
                user
            });
        });
    });
};

const createGame = (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
        let user = req.user;
        req.body.user = user.id;
        req.body.image = result.secure_url;
        req.body.imageId = result.public_id;

        const game = new Game(req.body);
        game.save((err, game) => {
            if (err) {
                console.log(err);
                return res.render("games/new", {
                    title: "Try to Add Game Again",
                    user
                });
            }
            res.redirect("/games");
        });
    });
};

const editGame = (req, res) => {
    let user = req.user;
    Game.findById(req.params.id, (err, game) => {
        if (game) {
            res.render("games/edit", {
                title: `Edit ${game.name}`,
                game,
                gameId: req.params.id,
                user
            });
        } else {
            res.redirect("/games");
        }
    });
};

const updateGame = (req, res) => {
    Game.findById(req.params.id, async (err, game) => {
        if (req.file) {
            try {
                await cloudinary.v2.uploader.destroy(game.imageId);
                let result = await cloudinary.v2.uploader.upload(req.file.path);
                req.body.image = result.secure_url;
                req.body.imageId = result.public_id;
            } catch (err) {
                console.log(err);
                return res.redirect(`/games/${req.params.id}/edit`);
            }
        }
        game.name = req.body.name;
        game.link = req.body.link;
        game.codeLink = req.body.codeLink;
        game.description = req.body.description;
        game.save();
        res.redirect(`/games/${req.params.id}`);
    });
};

const deleteGame = (req, res) => {
    Game.findById(req.params.id, async (err, game) => {
        try {
            await cloudinary.v2.uploader.destroy(game.imageId);
            game.remove();
            res.redirect("/games");
        } catch (err) {
            console.log(err);
            return res.redirect(`/games/${req.params.id}`);
        }
    });
};

module.exports = {
    index,
    newGame,
    showGame,
    createGame,
    editGame,
    updateGame,
    deleteGame
};
