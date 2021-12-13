//Users location via browser updated every 10 second
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