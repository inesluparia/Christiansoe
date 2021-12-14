import {createElementFromString} from "../../utils/utils";
import "./routesPage.scss"
export default RoutesPage;


function RoutesPage(props) {

    const pageElement = createElementFromString(`
    <h1>Øens ruter</h1>
    <hr>
    <div id="routes-container">
        <span>
            ${props.routes.map(route => `
            <div id="route-container">
                <details>
                    <summary>
                        <h3>${route.name}</h3>
                        <span>${route.description}</span>
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
    </div>    
    `)
    return pageElement
}
