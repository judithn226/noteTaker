//packages needed
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

let notesInfo = [];
// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public)")));

app.get("/api/notes", function (err, res) {
  try {
    notesInfo = fs.readFileSync("db/db.json", "utf8");
    console.log("hello");
    notesInfo = JSON.parse(notesInfo);
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  res.json(notesInfo);
});
app.post("/api/notes", function (req, res) {
  try {
    notesInfo = fs.readFileSync("./db/db.json", "utf8");
    console.log(notesInfo);
    notesInfo = JSON.parse(notesInfo);
    req.body.id = notesInfo.length;
    notesInfo.push(req.body);
    notesInfo = JSON.stringify(notesInfo);
    fs.writeFile("./db/db.json", notesInfo, "utf8", function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notesInfo));
  } catch (err) {
    throw err;
    console.log(err);
  }
});

app.delete("/api/notes", function (req, res) {
  try {
    notesInfo = fs.readFileSync("./db/db.json", "utf8");

    notesInfo = JSON.parse(notesInfo);

    notesInfo = notesInfo.filter(function (note) {
      return note.id != req.params.id;
    });

    notesInfo = JSON.stringify(notesInfo);
    fs.writeFile("./db/db.json", notesInfo, "utf8", function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notesInfo));
  } catch (err) {
    throw err;
    console.log(err);
  }
});
app.get("api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "/db/db.json"));
});
//starting the server (listener)
app.listen(port, function () {
  console.log("Server started! At http://localhost:" + port);
});
