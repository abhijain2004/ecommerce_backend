const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  "firstName": String,
  "lastName": String,
  "phoneNumber": String,
  "email": String,
  "likeProducts":String, // "Yes" or "No"
  "productQuality":Number, // A numerical rating, e.g., 1 to 5
  "purchaseAgain":String, // "yes" or "no"
  "ratings": {
    "durability": String, // Example: "Poor", "Average", "Good", etc.
    "effectiveness": String, // Example: "Poor", "Average", "Good", etc.
    "innovative": String, // Example: "Poor", "Average", "Good", etc.
    "price": String, // Example: "Poor", "Average", "Good", etc.
    "quality": String, // Example: "Poor", "Average", "Good", etc.
    "usefulness": String // Example: "Poor", "Average", "Good", etc.
  },
  "missingFeatures": String
});

exports.Feedback = mongoose.model("Feedback", feedbackSchema, "feedbacks");
