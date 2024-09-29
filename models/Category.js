const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true}
})

categorySchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "categories"
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;