const { Schema, model } = require("mongoose");

const allowedGenre = [
  "science-fiction",
  "horror",
  "action",
  "drama",
  "comedy",
  "romance",
  "thriller",
  "fantasy",
  "animation",
  "documentary",
  "other",
];

const listSchema = new Schema({
  title: {
    type: String,
    required: [true, "text list is mandatory"],
    minlength: [3, "Title list must be at least 3 characters long"],
    maxlength: [70, "Title list must not exceed 200 characters"],
  },

  genre: {
    type: String,
    enum: {
      values: allowedGenre,
      message: `Invalid genre. Choose from: ${allowedGenre.join(", ")}`,
    },
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  audioVisual: [
    {
      type: Schema.Types.ObjectId,
      ref: "AudioVisual",
    },
  ],
});

const List = model("List", listSchema);
module.exports = List;
