const apiUrl = 'localhost:8080';

export const pointsOfInterestService = {
    findAll: async () => {
        return await fetch(`${apiUrl}/points-of-interest`)
            .then(response => response.json());
    },
    findById: async (id) => {
        return await fetch(`${apiUrl}/points-of-interest/${id}`)
            .then(response => response.json());
    },
    findWithinRange: async (lat, lng, distance) => {
        return await fetch(`${apiUrl}/points-of-interest?range=${distance}&latitude=${lat}&longitude=${lng}`)
            .then(response => response.json());
    }
};
