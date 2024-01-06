import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const notesModel = mongoose.model("notes", noteSchema);