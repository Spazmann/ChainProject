const axios = require('axios');

const apiBaseUrl = 'http://eeveeplushapi:5001';

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

const saveMessage = async (message) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/message`, message);
    return response.data;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
};

const createChannel = async (channel) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/channel`, channel);
    return response.data;
  } catch (error) {
    console.error('Error creating channel:', error);
    return null;
  }
};

const getChannel = async (id) => {
  try {
      const response = await axios.get(`${apiBaseUrl}/Channel/${id}`);
      return response.data;
  } catch (err) {
      throw err;
  }
};

module.exports = {
    getUserChannels,
    getChannelMessages,
    saveMessage,
    createChannel,
    getChannel
}
