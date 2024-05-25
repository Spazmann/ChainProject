var express = require('express');
const router = express.Router();
const dal = require("../apiData/messageData.js");
const ual = require("../apiData/userData.js");

/* GET create channel page. */
router.get('/', async function(req, res, next) {
    res.render('createChannel', { title: 'Create Channel' });
});

/* POST create channel data. */
router.post('/create', async function (req, res, next) {
    var channelName = req.body.channelName;
    const user = req.session.user;
    var users = req.body.users + ", " + user.username;

    if (!channelName || !users) {
        return res.render("createChannel", { message: 'You need a Channel Name and/or Users' });
    }

    const usernames = users.split(',').map(user => user.trim());

    try {
        const userDataArray = await ual.getUsersForChannel(usernames);

        if (!userDataArray) {
            return res.render("createChannel", { message: 'An error occurred while fetching users. Please try again later.' });
        }

        const validUsers = userDataArray.filter(user => user !== null);

        if (validUsers.length < 2) {
            return res.render("createChannel", { message: 'At least two valid users are required to create a channel.' });
        }

        const newChannel = {
            channelName: channelName,
            users: validUsers
        };

        await dal.createChannel(newChannel);
        res.redirect('/@me');
    } catch (err) {
        console.error('Error creating channel:', err);
        res.render("createChannel", { message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;
