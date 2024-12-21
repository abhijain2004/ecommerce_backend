const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
 realId: { type: String },
 size: { type: String },
 color: { type: String },
 amount: { type: Number },
});

exports.Cart = mongoose.model("Cart", cartSchema, "carts");
