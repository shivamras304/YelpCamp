const express    = require('express'),
  app            = express(),
  bodyParser     = require('body-parser'),
  mongoose       = require('mongoose');


mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true})
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

const Campground = mongoose.model("Campground", campgroundSchema);

// let campgrounds = [
//   {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//   {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
//   {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//   {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
//   {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//   {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
//   {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//   {name: "Granite Hill", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
// ]
//
// for(campground of campgrounds) {
  // Campground.create(
  //   {
  //     name: "Granite Hill",
  //     image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
  //     description: "This is a huge granite hill, no bathrooms, no water. Beautiful Grainite"
  //   },
  //   function(error, campgnd) {
  //     if(error) {
  //       console.log(error)
  //     } else {
  //       console.log("New Campground Added:")
  //       console.log(campgnd);
  //     }
  //   }
  // )
// }

app.get("/", (req, res) => {
  res.render("landing");
})

app.get("/campgrounds", (req, res) => {
  Campground.find(
    {},
    function(error, allCampgrounds) {
      if(error) {
        console.log(error)
      } else {
          res.render("index", {campgrounds: allCampgrounds});
      }
    })
})

app.post("/campgrounds", (req, res) => {
  // res.send("This is post route")
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  console.log(desc);
    Campground.create(
      {name: name, image: image, description: desc},
      function(error, campgnd) {
        if(error) {
          console.log(error)
        } else {
          console.log("New Campground Added:")
          console.log(campgnd);
          res.redirect("/campgrounds");
        }
      }
    )

})

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
})

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(
    req.params.id,
    function(error, foundCampground) {
      if(error) {
        console.log(error)
      } else {
        res.render("show", {campground: foundCampground})
      }
    }
  )
})

app.listen(3004, () => {
  console.log("The YelpCamp server has started on http://localhost:3004");
});
