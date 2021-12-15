import "./style.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigo from "navigo";
import { renderPageElement } from "./utils/utils";
import PointsOfInterestPage from "./pages/points-of-interest/pointsOfInterestPage";
import AnimalsPage from "./pages/animals/animalsPage";
import PlantsPage from "./pages/plants/plantsPage";
import { pointsOfInterestService } from "./services/pointsOfInterestService";
import { speciesService } from "./services/speciesService";
import { locationService } from "./services/locationService";
import { routesService } from "./services/routesService";
import RoutesPage from "./pages/routes/routesPage";
import MapPage from "./pages/map/mapPage";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.on({
    "/": () => {},
    "/animals": async () => {
        const animals = await speciesService.findAllAnimals();
        rootElement.innerHTML = "";
        rootElement.appendChild(AnimalsPage({ animals }));
    },
    "/plants": async () => {
        const plants = await speciesService.findAllPlants();
        rootElement.innerHTML = "";
        rootElement.appendChild(PlantsPage({ plants }));
    },
    "/routes": async () => {
        const routes = await routesService.findAll();
        rootElement.innerHTML = "";
        rootElement.appendChild(RoutesPage({ routes }));
    },
    "/map": async () => {
        rootElement.innerHTML = "";
        rootElement.appendChild(MapPage());
    },
    "/points-of-interest": async () => {
        const pointsOfInterest = await pointsOfInterestService.findAll();

        const renderPointsOfInterestPage = (props) => {
            renderPageElement(PointsOfInterestPage(props), rootElement);
        };

        const onFilterChange = (sortBy) => {
            if (sortBy === "distance") {
                locationService
                    .getCurrentLocationAsync()
                    .then((currentLocation) => {
                        // Adding, as a property, on each point of interest, the distance from
                        // the user's current location to the location of the point of interest.
                        Promise.all(
                            pointsOfInterest.map(
                                async (pointOfInterest) => {
                                    const distance =
                                        await locationService.getDistanceBetween(
                                            currentLocation,
                                            pointOfInterest.location
                                        );

                                    pointOfInterest.distance = distance;

                                    return pointOfInterest;
                                }
                            )
                        ).then(() => {
                            renderPointsOfInterestPage({
                                pointsOfInterest,
                                onFilterChange,
                                sortBy,
                            });
                        });
                    });
            } else {
                renderPointsOfInterestPage({
                    pointsOfInterest,
                    onFilterChange,
                    sortBy,
                });
            }
        };

        renderPointsOfInterestPage({
            pointsOfInterest,
            onFilterChange,
            sortBy: "name",
        });
    },
})
.notFound(() => {
    alert("Not found!");
})
.resolve();
