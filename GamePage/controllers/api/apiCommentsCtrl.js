const Game = require("../../models/game");

const index = (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        let query = req.query.description;
        let sanitizedQuery = query.replace(/\</g, ">");
        console.log(sanitizedQuery);
        let newComment = {
            name: req.user.name,
            description: sanitizedQuery,
            user: req.user._id
        };
        game.comments.push(newComment);
        game.save(err => {
            console.log("api " + game);
            let len = game.comments.length;
            let comment = game.comments[len - 1];
            res.status(200).json(comment);
        });
    });
};

module.exports = { index };

// const createComment = (req, res) => {
//     Game.findById(req.params.id, (err, game) => {
//         let newComment = {
//             name: req.user.name,
//             description: req.body.description,
//             user: req.user._id
//         };
//         game.comments.push(newComment);
//         game.save()
//         res.status(200).json(newComment)
//             (`/games/${game._id}`);
//         });
//     });
// };

// const deleteComment = (req, res) => {
//     Game.findById(req.params.id, (err, game) => {
//         const comment = game.comments.id(req.params.comment_id);
//         if (!comment) return res.redirect(`/games/${game._id}`);
//         comment.remove();
//         game.save(err => {
//             return res.redirect(`/games/${game._id}`);
//         });
//     });
// };

// module.exports = {
//     createComment,
//     deleteComment
// };
