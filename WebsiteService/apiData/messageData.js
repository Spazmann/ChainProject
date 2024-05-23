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

const getChannelMessages = async (channelId) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/message/${channelId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

module.exports = {
    getUserChannels,
    getChannelMessages
};