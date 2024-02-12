const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
const List = require("../models/Lists.model");
const AudioVisual = require("../models/AudioVisual.model");

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const audioVisualId = req.params.audioVisualId;
    const { title, genre } = req.body;

    const createdList = await List.create({
      user: userId,
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

router.put("/:listId/update", requireAuth, async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const userId = req.user._id;
    console.log("$$$$$$$$$$$$");
    console.log(userId);
    console.log("$$$$$$$$$$$$");
    const { title, genre, audioVisualArray } = req.body;
    const newList = {
      title,
      genre,
      audioVisual: audioVisualArray,
    };

    const checkUser = await List.findById(listId).populate("user", {
      id: 1,
      pseudo: 1,
    });
    console.log("$$$$$$$$$$$$");
    console.log(checkUser);
    console.log("$$$$$$$$$$$$");
    if (checkUser.user._id.equals(userId)) {
      const updatedList = await List.findByIdAndUpdate(listId, newList, {
        new: true,
      })
        .populate("user", { _id: 0, email: 1, pseudo: 1 })
        .populate("audioVisual", { _id: 1, title: 1 });

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

router.delete("/:listId", requireAuth, async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const userId = req.user._id;
    console.log("$$$$$$$$$$$$");
    console.log(userId);
    console.log("$$$$$$$$$$$$");
    const checkUser = await List.findById(listId).populate("user", {
      id: 1,
      pseudo: 1,
    });

    if (checkUser.user._id.equals(userId)) {
      const deleteList = await List.findByIdAndDelete(listId);

      res
        .status(201)
        .json({ message: "List is deleted", data: deleteList });
    } else {
      res.status(403).json({
        message: "You are not authorized to delete this list",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
