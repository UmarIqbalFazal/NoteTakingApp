// import express from "express"
const express = require("express");

const app = express();

app.get("/api/notes", (req,res) => {
    res.send("you got 7 notes");
});

app.listen(5001, () =>{
    console.log("Server started on PORT: 5001");
});