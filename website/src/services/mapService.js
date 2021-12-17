import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1IjoiYXNnZXJrcmFiYmUiLCJhIjoiY2t3bmwxMG0wMm1wazJ2cXZ3cGhsZGNkOCJ9.F3h5DOWVUaRYultvyMggYQ";

/**
 * Create a map object inside the specified DOM element.
 *
 * @example
 * const map = createMap(document.querySelector("#map"));
 *
 * @param {HTMLDivElement} rootElement
 * @returns {mapboxgl.Map}
 */
export function createMap(rootElement) {
    return new mapboxgl.Map({
        container: rootElement,
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [15.188356, 55.320417],
        pitchWithRotate: false,
        minZoom: 14,
        zoom: 15.5,
    });
}

/**
 * Gets a route in the form of an array of coordinates, given at
 * least two coordinates are provided.
 *
 * @example
 * const route = await getRouteFromCoordinates([
 *    [15.186018, 55.320770],
 *    [15.188356, 55.320417]
 * ]);
 *
 * @param {[number, number][]} coordinates - The coordinates the route consist of.
 * @returns {{distance: number, duration: number, coordinates: [number, number][]}} Returns a promise that resolves to an object with a property with distance of the route in meters, and an array of coordinates.
 */
export function getRouteFromCoordinatesAsync(...coordinates) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates.join(";")}`;
    let queryParams = `?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`;

    return fetch(url + queryParams)
        .then((response) => response.json())
        .then((data) => data.routes[0])
        .then((route) => {
            return {
                distance: route.distance,
                duration: route.duration,
                coordinates: route.geometry.coordinates,
            };
        });
}

/**
 * Draws a route on the map, by using the coordinates provided.
 *
 * @param {mapboxgl.Map} map The map to draw the route on.
 * @param {[number, number][]} coordinates The coordinates the route consist of.
 */
export function drawRouteOnMap(map, coordinates) {
    map.addLayer({
        id: "route",
        type: "line",
        source: {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: coordinates,
                },
            },
        },
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "#03AA46",
            "line-width": 8,
            "line-opacity": 1,
        },
    });
}

/**
 * Draw a marker on the specified map.
 *
 * @param {mapboxgl.Map} map The map on which to draw the marker.
 * @param {*} id The id of the marker.
 * @param {mapboxgl.LngLatLike} coordinates The coordinates of the marker.
 */
export function drawMarkerOnMap(map, id, coordinates) {
    map.addLayer({
        id,
        type: "circle",
        source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates,
                        },
                    },
                ],
            },
        },
        paint: {
            "circle-radius": 8,
            "circle-color": "#f30",
            "circle-opacity": 1,
        },
    });
}

// navigator.geolocation.getCurrentPosition(getFerryDistance);

// async function getFerryDistance(userLocation) {
//     let userLongitude = userLocation.coords.longitude;
//     let userLatitude = userLocation.coords.latitude;

//     const query = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/walking/${start};${userLongitude},${userLatitude}?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`,
//         { method: "GET" }
//     );

//     const json = await query.json();
//     const data = json.routes[0];

//     const rawDistance = data.distance;

//     let tripDuration = Math.floor(data.duration / 60) + " min. 🚶‍♂";
//     let tripDistance = trimmingDistance(rawDistance);

//     console.log(tripDuration);
//     console.log(tripDistance);

//     const ferryEta = document.getElementById("ferry-eta");
//     ferryEta.innerHTML =
//         "<strong>Christansø Færgeterminal </strong>" +
//         tripDuration +
//         tripDistance;
// }

// map.on("click", (event) => {
//     const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);

//     const end = {
//         type: "FeatureCollection",
//         features: [
//             {
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                     type: "Point",
//                     coordinates: coords,
//                 },
//             },
//         ],
//     };

//     if (map.getLayer("end")) {
//         map.getSource("end").setData(end);
//     } else {
//         map.addLayer({
//             id: "end",
//             type: "circle",
//             source: {
//                 type: "geojson",
//                 data: {
//                     type: "FeatureCollection",
//                     features: [
//                         {
//                             type: "Feature",
//                             properties: {},
//                             geometry: {
//                                 type: "Point",
//                                 coordinates: coords,
//                             },
//                         },
//                     ],
//                 },
//             },
//             paint: {
//                 "circle-radius": 10,
//                 "circle-color": "#f30",
//                 "circle-opacity": 1,
//             },
//         });
//     }
//     getRoute(coords);
// });

// export async function getRouteBetweenLocations(...locations) {
//     let firstPartUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${
//         locations[locations[0]]
//     };`;
//     let secondPartUrl = `${
//         location[locations.length - 1]
//     }?steps=true&geometries=geojson&walking_speed=1.1&access_token=${
//         mapboxgl.accessToken
//     }`;

//     const query = await fetch(firstPartUrl + secondPartUrl, { method: "GET" });

//     const json = await query.json();
//     const data = json.routes[0];
//     const route = data.geometry.coordinates;
//     const geojson = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//             type: "LineString",
//             coordinates: route,
//         },
//     };
//     // if the route already exists on the map, we'll reset it using setData
//     if (map.getSource("route")) {
//         map.getSource("route").setData(geojson);
//     }
//     // otherwise, we'll make a new request
//     else {
//         map.addLayer({
//             id: "route",
//             type: "line",
//             source: {
//                 type: "geojson",
//                 data: geojson,
//             },
//             layout: {
//                 "line-join": "round",
//                 "line-cap": "round",
//             },
//             paint: {
//                 "line-color": "#3887be",
//                 "line-width": 5,
//                 "line-opacity": 0.75,
//             },
//         });
//     }
//     const routeInfo = document.getElementById("estimates");

//     const rawDistance = data.distance;

//     routeInfo.innerHTML = `<p><strong>Trip duration:</strong> ${Math.floor(
//         data.duration / 60
//     )} min 🚶‍♂ </p><p><strong>Trip distance:</strong> ${trimmingDistance(
//         rawDistance
//     )}</p>`;
// }
