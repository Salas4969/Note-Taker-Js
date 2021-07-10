const express = require("express")
const fs = require("fs")
const path = require("path")
const PORT = process.env.PORT || 3001
const app =express()


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))


app.get('/notes', (req,res)=>{
res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get("/api/notes", (req,res)=>{
    const notes2 = fs.readFileSync("./db/db.json","utf8")
    const notes = JSON.parse(notes2)
    console.log(notes)
    return res.json(notes)
})

app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"))
})

app.post('/api/notes', (req,res)=>{
    const note =req.body;
    note.id =Date.now
    const note2 =fs.readFileSync("./db/db.json","utf8")
    const notes = JSON.parse(note2)
    notes.push(note)
    return res.json(note)
})
app.listen(PORT,() =>{console.log("Listening on PORT");})