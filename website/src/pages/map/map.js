mapboxgl.accessToken = 'pk.eyJ1IjoiYXNnZXJrcmFiYmUiLCJhIjoiY2t3bmwxMG0wMm1wazJ2cXZ3cGhsZGNkOCJ9.F3h5DOWVUaRYultvyMggYQ'

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: [15.188356982912637, 55.320417209601885], // starting position [lng, lat]
    zoom: 15.5, // starting zoom
    minZoom: 14
})
map.addControl(new mapboxgl.NavigationControl());


//Christiansø Færgeterminal
const start = [15.186, 55.32073]

//API URL
// https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${waypointList[0]};${end[0]},${end[1]}?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`

async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    // Average walking speed set to 1.1 meters per second
    let firstPartUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};`
    let secondPartUrl = `${end[0]},${end[1]}?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`

    waypointList.forEach(waypoint => {
        firstPartUrl += waypoint + ";"
    })

    const query = await fetch(
        firstPartUrl + secondPartUrl,
        {method: 'GET'}
    )

    const json = await query.json()
    const data = json.routes[0]
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
    }
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
        map.getSource('route').setData(geojson)
    }
    // otherwise, we'll make a new request
    else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        })
    }
    const routeInfo = document.getElementById('estimates');

    const rawDistance = data.distance

    routeInfo.innerHTML = `<p><strong>Trip duration:</strong> ${Math.floor(
        data.duration / 60
    )} min 🚶‍♂ </p><p><strong>Trip distance:</strong> ${trimmingDistance(rawDistance)}</p>`;
}

map.on('load', () => {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start)

    // Add starting point to the map
    map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: start
                        }
                    }
                ]
            }
        },
        paint: {
            'circle-radius': 10,
            'circle-color': '#3887be',
            'circle-opacity': 0
        }
    })


    map.on('click', (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key])

        const end = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    }
                }
            ]
        }
        if (map.getLayer('end')) {
            map.getSource('end').setData(end);
        } else {
            map.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: coords
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#f30',
                    'circle-opacity': 1
                }
            })
        }
        getRoute(coords)
    })
})

let waypointList = []
let coordReadyForSave = []


function saveRoute() {
    waypointList.push(coordReadyForSave[0])
    console.log(coordReadyForSave[0])

    const el = document.createElement('div')
    el.className = 'waypoint-marker'
    let waypointMarker = new mapboxgl.Marker(el).setLngLat(coordReadyForSave[0]).addTo(map)

}

map.on('click', (e) => {
        const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key])


        coordReadyForSave.shift()
        coordReadyForSave.push(coords)

        console.log(waypointList)
        console.log(coordReadyForSave)
    }
)

document.getElementById('button').addEventListener("click", saveRoute)


const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: start
            },
            properties: {
                title: 'Mapbox',
                description: 'Christiansø Færgeterminal'
            }
        }
    ]
}


for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div')
    el.className = 'marker'

    // make a marker for each feature and add to the map
    let marker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map)

    new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 25}) // add popups
                .setHTML(
                    `<h3>${feature.properties.description}</h3>`
                )
        )
        .addTo(map)
}

function trimmingDistance(rawDistance) {
    if (rawDistance >= 1000) {
        let distanceKm = rawDistance / 1000
        return distanceKm.toFixed(1) + " km"
    }
    if (rawDistance <= 1000) {
        return rawDistance.toFixed(0) + " meter"
    }
}