mapboxgl.accessToken = 'pk.eyJ1IjoiYXNnZXJrcmFiYmUiLCJhIjoiY2t3bmwxMG0wMm1wazJ2cXZ3cGhsZGNkOCJ9.F3h5DOWVUaRYultvyMggYQ'

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: [15.18600, 55.32073], // starting position [lng, lat]
    zoom: 14.5, // starting zoom
    min: 16
})


//Christiansø Færgeterminal
const start = [15.18600, 55.32073]

async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    // Average walking speed set to 1.1 meters per second
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&walking_speed=1.1&access_token=${mapboxgl.accessToken}`,
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
    const routeInfo = document.getElementById('instructions');

    const rawDistance = data.distance

    function trimmingDistance(rawDistance) {
        if (rawDistance >= 1000) {
            let distanceKm = rawDistance / 1000
            return distanceKm.toFixed(1) + " km"
        }
        if (rawDistance <= 1000) {
            return rawDistance.toFixed(0) + " meter"
        }
    }

    //TODO remove when everything is implemented
    console.log(data)

    // KODE FOR DIRECTION INSTRUCTIONS
    //const steps = data.legs[0].steps;
    //let tripInstructions = '';
    //for (const step of steps) {tripInstructions += `<li>${step.maneuver.instruction}</li>`;}
    //${tripInstructions}

    routeInfo.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
    )} min 🚶‍♂ </strong></p><ol>Trip distance: ${trimmingDistance(rawDistance)}</ol>`;
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
            'circle-opacity': 1
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

let coordToSave = []
let coordReadyForSave = []

//document.getElementById("button").addEventListener(saveRoute(long, lat))


function saveRoute(e) {
    coordToSave.push(coordReadyForSave[0])

    const el = document.createElement('div')
    el.className = 'marker'

    const marker1 = new mapboxgl.Marker(el)
        .setLngLat(coordToSave[0])
        .addTo(map);
}


map.on('click', (e) => {
        let coords = JSON.stringify(e.lngLat.toArray())

        coordReadyForSave.shift()
        coordReadyForSave.push(coords)

        console.log(coordToSave)
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
        .addTo(map);
}


/*
let terminallong = 55.3207393
let terminalLat = 15.1860027

let map = L.map('map').setView([55.3207393, 15.1860027], 16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 12,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map)


map.locate({watch: true}) // "watch: true" This will return map so you can do chaining
    .on('locationfound', function(e){
        let marker = L.marker([e.latitude, e.longitude]).bindPopup('Her er du!');
        let circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        })
        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on('locationerror', function(e){
        console.log(e)
        alert("Adgang til placering nægtet.")
    })

function calcDistance(startLong, startLat, endLong, endLat) {
    const R = 6371e3 // metres
    const φ1 = endLat * Math.PI/180 // φ, λ in radians
    const φ2 = startLat * Math.PI/180
    const Δφ = (startLat-endLat) * Math.PI/180
    const Δλ = (startLong-endLong) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c //meters
}

let startDestination = L.marker([55.32036, 15.191555]).addTo(map)
let otherStartDestination = L.marker([55.322609, 15.189178]).addTo(map)
let boatTerminal = L.marker([55.32072, 15.18604]).addTo(map)
boatTerminal.bindPopup("<b>Christiansø Færgeterminal</b>")
startDestination.bindPopup("<b>Distance til terminalen:</b> " + calcDistance(55.32036, 15.191555, terminallong, terminalLat).toFixed(0) + " meters")
otherStartDestination.bindPopup("<b>Distance til terminalen:</b> " + calcDistance(55.322609, 15.189178, terminallong, terminalLat).toFixed(0) + " meters")


L.control.scale({imperial: true, metric: true}).addTo(map)

let popup = L.popup()
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map)
}
map.on('click', onMapClick)
*/