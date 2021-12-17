import "./style.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigo from "navigo";
import {
    injectPageBeforeRender,
    updateInjectedPage,
    renderInjectedPages,
} from "./utils/utils";
import PointsOfInterestPage from "./pages/points-of-interest/pointsOfInterestPage";
import AnimalsPage from "./pages/animals/animalsPage";
import PlantsPage from "./pages/plants/plantsPage";
import NavigationPage from "./pages/navigationPage";
import { pointsOfInterestService } from "./services/pointsOfInterestService";
import { speciesService } from "./services/speciesService";
import { locationService } from "./services/locationService";
import { getRouteFromCoordinatesAsync } from "./services/mapService";
import { routesService } from "./services/routesService";
import RoutesPage from "./pages/routes/routesPage";
import MapPage from "./pages/map/mapPage";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.hooks({
    async before(done) {

        injectPageBeforeRender(NavigationPage());

        const updatePage = async () => {
            const location = await locationService.getCurrentLocationAsync();
            const { distance, duration } = await getRouteFromCoordinatesAsync(
                [15.186018, 55.320770], // Christiansoe ferry terminal
                location
            );

            updateInjectedPage(
                NavigationPage({
                    estimatedDistance:
                        locationService.getHumanReadableDistanceFromMeters(distance),
                    estimatedWalkDuration:
                        locationService.getHumanReadableDurationFromSeconds(duration),
                }),
                rootElement
            );
        };

        updatePage();

        setInterval(updatePage, 1000 * 60);
        
        done();
    },
});

router.on({
    "/": () => renderInjectedPages(rootElement),
    "/animals": async () => {
        const animals = await speciesService.findAllAnimals();
        injectPageBeforeRender(AnimalsPage({ animals }));
        renderInjectedPages(rootElement);
    },
    "/plants": async () => {
        const plants = await speciesService.findAllPlants();
        injectPageBeforeRender(PlantsPage({ plants }));
        renderInjectedPages(rootElement);
    },
    "/routes": async () => {
        const routes = await routesService.findAll();
        injectPageBeforeRender(RoutesPage({ routes }));
        renderInjectedPages(rootElement);
    },
    "/map": async () => {
        injectPageBeforeRender(MapPage());
        renderInjectedPages(rootElement);
    },
    "/points-of-interest": async () => {
        const pointsOfInterest = await pointsOfInterestService.findAll();

        const onFilterChange = (sortBy) => {};

        injectPageBeforeRender(
            PointsOfInterestPage({
                pointsOfInterest,
                onFilterChange,
                sortBy: "name",
            })
        );

        renderInjectedPages(rootElement);
    },
})
.notFound(() => {
    alert("Not found!");
})
.resolve();
