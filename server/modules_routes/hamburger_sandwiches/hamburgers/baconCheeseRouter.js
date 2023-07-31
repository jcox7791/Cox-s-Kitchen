const express = require('express');
const router = express.Router();
const fs = require('fs');
// Reading hamburger "JSON".
const getJSON = () => {
  return fs.readFileSync('./data/recipes.json', 'utf-8');
}
const parseJSON = (j) => {
  return JSON.parse(j)
}
// Setting the JSON functon to a variable.
let recipesJSON = getJSON()
// Turning "recipesJSON" into an "obj".
let recipes = parseJSON(recipesJSON);
// INPUT Bacon-CheeseBurger Likes Data from "site/client".
router.post("/api/createBaconCheeseBurgerLikes", ({ body }, req, res) => {
  // console.log("Bacon-Cheeseburger Users Likes Data API call: ", body);
  savingUsersLikeDataToJSON(body);
});
// Writing Bacon-CheeseBurger Likes DATA to JSON.
const savingUsersLikeDataToJSON = async (data) => {
  let usersLikes = data["likes"];
  // console.log("Saving Likes: ", usersLikes);

  recipes["recipes"]["hamburgers"]["baconCheeseBurger"]["likes"] = usersLikes
  // Updating the recipes JSON.
  fs.promises
    .writeFile('./data/recipes.json', JSON.stringify(recipes, null, 2))
    .then(console.log("JSON: Likes Updated and Written..."))
    .catch(e => console.log("ERROR", e))

}
// INPUT Bacon-CheeseBurger Users Data from "site/client".
router.post("/api/createBaconCheeseBurger", ({ body }, req, res) => {
  // console.log("Bacon-Cheeseburger Users Data API call: ", body);

  // Users Comments.
  savingUsersDataToJSON(body);
});
// Writing Bacon-CheeseBurger Users DATA to JSON.
const savingUsersDataToJSON = async (data) => {
  recipes = parseJSON(getJSON())
  let usersComments = data["comments"];
  let baconCheeseBurgerComments = recipes["recipes"]["hamburgers"]["baconCheeseBurger"]["comments"];
  // Assigning the ID and setting the padding.
  baconCheeseBurgerComments[assignID().toString().padStart(3, "0")] = usersComments
  // Updating the recipes JSON.
  fs.promises
    .writeFile('./data/recipes.json', JSON.stringify(recipes, null, 2))
    .then(console.log("Written..."))
    .catch(e => console.log("ERROR", e))
}
// Initiating the ID to the comments.
const assignID = () => {
  return Object.keys(recipes["recipes"]["hamburgers"]["baconCheeseBurger"]["comments"]).length
}
// OUTPUT CheeseBurger to "site/client".
router.get("/api/cheeseBurger", (req, res) => {
  // console.log(json)
  res.send(getJSON());
})

module.exports = router;