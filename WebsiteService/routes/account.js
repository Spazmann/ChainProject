const express = require('express');
const router = express.Router();
const ual = require("../apiData/userData.js");

router.get('/', async function(req, res, next) {
    const user = req.session.user;

    if (user) {
        const newUsername = user.username;
        const email = user.email;

        res.render('account', { title: 'Account', newUsername, email });
    } else {
        res.redirect('/login');
    }
});

router.post('/updateAccount', async function(req, res, next) {
    const { newUsername, email, password } = req.body;

    try {
        const usernameExists = await ual.doesUserUsernameExist(newUsername);

        if (usernameExists && newUsername !== req.session.user.username) {
            res.render('account', { title: 'Account', message: 'Username already exists', username: req.session.user.username, email: req.session.user.email });
        } else {
            await ual.updateUser(req.session.user.id, newUsername, email, password);
            req.session.user.username = newUsername;
            req.session.user.email = email;
            res.redirect('/');
        }
    } catch (err) {
        console.error('Error updating account:', err.response ? err.response.data : err.message);
        next(err);
    }
});

router.post('/logout', async function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        } else {
            res.render('login', { title: 'Login' });
        }
    });
});

module.exports = router;
