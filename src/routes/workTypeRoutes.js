const express = require("express");
const router = express.Router();
const {
  getAllWorkTypes,
  createWorkType,
  updateWorkType,
  deleteWorkType,
} = require("../controllers/workTypeController");

router.get("/", getAllWorkTypes);
router.post("/", createWorkType);
router.patch("/:id", updateWorkType);
router.delete("/:id", deleteWorkType);

module.exports = router;
