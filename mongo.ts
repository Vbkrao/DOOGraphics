import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vbkrao2024:LF5Y0v6wTZpzGOSu@doographics.yopjqll.mongodb.net");
let connection = mongoose.connection;

connection.on("connected", () =>
  console.log("database is connected successfully")
);
connection.on("error", console.error.bind(console, "connection error:"));