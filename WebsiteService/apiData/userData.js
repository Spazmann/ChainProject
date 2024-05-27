const axios = require('axios');
const passwordUtils = require('../security/password');

const apiBaseUrl = 'http://localhost:5162'; // API 

const getUser = async (username, password) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/User/${username}`);
        const user = response.data;

        if (user && await passwordUtils.comparePassword(password, user.password)) {
        return user;
        } else {
        return null;
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        throw err;
    }
};

const getUsersForChannel = async (usernames) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/User/multiple`, usernames);
        return response.data;
    } catch (err) {
        console.error('Error fetching users:', err);
        return null;
    }
};

const doesUserUsernameExist = async (callback, username) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/User/exists/${username}`);
        callback(null, response.data);
    } catch (err) {
        if (err.response && err.response.status === 404) {
            callback(null, false);
        } else {
            callback(err);
        }
    }
};

const createUser = async (callback, username, email, password) => {
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
    getUser,
    getUsersForChannel,
    doesUserUsernameExist,
    createUser
};