import express from "express";
import bodyParser from "body-parser";
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);
//import popupS from "popups";

const app = express();
const port = 3000;
app.set('view engine', "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var toDo=[];
var work=[];
const dayzo= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March",
 "April", "May", "June", "July", "August",
  "September", "October", "November", "December"];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "date.js");
  let date = new Date();
  let day = months[date.getMonth()]+" "+ date.getDate()+", "+ dayzo[date.getDay()];
  res.render("index", {heading: day , items: toDo });
});
app.get("/work", (req, res) => {
  res.render("index", {heading: "Work" , 
                      items: work });
});
app.post("/submit", (req, res) => {
  var task=req.body.newItem;
  if(req.body.list ==="Work"){
    work.push(task);
    res.redirect("/work");
  }else{
    if (task !== ""){
      toDo.push(task);
      res.redirect("/");
    }
    else{
      res.redirect("/");  
    }
  }
  });
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
