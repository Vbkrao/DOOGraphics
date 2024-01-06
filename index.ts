import { json } from "express";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import notesModel from "./models/Notes";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  ""
);

app.get("/notes", (req, res) => {
  notesModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/notes", async (req, res) => {
  const note = req.body;
  const newNote = new notesModel(note);
  await newNote.save();

  res.json(note);
});

app.delete("/notes", (req, res) => {
  const id = req.body._id;

  notesModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Note!");
    }
  });
});

app.put("/notes", (req, res) => {
  const id = req.body._id;
  const newTitle = req.body.title;
  const newContent = req.body.content;

  console.log("_id: " + id);
  console.log("updatedTitle: " + newTitle);
  console.log("updatedContent: " + newContent);

  notesModel.findByIdAndUpdate(
    id,
    { title: newTitle, content: newContent },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Note Updated.");
      }
    }
  );
});

app.listen(4000, () => {
  console.log("Server Started on port 4000");
});