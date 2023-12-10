const express = require("express");
const router = express.Router();

const {
  getAllSevas,
  createSeva,
  getSeva,
  updateSeva,
  deleteSeva,
} = require("../controllers/seva");

router.get("/", getAllSevas);
router.post("/", createSeva);

router.get("/:id", getSeva);
router.patch("/:id", updateSeva);
router.delete("/:id", deleteSeva);
module.exports = router;
