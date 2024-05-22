const express = require('express');
const router = express.Router();
const dal = require("../apiData/userData.js");

router.get('/', function(req, res) {
  res.render("login");
});

/* POST login page. */
router.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.render("login", { message: 'Username and password are required' });
  }

  dal.getUser((err, jsonData) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.render("login", { message: 'An error occurred. Please try again later.' });
    }

    if (jsonData != null) {
      req.session.user = jsonData;
      res.redirect('/');
    } else {
      res.render("login", { message: 'Invalid username or password' });
    }
  }, username, password);
});

module.exports = router;
