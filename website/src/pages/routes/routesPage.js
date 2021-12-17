import {createElementFromString} from "../../utils/utils"
import "./routesPage.scss"
import {createMap, drawRouteOnMap, getRouteFromCoordinates} from "../../services/mapService";
import {routesService} from "../../services/routesService";

export default RoutesPage

function RoutesPage(props) {

    const pageElement = createElementFromString(`
    <div id="page-container">
    <h1>Øens ruter</h1>
    <hr>
    <div id="flex-container">
        <section id="routes-container">
            <span>
                ${props.routes.map(route => `
                <div id="route-container">
                    <details data-id="${route.id}">
                        <summary data-id="${route.id}">
                            <h3 data-id="${route.id}">${route.name}</h3>
                            <span data-id="${route.id}">${route.description}</span>
                        </summary>
                        <span>
                            <h4>Interessepunkter</h4>
                                <ol>
                                    ${route.pointsOfInterest.map(poi => `
                                        <li>
                                        <a data-navigo href="/points-of-interest/${poi.id}">
                                        ${poi.name}
                                        </a>
                                        </li>
                                    `).join("")}
                                </ol>
                        </span>
                    </details>    
                </div>
                `).join("")}
            </span>
        </section>  
        <section class="map-container" style="width: 800px; height:800px"></section>
    </div>
    </div>
    `)

    let mapElement = pageElement.querySelector(".map-container")
    const map = createMap(mapElement)

    const list = pageElement.querySelector("#routes-container");

    list.addEventListener("click", async (event) => {
        const id = event.target.dataset.id
        const route = await routesService.findById(id)
        //console.log(route.pointsOfInterest[0].name)

        const coordinates = await route.pointsOfInterest.map((point)=> {
            const lat = point.location.latitude
            const long = point.location.longitude
            return [long, lat]
        })
        console.log(coordinates)

        if (map.getLayer('route')) {
            map.removeLayer('route')
            map.removeSource('route')
        }
        loadRoute(coordinates)
    })

    async function loadRoute (coordinates) {
    const waypoints = await getRouteFromCoordinates(
            coordinates
            //[15.188356982912637, 55.320417209601885], [15.1928236, 55.3201917]
        );
        drawRouteOnMap(map, waypoints);
    }
    return pageElement
}
