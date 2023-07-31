const express = require('express');
const router = express.Router();
const fs = require('fs');
// Reading hamburger "JSON".
const getJSON = () => {
    return fs.readFileSync('./data/recipes.json', 'utf-8');
}

/// OUTPUT Hamburger & Sandwiches to "site/client".
router.get("/api/hamburger_sandwiches", (req, res) => {
    res.send(getJSON());
});
module.exports = router;