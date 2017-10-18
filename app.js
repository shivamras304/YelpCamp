const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

let campgrounds = [
  {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
  {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
  {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
  {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
  {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
  {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
  {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
  {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
]

app.get("/", (req, res) => {
  res.render("landing");
})

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds});
})

app.post("/campgrounds", (req, res) => {
  // res.send("This is post route")
  let name = req.body.name;
  let image = req.body.image;
  campgrounds.push({name, image});
  res.redirect("/campgrounds");
})

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
})

app.listen(3004, () => {
  console.log("The server has started on http://localhost:3004");
});
