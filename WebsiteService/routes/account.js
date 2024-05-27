const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    res.render('account', { title: 'Account' });
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