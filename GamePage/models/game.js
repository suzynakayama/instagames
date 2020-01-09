const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const gameSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: String,
        imageId: String,
        link: {
            type: String,
            required: true
        },
        codeLink: {
            type: String,
            required: true
        },
        description: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [commentSchema]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
