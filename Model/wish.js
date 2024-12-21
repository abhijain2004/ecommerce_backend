const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
 realId: { type: String },
});

exports.Wish = mongoose.model("Wish", wishSchema, "wishs");