const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        },
        categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;