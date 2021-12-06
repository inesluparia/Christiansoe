import "./style.scss";
import Navigo from "navigo";
import { renderPageElement } from "./utils/utils";

import PointsOfInterestPage from "./pages/points-of-interest/points-of-interest";
import AnimalsPage from "./pages/animals/animals";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.on({
    "/": () => {},
    "/animals": () => {
        renderPageElement(AnimalsPage, rootElement);
    },
    "/points-of-interest": () => {
        renderPageElement(PointsOfInterestPage, rootElement);
    },
}).notFound(() => {
    alert("Not found!");
}).resolve();
