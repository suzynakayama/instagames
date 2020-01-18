const Game = require("../models/game");

//const createComment = (req, res) => {
//    Game.findById(req.params.id, (err, game) => {
// let newComment = {
//     name: req.user.name,
//     description: req.body.description,
//     user: req.user._id
// };
// game.comments.push(newComment);
// game.save();
//err => {
//console.log("ctrl err " + err);
//res.redirect(`/games/${game._id}`);
//});
//    });
//};

const deleteComment = (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        const comment = game.comments.id(req.params.comment_id);
        if (!comment) return res.redirect(`/games/${game._id}`);
        comment.remove();
        game.save(err => {
            return res.redirect(`/games/${game._id}`);
        });
    });
};

module.exports = {
    //createComment,
    deleteComment
};
