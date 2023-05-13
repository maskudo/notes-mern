const Note = require("../models/noteModel");

module.exports.createNote = async (req, res, next) => {
  try {
    const { text, checked } = req.body;
    const note = await Note.create({
      text,
      checked,
    });
    return res.json({ status: true, data: note });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    return res.json({ status: true, data: notes });
  } catch (error) {
    next(error);
  }
};
module.exports.getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({
      _id: id,
    });
    return res.json(note);
  } catch (error) {
    next(error);
  }
};
module.exports.updateNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedNote = req.body;
    const note = await Note.findOneAndUpdate({ _id: id }, updatedNote, {
      new: true,
    });
    return res.json(note);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id });
    return res.json(note);
  } catch (error) {
    next(error);
  }
};
