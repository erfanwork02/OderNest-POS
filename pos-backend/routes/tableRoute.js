const router = require("express").Router();
const { addTable, getTables, updateTable } = require("../controllers/tableController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

router.use(isVerifiedUser);
router.route("/").post(addTable).get(getTables);
router.put("/:id", updateTable);

module.exports = router;
