const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  img: { type: String },
    title:{ type: String },
    name:{ type: String },
    text: { type: String },
    type: { type: String },
    size: { type: [String] },
    color: { type: [String] },
    gender: { type: String },
    price: { type: Number }

});

exports.Product = mongoose.model("Product", productSchema, "products");
