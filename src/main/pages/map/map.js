//færgeterminal: 55.3207393, 15.1860027
let map = L.map('map').setView([55.3207393, 15.1860027], 16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 0,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);







/*

let marker = L.marker([55.32072, 15.18604]).addTo(map)
marker.bindPopup("<b>Christiansø Færgeterminal</b>");
*/

/*
L.control.scale({imperial: true, metric: true}).addTo(map);

let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick)
*/
