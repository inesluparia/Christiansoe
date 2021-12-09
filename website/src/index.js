import "./style.scss";
import Navigo from "navigo";
import { renderPageElement } from "./utils/utils";
import PointsOfInterestPage from "./pages/points-of-interest/pointsOfInterestPage";
import AnimalsPage from "./pages/animals/animalsPage";
import { pointsOfInterestService } from "./services/pointsOfInterestService";
import { speciesService } from "./services/speciesService";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.on({
    "/": () => {},
    "/animals": async () => {
        const animals = await speciesService.findAllAnimals()
        rootElement.innerHTML = "";
        rootElement.appendChild(AnimalsPage({ animals }));
    },
    "/points-of-interest": async () => {
        const pointsOfInterest = await pointsOfInterestService.findAll();

        renderPageElement(
            PointsOfInterestPage({ pointsOfInterest }),
            rootElement
        );
    },
})
.notFound(() => {
    alert("Not found!");
})
.resolve();
