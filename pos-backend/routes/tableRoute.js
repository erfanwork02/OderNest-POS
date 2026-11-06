const router = require("express").Router();

const {
  addTable,
  getTables,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");

const { isVerifiedUser } = require("../middleware/tokenVerification");
router.use(isVerifiedUser);

router.route("/").post(addTable).get(getTables);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

module.exports = router;