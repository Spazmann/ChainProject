var express = require('express');
var router = express.Router();
const dal = require("../apiData/userData.js")

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('createAccount');
});

router.post('/create', async function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    if (!username || !password || !email) {
        return res.render("createAccount", { message: 'Username, email, and password are required' });
    }

    dal.doesUserUsernameExist(async (err, bool) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.render("login", { message: 'An error occurred. Please try again later.' });
        }

        if (bool) {
            return res.render("createAccount", { message: 'Username already exists' });
        } else {
            dal.createUser((err, newUser) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.render("createAccount", { message: 'An error occurred. Please try again later.' });
                }
                res.redirect('/login');
            }, username, email, password);
        }
    }, username);
});

module.exports = router;