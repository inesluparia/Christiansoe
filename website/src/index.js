import "./style.scss";
import Navigo from "navigo";
import { renderPageElement } from "./utils/utils";

import PointsOfInterestPage from "./pages/points-of-interest/pointsOfInterestPage";
import AnimalsPage from "./pages/animals/animalsPage";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.on({
    "/": () => {},
    "/animals": async () => {
        // TODO: Use a service instead.
        const animals = await fetch("http://localhost:8080/animals")
            .then((res) => res.json());

        renderPageElement(AnimalsPage({ animals }), rootElement);
    },
    "/points-of-interest": () => {
        renderPageElement(PointsOfInterestPage(), rootElement);
    },
})
.notFound(() => {
    alert("Not found!");
})
.resolve();
