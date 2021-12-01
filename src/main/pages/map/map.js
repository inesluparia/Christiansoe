//færgeterminal: 55.3207393, 15.1860027

let map = L.map('map').setView([55.32072, 15.18613], 16)

/*

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 12,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);
*/
L.control.scale({imperial: true, metric: true}).addTo(map);




let marker = L.marker([55.32072, 15.18604]).addTo(map)
marker.bindPopup("<b>Christiansø Færgeterminal</b>");



var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    mqi = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png", {subdomains: ['otile1','otile2','otile3','otile4']});

var baseMaps = {
    "OpenStreetMap": osm,
    "MapQuestImagery": mqi
};

var overlays =  {//add any overlays here

};

L.control.layers(baseMaps,overlays, {position: 'bottomleft'}).addTo(map);




/*
let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick)
*/
