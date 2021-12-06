import "./points-of-interest.scss";
import { createElementFromString } from "../../utils/utils";

function PointsOfInterestPage() {
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
