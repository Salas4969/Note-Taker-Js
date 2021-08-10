const express = require("express")
const fs = require("fs")
const path = require("path")
const PORT = process.env.PORT || 3001
const app =express()
 const ranID =require("uniqid")
 const database = require("./db/db.json")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
function writeToDB(notes) {
    fs.writeFileSync("./db/db.json",notes,function(err){
        if(err)
        return console.log(err)
    })
}
app.get('/notes', (req,res)=>{
res.sendFile(path.join(__dirname,"./public/notes.html"))
})
app.get("/api/notes", (req,res)=>{
    const notes2 = fs.readFileSync("./db/db.json","utf8")
    const notes = JSON.parse(notes2)
    // console.log(notes)
    return res.json(notes)
})
app.post('/api/notes', (req,res)=>{
    let newnote ={
        title: req.body.title,
        text: req.body.text,
    id: ranID()
    }
    console.log(database)
    database.push(newnote)
    console.log(newnote)
    writeToDB(JSON.stringify(database))
    res.json(req.body)
})
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"))
})
app.listen(PORT,() =>{console.log("Listening on PORT");})