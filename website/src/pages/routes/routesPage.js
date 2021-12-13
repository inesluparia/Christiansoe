import {createElementFromString} from "../../utils/utils";

export default RoutesPage;


function RoutesPage(props) {

    const pageElement = createElementFromString(`
    <h1>Øens ruter<h1>
    <hr>
        <ul>
            ${props.routes.map(route => `
            <li>
                <h4>${route.name}</h4>
                <p>${route.description}</p>
            </li>
            `).join("")}
        </ul>
    `)

    return pageElement
}
