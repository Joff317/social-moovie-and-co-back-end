const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
const Commentary = require("../models/Commentary.model");
const AudioVisual = require("../models/AudioVisual.model");

router.post("/:audiovisuelId", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const audioVisualId = req.params.audioVisualId;
    const { text } = req.body;

    const createdCommentary = await Commentary.create({
      user: userId,
      text,
      audioVisual: audioVisualId,
    });
    res
      .status(201)
      .json({ message: "Commentary created", data: createdCommentary });
  } catch (err) {
    next(err);
  }
});

router.get("/:audiovisualId", requireAuth, async (req, res, next) => {
  try {
    const audioVisualId = req.params.audioVisualId;
    const audioVisual = await AudioVisual.find(audioVisualId);
    console.log(audioVisual);
    const comments = await Commentary.find(audioVisualId)
      .populate("user", "pseudo")
      .select("text user");
    console.log(comments);

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
      const commentId = req.params.commentId;
      const userId = req.user._id;
      const { text } = req.body;
      const newCommentary = {
        text,
      };
      const checkUser = await Commentary.findById(commentId).populate("user", {
        _id: 1,
        email: 1,
      });

      if (checkUser.user._id.equals(userId)) {
        const updatedCommentary = await Commentary.findByIdAndUpdate(
          commentId,
          newCommentary,
          { new: true }
        ).populate("user", { _id: 0, email: 1 });
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
