const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
const Commentary = require("../models/Commentary.model");
const AudioVisual = require("../models/AudioVisual.model");

router.post("/:audiovisualId", requireAuth, async (req, res, next) => {
  try {
    // On extrait les données de la requête
    const userId = req.user._id; // Récupérable par le require Auth
    const audioVisualId = req.params.audiovisualId; // AudioVisual auquel le commentaire est associé
    const { text } = req.body; // Le texte de la requête extrait du corps POST

    // Ensuite on vient créer un commentaire dans la bdd à l'aide du model Commentary
    const createdCommentary = await Commentary.create({
      user: userId,
      text,
      audioVisual: audioVisualId,
    });
    res
      .status(201)
      .json({ message: "Commentary created", data: createdCommentary });
  } catch (err) {
    next(err); // Toute erreur du bloc try est capturé par next et empêche de passer à la suite.
  }
});

router.get("/:audiovisualId", requireAuth, async (req, res, next) => {
  try {
    const audioVisualId = req.params.audiovisualId; //On extrait l'id de l'audiovisuel

    const audioVisual = await AudioVisual.findById(audioVisualId); //On recherche l'audiovisuel correspondant de la bdd avec l'id
    console.log(audioVisual);

    const comments = await Commentary.find({ audioVisual: audioVisualId }) // On recherche tous les commentaires associé à l'audiovisuel en question
      .populate("user", "pseudo") //On sélectionne le pseudo de l'utilisateur
      .select("text user"); //On sélectionne le texte en question

    res.status(201).json({
      message: "Commentary retrieved",
      comments: comments,
      audioVisual,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:audiovisualId/:commentId",
  requireAuth,
  async (req, res, next) => {
    try {
      // On extrait les données nécessaire de la requête
      const commentId = req.params.commentId;
      const userId = req.user._id;
      const { text } = req.body;
      // On met à jour le nouveau commentaire
      const newCommentary = {
        text,
      };

      // Vérifie si l'utilisateur est autorisé à modifié le commentaire en question
      const checkUser = await Commentary.findById(commentId).populate("user", {
        _id: 1,
        email: 1,
      });

      if (checkUser.user._id.equals(userId)) {
        const updatedCommentary = await Commentary.findByIdAndUpdate(
          commentId,
          newCommentary,
          { new: true } // Pour récupérer le nouveau commmentaire mis à jour dans la bdd
        ).populate("user", { _id: 1, pseudo: 1 }); //On récupére l'id pour identifier l'utilisateur de façon unique
        res
          .status(201)
          .json({ message: "Commentary updated", data: updatedCommentary });
      } else {
        res.status(403).json({
          message: "You are not authorized to update this commentary",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:audiovisualId/:commentId",
  requireAuth,
  async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const userId = req.user._id;
      const checkUser = await Commentary.findById(commentId).populate("user", {
        _id: 1,
        email: 1,
      });
      if (checkUser && checkUser.user && checkUser.user._id.equals(userId)) {
        const deletedComment = await Commentary.findByIdAndDelete(commentId);

        res
          .status(201)
          .json({ message: "Commentary is deleted", data: deletedComment });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
