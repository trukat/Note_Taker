const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");
const db = path.join(__dirname, "../db/db.json");

// /api/notes
router.get("/notes", (req, res) => {
    //console.log(db);
    fs.readFile(db, "utf8", (err, data) => {
      if (err) throw err;
      //console.log(data);
      return res.json(JSON.parse(data));
   
    });
  });

router.post("/notes", (req, res) => {
    console.log(req.body)
    fs.readFile(db, "utf8", (err, data) => {
        if (err) throw (err);

        const allNotes = JSON.parse(data);

        let newNote = {
            id: 1,
            title: req.body.title,
            text: req.body.text, 
        }

        allNotes.push(newNote);
        fs.writeFile(db, JSON.stringify(allNotes),(err) => {
            if (err) throw (err);
            res.json({msg: "success"})
        });
    });
});

module.exports = router;