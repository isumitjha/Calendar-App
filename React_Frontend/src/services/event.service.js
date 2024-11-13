import axios from 'axios';

// const API_URL = 'http://localhost:6060/api/messages/events/';
const API_URL = 'http://localhost/api/messages/events/';
// const API_URL = process.env.REACT_APP_API_SERVER_URL;

export const getEvents = async (token) => {
    return await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createEvent = async (eventData, token) => {
    return await axios.post(API_URL, eventData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateEvent = async (eventId, eventData, token) => {
    return await axios.put(`${API_URL}${eventId}/`, eventData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteEvent = async (eventId, token) => {
    return await axios.delete(`${API_URL}${eventId}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
