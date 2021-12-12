const apiUrl = 'http://localhost:8080';

export const pointsOfInterestService = {
    findAll: async () => {
        return fetch(`${apiUrl}/points-of-interest`)
            .then(response => response.json());
    },
    findById: (id) => {
        return fetch(`${apiUrl}/points-of-interest/${id}`)
            .then(response => response.json());
    },
    findWithinRange: (lat, lng, distance) => {
        return fetch(`${apiUrl}/points-of-interest?range=${distance}&latitude=${lat}&longitude=${lng}`)
            .then(response => response.json());
    }
};
