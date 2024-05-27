const express = require('express');
const router = express.Router();
const dal = require("../apiData/userData.js");

router.get('/', function(req, res) {
  res.render("login");
});

/* POST login page. */
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { message: 'Username and password are required' });
  }

  try {
    const user = await dal.getUser(username, password);
    if (user) {
      req.session.user = user;
      return res.redirect('/');
    } else {
      return res.render('login', { message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login process:', error);
    return res.render('login', { message: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
