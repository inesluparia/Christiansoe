import "./pointsOfInterestPage.scss";
import { createElementFromString } from "../../utils/utils";

function PointsOfInterestPage(props) {

    const pageElement = createElementFromString(`
        <h1>Points of Interest</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <ul>
            ${props?.pointsOfInterest.map(point => {
                return `
                    <li>
                        <button>
                            <header>
                                <h2>${point.name}</h2>
                            </header>
                            <p>${point.description}</p>
                        </button>
                    </li>
                `;
            }).join("")}
        </ul>
    `);
    
    return pageElement;
}

export default PointsOfInterestPage;
