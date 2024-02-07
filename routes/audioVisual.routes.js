const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
const AudioVisual = require("../models/AudioVisual.model");
const uploadImage = require("../config/cloudinary");

//1. Create audiovisual
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { categorie, title, genre, author, date, image } = req.body;
    const publicId = await uploadImage(image);
    const createdAudioVisual = await AudioVisual.create({
      categorie,
      title,
      genre,
      author,
      date,
      image: publicId,
      user: userId,
    });
    res
      .status(201)
      .json({ message: "Audio Visual created", data: createdAudioVisual });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const audioVisuals = await AudioVisual.find()
      .select({
        categorie: 1,
        title: 1,
        genre: 1,
        author: 1,
        date: 1,
        image: 1,
      })
      .populate("user", { _id: 0, pseudo: 1 });

    res.status(201).json({
      message: "All audiovisual successfully get",
      audioVisuals: audioVisuals,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
