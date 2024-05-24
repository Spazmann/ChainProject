var express = require('express');
const router = express.Router();
const dal = require("../apiData/userData.js");

/* GET create account page. */
router.get('/', async function(req, res, next) {
    res.render('createChannel', { title: 'Create Channel' });
});

/* POST create account data. */
router.post('/create', async function (req, res, next) {
    
});

module.exports = router;
