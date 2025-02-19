const express = require("express");
const router = express.Router();
const {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
} = require("../controllers/workController");

router.get("/", getAllWorks);
router.get("/:id", getWorkById);
router.post("/", createWork);
router.patch("/:id", updateWork);
router.delete("/:id", deleteWork);

module.exports = router;
