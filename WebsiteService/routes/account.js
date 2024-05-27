const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    const user = req.session.user;

    if (user) {
        const username = user.username;
        const email = user.email;

        res.render('account', { title: 'Account', username, email });
    } else {
        res.redirect('/login');
    }
});

router.post('/updateAccount', async function(req, res, next) {
    res.render('account', { title: 'Account' });
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