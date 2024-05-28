var express = require('express');
const router = express.Router();
const dal = require("../apiData/userData.js");

/* GET create account page. */
router.get('/', async function(req, res, next) {
    res.render('createAccount', { title: 'Create Account' });
});

/* POST create account data. */
router.post('/create', async function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    if (!username || !password || !email) {
        return res.render("createAccount", { message: 'Username, email, and password are required' });
    }

    console.log(`1. Received create account request - Username: ${username}, Email: ${email}, Password: ${password}`);

    try {
        console.log("2. Checking if username exists...");
        const userExists = await dal.doesUserUsernameExist(username);
        console.log(`3. Username exists: ${userExists}`);

        if (userExists) {
            return res.render("createAccount", { message: 'Username already exists' });
        } else {
            console.log("4. Creating new user...");
            await dal.createUser(username, email, password);
            console.log("5. User created successfully, redirecting to login.");
            res.redirect('/login');
        }
    } catch (err) {
        console.error('Error processing request:', err);
        res.render("createAccount", { message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;
