const axios = require('axios');
const passwordUtils = require('../security/password');

const apiBaseUrl = 'http://userservice:5162'; // API 

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 5000, // Set a timeout of 5 seconds
});

const getUser = async (username, password) => {
    try {
        const response = await axiosInstance.get(`/User/${username}`);
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
        const response = await axiosInstance.post(`/User/multiple`, usernames);
        return response.data;
    } catch (err) {
        console.error('Error fetching users:', err);
        return null;
    }
};

const doesUserUsernameExist = async (username) => {
    try {
        const response = await axiosInstance.get(`/User/exists/${username}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            return false;
        } else {
            throw err;
        }
    }
};

const createUser = async (username, email, password) => {
    try {
        const response = await axiosInstance.post(`/User`, {
            username: username,
            email: email,
            password: passwordUtils.hashPassword(password)
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

const updateUser = async (id, newUsername, email, password) => {
    try {
        const payload = {
            username: newUsername,
            email: email,
            password: passwordUtils.hashPassword(password)
        };
        
        console.log('Payload being sent:', payload);
        
        const response = await axiosInstance.put(`/User/${id}`, payload);
        return response.data;
    } catch (err) {
        console.error('Error updating user:', err.response ? err.response.data : err.message);
        throw err;
    }
};

module.exports = {
    getUser,
    getUsersForChannel,
    doesUserUsernameExist,
    createUser,
    updateUser
};
