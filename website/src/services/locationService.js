export const locationService = {
    getDistanceBetween: (fromLocation, toLocation) => {
        const R = 6371; // Radius of the earth in km
        
        const deg2rad = (deg) => deg * (Math.PI / 180);

        const dLat = deg2rad(toLocation.latitude - fromLocation.latitude);  // deg2rad below
        const dLon = deg2rad(toLocation.longitude - fromLocation.longitude);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(fromLocation.latitude)) * Math.cos(deg2rad(toLocation.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        
        return d;
    },
    getCurrentLocationAsync: async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    resolve(position.coords);
                } else {
                    reject();
                }
            });
        });
    },
    getDistanceToLocationFromCurrentLocationAsync: async (location) => {
        const currentLocation = await locationService.getCurrentLocationAsync();
        return locationService.getDistanceBetween(currentLocation, location);
    },
};