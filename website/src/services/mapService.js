//Users location via browser updated every 10 second
import mapboxgl from "mapbox-gl";

navigator.geolocation.getCurrentPosition(getFerryDistance)
/*
let intervalId = window.setInterval(function(){

    /// call your function here
}, 10000);
*/

//TODO Spørg hvordan det er async løser problemet
async function getFerryDistance(userLocation) {
    let userLongitude = userLocation.coords.longitude
    let userLatitude = userLocation.coords.latitude

    const query = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${start};${userLongitude},${userLatitude}?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`, {method: 'GET'})

    const json = await query.json()
    const data = json.routes[0]

    const rawDistance = data.distance

    let tripDuration = Math.floor(data.duration / 60) + " min. 🚶‍♂"
    let tripDistance = trimmingDistance(rawDistance)

    console.log(tripDuration)
    console.log(tripDistance)

    const ferryEta = document.getElementById("ferry-eta")
    ferryEta.innerHTML = "<strong>Christansø Færgeterminal </strong>" +tripDuration + tripDistance
}

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNnZXJrcmFiYmUiLCJhIjoiY2t3bmwxMG0wMm1wazJ2cXZ3cGhsZGNkOCJ9.F3h5DOWVUaRYultvyMggYQ'
/*
const map = new mapboxgl.Map({
    container: pageElement.querySelector("#map"), // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: [15.188356982912637, 55.320417209601885], // starting position [lng, lat]
    zoom: 15.5, // starting zoom
    minZoom: 14 // min zoom in
})
*/
let mapInstance = null;
function getMap() {
    if (mapInstance === null) {
        mapInstance = new mapboxgl.Map({
            container: pageElement.querySelector("#map"), // container ID
            style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
            center: [15.188356982912637, 55.320417209601885], // starting position [lng, lat]
            zoom: 15.5, // starting zoom
            minZoom: 14 // min zoom in
        });
    }
    return mapInstance;
}

export async function getRouteBetweenLocations(...locations) { return getMap().route; // blah blah

        let firstPartUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${locations[locations[0]]};`
        let secondPartUrl = `${location[locations.length-1]}?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`

        const query = await fetch(firstPartUrl + secondPartUrl, {method: 'GET'})

        const json = await query.json()
        const data = json.routes[0]
        const route = data.geometry.coordinates
        const geojson = {
            type: 'Feature', properties: {}, geometry: {
                type: 'LineString', coordinates: route
            }
        }
        // if the route already exists on the map, we'll reset it using setData
        if (map.getSource('route')) {
            map.getSource('route').setData(geojson)
        }
        // otherwise, we'll make a new request
        else {
            map.addLayer({
                id: 'route', type: 'line', source: {
                    type: 'geojson', data: geojson
                }, layout: {
                    'line-join': 'round', 'line-cap': 'round'
                }, paint: {
                    'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75
                }
            })
        }
        const routeInfo = document.getElementById('estimates')

        const rawDistance = data.distance

        routeInfo.innerHTML = `<p><strong>Trip duration:</strong> ${Math.floor(data.duration / 60)} min 🚶‍♂ </p><p><strong>Trip distance:</strong> ${trimmingDistance(rawDistance)}</p>`
    }


}
    export function drawMarkerOnMap(map) {


    }

