// dependencies installed
const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 8080;
const app = express();
// Serve static assets
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

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

app.post("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    // parse data
    const notes = JSON.parse(data);
    const note = {
      id: uuidv4(),
      ...req.body,
    };
    //push parsed data to parsed data array
    notes.push(note);

    //stringify data
    const stringifiedData = JSON.stringify(notes, null, 2);
    fs.writeFile(__dirname + "/db/db.json", stringifiedData, function () {
      res.json(note);
    });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const { id } = req.params;
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    //n parse data
    let notes = JSON.parse(data);

    const note = {
      id: uuidv4(),
      ...req.body,
    };

    notes = notes.filter((note) => note.id !== id);

    const stringifiedData = JSON.stringify(notes, null, 2);
    //write to server
    fs.writeFile(__dirname + "/db/db.json", stringifiedData, function () {
      res.json(true);
    });
  });
});

app.all("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
