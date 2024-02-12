const router = require("express").Router();

router.use("/users", require("./users.routes"));
router.use("/audiovisual", require("./audioVisual.routes"));
router.use("/commentary", require("./commentary.routes"));
router.use("/lists", require("./audioVisualList.routes"));

module.exports = router;
