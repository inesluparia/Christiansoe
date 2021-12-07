import "./pointsOfInterestPage.scss";
import { createElementFromString } from "../../utils/utils";
import { pointsOfInterestService } from "../../services/pointsOfInterestService";

function PointsOfInterestPage() {

    pointsOfInterestService.findAll()
        .then(pointsOfInterest => {
            
        });

    const pageElement = createElementFromString(`
        <h1>Points of Interest</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button>Click me</button>g
    `);

    pageElement.querySelector("button")?.addEventListener("click", () => {
        alert("You clicked the button!");
    });

    return pageElement;
}

export default PointsOfInterestPage;
