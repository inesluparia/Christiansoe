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
     * @param {number} distanceInMeters The distance in meters.
     * @returns {string} The distance in a human readable format.
     */
    getHumanReadableDistanceFromMeters(distanceInMeters) {
        const distanceInKilometers = distanceInMeters / 1000;
        return distanceInKilometers > 1 ? 
            `${distanceInKilometers.toFixed(1)} km` :
            `${distanceInMeters.toFixed(0)} m`;
    },
    /**
     * Formats the duration to a human readable format.
     * 
     * @param {number} durationInSeconds The duration in seconds.
     * @returns {string} The duration in a human readable format.
     */
    getHumanReadableDurationFromSeconds(durationInSeconds) {
        const durationInMinutes = durationInSeconds / 60;
        const durationInHours = durationInMinutes / 60;
        const durationInDays = durationInHours / 24;

        if (durationInDays > 1) {
            return `${durationInDays.toFixed(0)} dage`;
        } else if (durationInHours > 1) {
            return `${durationInHours.toFixed(0)} timer`;
        } else if (durationInMinutes > 1) {
            return `${durationInMinutes.toFixed(0)} min`;
        } else {
            return "< 1 min";
        }
    }
};
