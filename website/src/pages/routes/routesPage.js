import {createElementFromString} from "../../utils/utils"
import "./routesPage.scss"
import {createMap} from "../../services/mapService";
export default RoutesPage

function RoutesPage(props) {

    const pageElement = createElementFromString(`
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
                            <img src="/images/kort-dummy.png">
                        </span>
                    </details>    
                </div>
                `).join("")}
            </span>
        </section>  
        <section class="map-container"></section>
    </div>
  
    `)

    let mapElement = pageElement.querySelector(".map-container")
    createMap(mapElement)

    const list = pageElement.querySelector("#routes-container");
    list.addEventListener("click", (event) => {
        //I dont know know to get the hole route element
        const id = event.target.dataset.id
        //
    });

    return pageElement
}
