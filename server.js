const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
// Serve static assets
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

const PORT = process.env.PORT || 8080;

const db = __dirname + "/db/db.json";
const indexPage = __dirname + "/public/index.html";
const notesPage = __dirname + "/public/notes.html";

app.get("/", function (req, res) {
  res.sendFile(indexPage);
});

app.get("/notes", function (req, res) {
  res.sendFile(notesPage);
});

app.get("/api/notes", function (req, res) {
  res.sendFile(db);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);