const router = require("express").Router();

const {
  addTable,
  getTables,
  updateTable,
} = require("../controllers/tableController");

// TEMPORARILY DISABLED UNTIL FRONTEND LOGIN IS CONNECTED
// const { isVerifiedUser } = require("../middleware/tokenVerification");
// router.use(isVerifiedUser);

router.route("/").post(addTable).get(getTables);
router.put("/:id", updateTable);

module.exports = router;