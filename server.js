const express = require('express')
const database = require("./database")
const app = express()

app.set("vie engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get("/notes", async(req, res) =>{
  // const searchTerm = req.query.searchTerm;
  const notes = await database.getNotes()
  res.render("notes.ejs",{
    notes,
  })
})

app.get("/notes/:id", async (req, res) => {
  const id = +req.params.id
  const note = await database.getNote(id)
  if(!note){
    res.status(404).render("note4040.ejs")
    return
  }

  res.render("singleNote.ejs",{
    note,
  })
})

app.get("/createNote", (req, res) =>{
  res.render("createNote.ejs")
})

app.post("/notes", (req,res) =>{
  const data = req.body
  database.addNote(data)

  res.redirect("/notes")
})

app.post("/notes/:id/delete", (req, res) => {
  const id = +req.params.id
  database.deleteNote(id)
  res.redirect("/notes")
})

app.use(express.static('public'))

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});