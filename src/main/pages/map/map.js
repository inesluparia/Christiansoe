let terminallong = 55.3207393
let terminalLat = 15.1860027;

let map = L.map('map').setView([55.3207393, 15.1860027], 16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 12,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);


map.locate({watch: true}) // "watch: true" This will return map so you can do chaining
    .on('locationfound', function(e){
        let marker = L.marker([e.latitude, e.longitude]).bindPopup('Her er du!');
        let circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on('locationerror', function(e){
        console.log(e);
        alert("Adgang til placering nægtet.")
    })

function calcDistance(startLong, startLat, endLong, endLat) {
    const R = 6371e3; // metres
    const φ1 = endLat * Math.PI/180 // φ, λ in radians
    const φ2 = startLat * Math.PI/180
    const Δφ = (startLat-endLat) * Math.PI/180
    const Δλ = (startLong-endLong) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c
}


let startDestination = L.marker([55.32036, 15.191555]).addTo(map)
let otherStartDestination = L.marker([55.322609, 15.189178]).addTo(map)
let boatTerminal = L.marker([55.32072, 15.18604]).addTo(map)
boatTerminal.bindPopup("<b>Christiansø Færgeterminal</b>");
startDestination.bindPopup("<b>Distance til terminalen:</b> " + calcDistance(55.32036, 15.191555, terminallong, terminalLat).toFixed(0) + " meters");
otherStartDestination.bindPopup("<b>Distance til terminalen:</b> " + calcDistance(55.322609, 15.189178, terminallong, terminalLat).toFixed(0) + " meters");


L.control.scale({imperial: true, metric: true}).addTo(map);

let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick)
