import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vbkrao2020:RQo8U2qjeWAtZOfF@cluster0.yrpl3zl.mongodb.net/?retryWrites=true&w=majority");
let connection = mongoose.connection;

connection.on("connected", () =>
  console.log("database is connected successfully")
);
connection.on("error", console.error.bind(console, "connection error:"));