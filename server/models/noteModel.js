const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Note", noteSchema);
