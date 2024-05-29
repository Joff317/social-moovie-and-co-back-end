const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
const AudioVisual = require("../models/AudioVisual.model");
const User = require("../models/User.model");
// const uploadImage = require("../config/cloudinary");

//1. Create audiovisual
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { categorie, synopsis, title, genre, author, date, duration, image } =
      req.body;
    // const publicId = await uploadImage(image);
    const createdAudioVisual = await AudioVisual.create({
      categorie,
      synopsis,
      title,
      genre,
      author,
      date,
      duration,
      image,
      // image: publicId,
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
        synopsis: 1,
        title: 1,
        genre: 1,
        author: 1,
        date: 1,
        duration: 1,
        image: 1,
        comments: 1,
      })
      .populate("user", { _id: 0, pseudo: 1 })
      .limit(30);

    res.status(201).json({
      message: "All audiovisual successfully get",
      audioVisuals: audioVisuals,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/publisher", requireAuth, async (req, res, next) => {
  const userId = req.user._id;
  try {
    const audioVisual = await AudioVisual.find({ user: userId })
      .select({
        categorie: 1,
        synopsis: 1,
        title: 1,
        genre: 1,
        author: 1,
        date: 1,
        duration: 1,
        image: 1,
      })
      .populate("user", "pseudo");
    res.status(201).json({
      message: "AudioVisual publisher found by ID",
      audioVisual: audioVisual,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/filtered/mixed", async (req, res, next) => {
  const { categorie, genre } = req.query;

  try {
    let query = {};

    if (categorie && genre) {
      query = { categorie: categorie, genre: genre };
    } else if (categorie) {
      query = { categorie: categorie };
    } else if (genre) {
      query = { genre: genre };
    }

    const audioVisuals = await AudioVisual.find(query)
      .select({
        categorie: 1,
        synopsis: 1,
        title: 1,
        genre: 1,
        author: 1,
        date: 1,
        duration: 1,
        image: 1,
        comments: 1,
      })
      .populate("user", { _id: 0, pseudo: 1 });

    res.status(201).json({
      message: "Filtered audiovisuals successfully retrieved",
      audioVisuals: audioVisuals,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/searchbar/search", async (req, res, next) => {
  try {
    const { query } = req.query;

    console.log("Received search query:", query);

    const regex = new RegExp(`^${query}`, "i");

    const searchResults = await AudioVisual.find({
      title: { $regex: regex },
    }).select({
      categorie: 1,
      synopsis: 1,
      title: 1,
      genre: 1,
      author: 1,
      date: 1,
      duration: 1,
      image: 1,
      comments: 1,
    });
    // .populate("user", { _id: 0, pseudo: 1 });

    console.log("Search Results:", searchResults);

    res.status(201).json({
      message: `Search results for "${query}"`,
      audioVisuals: searchResults,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:audiovisualId", async (req, res, next) => {
  const audioVisualId = req.params.audiovisualId;
  try {
    const audioVisual = await AudioVisual.findById(audioVisualId)
      .select({
        categorie: 1,
        synopsis: 1,
        title: 1,
        genre: 1,
        author: 1,
        date: 1,
        duration: 1,
        image: 1,
      })
      .populate("user", { _id: 0, email: 1, pseudo: 1 });
    res
      .status(201)
      .json({ message: "AudioVisual found by ID", audioVisual: audioVisual });
  } catch (err) {
    next(err);
    // catch l'erreur et évite que l'app crash, ça passe à la suite.
  }
});

router.put("/update/:audiovisualId", requireAuth, async (req, res, next) => {
  const audioVisualId = req.params.audiovisualId;
  const userId = req.user._id;
  const { categorie, synopsis, title, genre, author, date, image } = req.body;
  const newAudioVisuals = {
    categorie,
    title,
    genre,
    synopsis,
    author,
    date,
    duration,
    image,
  };
  try {
    const checkUser = await AudioVisual.findById(audioVisualId).populate(
      "user",
      { _id: 1, email: 1 }
    );
    if (checkUser.user._id.equals(userId)) {
      const audioVisual = await AudioVisual.findByIdAndUpdate(
        audioVisualId,
        newAudioVisuals,
        {
          new: true,
        }
      ).populate("user", { _id: 0, email: 1 });
      res.status(201).json({
        message: "AudioVisual was successfully updated",
        data: audioVisual,
      });
    } else {
      res.status(403).json({
        message: "You are not authorized to update this AudioVisual",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:audiovisualId", requireAuth, async (req, res, next) => {
  const audioVisualId = req.params.audiovisualId;
  const userId = req.user._id;
  try {
    const checkUser = await AudioVisual.findById(audioVisualId).populate(
      "user",
      { _id: 1, email: 1 }
    );
    if (checkUser.user && checkUser.user._id.equals(userId)) {
      const audioVisual = await AudioVisual.findByIdAndDelete(audioVisualId);

      res
        .status(201)
        .json({ message: "AudioVisual is deleted", data: audioVisual });
    } else {
      return res.status(403).json({
        message: "You are not authorized to delete this AudioVisual",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
