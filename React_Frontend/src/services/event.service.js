// import axios from 'axios';

// const API_URL = 'http://localhost:6060/api/messages/events/';

// export const getEvents = async (token) => {
//     return await axios.get(API_URL, {
//         headers: {
//             Authorization: `Bearer ${token}`  // Pass token for authentication
//         }
//     });
// };

// export const createEvent = async (event, token) => {
//     return await axios.post(API_URL, event, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// };

// export const deleteEvent = async (id, token) => {
//     return await axios.delete(`${API_URL}${id}/`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// };

import axios from 'axios';

const API_URL = 'http://localhost:6060/api/messages/events/';

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
