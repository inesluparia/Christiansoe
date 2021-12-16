export const locationService = {
    /**
     * Calculates the distance between two locations.
     * 
     * @copyright https://stackoverflow.com/q/18883601
     * 
     * @param {[number, number]} fromLocation
     * @param {[number, number]} toLocation
     * @returns Distance in meters between the two locations.
     */
    getDistanceBetween: (fromLocation, toLocation) => {
        const R = 6371e3; // Radius of the earth in meters.
        
        const degreesToRadians = (degree) => degree * (Math.PI / 180);

        const dLat = degreesToRadians(toLocation[1] - fromLocation[1]);
        const dLon = degreesToRadians(toLocation[0] - fromLocation[0]);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(fromLocation[1])) * Math.cos(degreesToRadians(toLocation[1])) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in meters.

        // console.log(typeof d);
        
        return d;
    },
    /**
     * Gets the current location of the user.
     * 
     * @returns {Promise<[number, number]>}
     */
    getCurrentLocationAsync: async () => {
        const lastKnowLocation = JSON.parse(localStorage.getItem('lastKnowLocation'));
        const isValid = lastKnowLocation?.expiresAt > Date.now();

        if (isValid)
            return [lastKnowLocation.longitude, lastKnowLocation.latitude];
        
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    const { latitude, longitude } = position.coords;
                    const location = { 
                        latitude, 
                        longitude,
                        expiresAt: new Date().getTime() + 1000 * 60,
                    };
                    localStorage.setItem('lastKnowLocation', JSON.stringify(location));
                    resolve([
                        location.longitude,
                        location.latitude
                    ]);
                } else {
                    reject();
                }
            });
        });
    },
    /**
     * Formats the distance to a human readable format.
     * 
     * @param {number} distance The distance in meters.
     * @returns {string} The distance in a human readable format.
     */
    getHumanReadableDistance(distance) {
        const distanceInKilometers = distance / 1000;
        return distanceInKilometers > 1 ? 
            `${distanceInKilometers} km` :
            `${distance} m`;
    },
    /**
     * Formats the duration to a human readable format.
     * 
     * @param {number} duration The duration in milliseconds.
     * @returns {string} The duration in a human readable format.
     */
    getHumanReadableDuration(duration) {
        const durationInSeconds = duration / 1000;
        const durationInMinutes = durationInSeconds / 60;
        return durationInMinutes > 1 ?
            `${durationInMinutes.toFixed(1)} min` :
            `${durationInSeconds.toFixed(0)} s`;
    }
};
