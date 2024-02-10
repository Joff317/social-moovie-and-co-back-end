const router = require("express").Router();

router.use("/users", require("./users.routes"));
router.use("/audiovisual", require("./audioVisual.routes"));

module.exports = router;
