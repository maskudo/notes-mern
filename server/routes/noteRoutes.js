const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require("../controllers/noteController");

const router = require("express").Router();

router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);

module.exports = router;
