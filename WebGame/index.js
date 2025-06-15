const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.listen(3535,()=>console.log("Application Running"))

let clientState = "hold";

app.get("/setup",(req,res)=>{
    clientState="up";
    res.send("New State Up")
})
app.get("/setdown",(req,res)=>{
    clientState="down";
    res.send("New State Up")
})
app.get("/setleft",(req,res)=>{
    clientState="left";
    res.send("New State left")
})
app.get("/setright",(req,res)=>{
    clientState="right";
    res.send("New State right")
})
app.get("/sethold",(req,res)=>{
    clientState="hold";
    res.send("New State hold")
})

app.get("/state",(req,res)=>res.json({state:clientState}))
app.get("/ping",(req,res)=>res.send("Application Working"))
app.get("/",(req,res)=>res.send("Root Page"))