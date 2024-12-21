const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  email: {
    required: [true, 'Email is required'],
    type: String,
    unique: true,
    validate: {
        validator: function (v) {
          // Regular expression for basic email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
  },
  password: {
    required: true,
    type: String,
  },
 token: { type: String },
});

exports.Person = mongoose.model("Person", personSchema, "persons");
