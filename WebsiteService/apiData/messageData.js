const axios = require('axios');

const apiBaseUrl = 'http://localhost:5109';

const getUserChannels = async (id) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/Channel/user/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getUserChannels
};