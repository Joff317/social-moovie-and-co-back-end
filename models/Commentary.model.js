const { Schema, model } = require("mongoose");

const commentarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  text: {
    type: String,
    required: [true, "text commentary is mandatory"],
    minlength: [3, "Text commentary must be at least 3 characters long"],
    maxlength: [200, "Text commentary must not exceed 200 characters"],
  },

  audioVisual: {
    type: Schema.Types.ObjectId,
    ref: "AudioVisual",
  },
});

const Commentary = model("Commentary", commentarySchema);
module.exports = Commentary;
