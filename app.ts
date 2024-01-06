import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { notesModel } from "./models/notes";
import "./mongo";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find({});
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { note, title } = req.body;

  const newNote = new notesModel({ note, title });
  await newNote.save();

  res.json(newNote);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;

  const notes = await notesModel.findById(id).exec();

  res.json(notes);
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newContent = req.body.content;

  let newNote = await notesModel.findByIdAndUpdate(id, { title: newTitle, content: newContent }).exec();

  res.json(newNote);
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  let x = await notesModel.findByIdAndDelete(id).exec();

  res.json(x)
});

export {app};

