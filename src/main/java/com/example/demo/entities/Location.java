package com.example.demo.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Location {

    private double latitude;

    private double longitude;

    protected Location() { }

    public Location(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double getDistanceTo(Location location) {
        double earthRadius = 6371e3; // Earth's radius in meters.

        // Convert to radians.
        double φ1 = location.getLatitude() * Math.PI / 180;
        double φ2 = latitude * Math.PI / 180;

        double Δφ = (latitude - location.getLatitude()) * Math.PI / 180;
        double Δλ = (longitude - location.getLongitude()) * Math.PI / 180;
    
        double a = Math.pow(Math.sin(Δφ / 2), 2) +
                   Math.cos(φ1) * Math.cos(φ2) *
                   Math.pow(Math.sin(Δλ / 2), 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return earthRadius * c;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
