const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
const List = require("../models/Lists.model");
const AudioVisual = require("../models/AudioVisual.model");

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const userId = req.userId;
    const audioVisualId = req.params.audioVisualId;
    const { title, genre } = req.body;

    const createdList = await List.create({
      userId,
      title,
      genre,
      audioVisualId,
    });
    res.status(201).json({ message: "List created", data: createdList });
  } catch (err) {
    next(err);
  }
});

router.post("/:listId/add", requireAuth, async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const { audioVisualId } = req.body;
    //  const audioVisual = await AudioVisual.findById(audioVisualId);

    const list = await List.findByIdAndUpdate(
      listId,
      {
        $push: {
          audioVisual: audioVisualId,
        },
      },
      { new: true }
    );

    res.status(201).json({ message: "AudioVisual added to list", data: list });
  } catch (err) {
    next(err);
  }
});

router.get("/:listId/audiovisuals", requireAuth, async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const list = await List.findById(listId).populate("audioVisual");

    console.log("$$$$$$$$$$$$$$$$$");
    console.log("list :", list);
    console.log("$$$$$$$$$$$$$$$$$");

    res.status(201).json({ message: "Audiovisuals retrieved", list: list });
  } catch (err) {
    next(err);
  }
});

router.put("/:listId/:audioVisualId", requireAuth, async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const audioVisualId = req.params.audioVisualId;
    const userId = req.user._id;
    const { title, genre } = req.body;
    const newList = {
      title,
      genre,
      audioVisualId,
    };

    const checkUser = await List.find(listId).populate("user", {
      id: 1,
      pseudo: 1,
    });
    if (checkUser.user._id.equals(userId)) {
      const updatedList = await List.findByIdAndUpdate(listId, newList, {
        new: true,
      })
        .populate("user", { _id: 0, email: 1, pseudo: 1 })
        .populate("audioVisual");

      res.status(201).json({ message: "list updated", data: updatedList });
    } else {
      res.status(403).json({
        message: "You are not authorized to update this list",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
