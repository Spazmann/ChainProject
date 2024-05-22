const axios = require('axios');
const passwordUtils = require('../security/password');

const apiBaseUrl = 'http://localhost:5162'; // API 

const getAllChannelsOfUser = async (callback, id) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/User`, {
            username: username,
            email: email,
            password: passwordUtils.hashPassword(password)
        });
        callback(null, response.data);
    } catch (err) {
        callback(err);
    }
};

module.exports = {
    getAllChannelsOfUser
};