//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

var items=[];
let workItems=[];

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  var today= new Date();
  var currentDay= today.getDay();

  var options={
    weekday:"long",
    day:"numeric",
    month:"long",
  }

  var day= today.toLocaleDateString("en-US",options);

  res.render("Todolist", {listTitle:day, newListItem: items});
});

app.post("/",function(req,res){
  item = req.body.list;
  items.push(item);

  res.render("Todolist", {newListItem: item});

  res.redirect("/");
});

app.get("/work", function(req, res){
  res.render("list",{listTitle: "Work List", newListItem: workItems});
});

app.post("/work",function(req,res){
  let item = req.body.list;
  workItems.push(item);

  res.redirect("/work");
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
