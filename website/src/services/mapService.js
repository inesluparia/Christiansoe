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
 * const route = await getRouteFromCoordinatesAsync([
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
        .then(response => response.json())
        .then(data => data.routes[0])
        .then(route => {
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
 * @param {[number, number]} coordinates The coordinates of the marker.
 * @param color The color of the marker e.g. #ff0000
 */
export function drawMarkerOnMap(map, id, coordinates, color) {
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
            "circle-color": color ? color: "blue",
            "circle-opacity": 1,
        },
    });
}
