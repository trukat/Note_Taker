const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");
const db = path.join(__dirname, "../db/db.json");
const { v4: uuidv4 } = require('uuid');

// /api/notes
router.get("/notes", (req, res) => {
    //console.log(db);
    fs.readFile(db, "utf8", (err, data) => {
      if (err) {
          let parsedNotes = [];
      };
      //console.log(data);
      return res.json(JSON.parse(data));
   
    });
  });

router.post("/notes", (req, res) => {
    let allNotes = [];
        let newNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text, 
        }

        allNotes.push(newNote);
        fs.writeFile(db, JSON.stringify(allNotes),(err) => {
            if (err) throw (err);
            res.json({msg: "success"})
        });
    });

router.delete("/notes/:id", (req, res) =>{
    fs.readFile(db, "utf8", (err, data) => {
        if (err) throw (err);
        let id = req.params.id;
        console.log(id);
        const allNotes = JSON.parse(data);
        console.log(allNotes);
        const remainingNotes = allNotes.filter(note => note.id !== id);
        fs.writeFile(db, JSON.stringify(remainingNotes),(err) => {
            if (err) throw (err);
            res.json({msg: "success"})
        });
    });
});

module.exports = router;