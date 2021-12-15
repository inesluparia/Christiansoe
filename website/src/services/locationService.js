export const locationService = {
    getDistanceBetween: (fromLocation, toLocation) => {
        const R = 6371e3; // Radius of the earth in meters.
        
        const deg2rad = (deg) => deg * (Math.PI / 180);

        const dLat = deg2rad(toLocation.latitude - fromLocation.latitude);  // deg2rad below
        const dLon = deg2rad(toLocation.longitude - fromLocation.longitude);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(fromLocation.latitude)) * Math.cos(deg2rad(toLocation.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in meters.
        
        return d;
    },
    getCurrentLocationAsync: async () => {
        const lastKnowLocation = JSON.parse(localStorage.getItem('lastKnowLocation'));
        const isValid = lastKnowLocation?.expiresAt > Date.now();

        if (isValid)
            return lastKnowLocation;
        
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
                    resolve(location);
                } else {
                    reject();
                }
            });
        });
    },
};