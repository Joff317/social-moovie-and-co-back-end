const { schema, model } = require("mongoose");

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

const audioVisualSchema = new Schema({
  categorie: {
    type: String,
    required: [true, "categorie is mandatory"],
  },
  title: {
    type: String,
    required: [true, "categorie is mandatory"],
    unique: [true, "title must be unique"],
  },
  genre: {
    type: String,
    required: [true, "genre is mandatory"],
    enum: {
      values: allowedGenre,
      message: `Invalid genre. Choose from: ${allowedGenre.join(", ")}`,
    },
  },
  author: {
    type: String,
    required: [true, "author is mandatory"],
  },
  date: {
    type: Number,
    required: [true, "date is mandatory"],
  },
  image: {
    type: String,
    required: [true, "image is mandatory"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
