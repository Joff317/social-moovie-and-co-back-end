const { Schema, model } = require("mongoose");
const { uploadImage } = require("../config/cloudinary");

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

const allowedCategories = ["film", "serie", "animé"];

// const imageValidation = async (imagePath) => {
//   try {
//     await uploadImage(imagePath);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

const audioVisualSchema = new Schema({
  categorie: {
    type: String,
    required: [true, "categorie is mandatory"],
    enum: {
      values: allowedCategories,
      message: `Invalid categorie. Choose from: ${allowedCategories.join(
        ", "
      )}`,
    },
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
  synopsis: {
    type: String,
    required: [true, "synopsis is mandatory"],
  },
  author: {
    type: String,
    required: [true, "author is mandatory"],
  },
  date: {
    type: Number,
    required: [true, "date is mandatory"],
  },
  duration: {
    type: Number,
    require: [true, "duration is mandatory"],
  },
  image: {
    type: String,
    required: [true, "image is mandatory"],
    //  validate: {
    //    validator: async function (value) {
    //      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    //      console.log("value: ", value);
    //      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");

    //      return await imageValidation(value);
    //    },
    //    message: "Image is inappropriate or contains nudity.",
    //  },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Commentary",
    },
  ],
});

const AudioVisual = model("AudioVisual", audioVisualSchema);
module.exports = AudioVisual;
