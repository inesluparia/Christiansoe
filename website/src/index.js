import "./style.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigo from "navigo";
import { injectPageBeforeRender, renderPages } from "./utils/utils";
import PointsOfInterestPage from "./pages/points-of-interest/pointsOfInterestPage";
import AnimalsPage from "./pages/animals/animalsPage";
import PlantsPage from "./pages/plants/plantsPage";
import NavigationPage from "./pages/navigationPage";
import { pointsOfInterestService } from "./services/pointsOfInterestService";
import { speciesService } from "./services/speciesService";
import { locationService } from "./services/locationService";
import { routesService } from "./services/routesService";
import RoutesPage from "./pages/routes/routesPage";
import MapPage from "./pages/map/mapPage";

const router = new Navigo("/");
const rootElement = document.getElementById("root");

router.hooks({
    before(done, match) {
        injectPageBeforeRender(NavigationPage());
        done();
    },
    after(match) {
        renderPages(rootElement);
    }
});

router.on({
    "/": () => {},
    "/animals": async () => {
        const animals = await speciesService.findAllAnimals()
        injectPageBeforeRender(AnimalsPage({ animals }));
    },
    "/plants": async () => {
        const plants = await speciesService.findAllPlants()
        injectPageBeforeRender(PlantsPage({ plants }));
    },
    "/routes": async () => {
        const routes = await routesService.findAll()
        rootElement.innerHTML = "";
        rootElement.appendChild(RoutesPage({ routes }));
    },
    "/points-of-interest": async () => {
        const pointsOfInterest = await pointsOfInterestService.findAll();

        // const renderPointsOfInterestPage = (props) => {
        //     // PointsOfInterestPage(props);
        //     renderPages(rootElement);
        // };
        const onFilterChange = (sortBy) => {
        //     if (sortBy === "distance") {
        //         locationService.getCurrentLocationAsync().then(currentLocation => {
        //             // Adding, as a property, on each point of interest, the distance from
        //             // the user's current location to the location of the point of interest.
        //             Promise.all(pointsOfInterest.map(async (pointOfInterest) => {
        //                 const distance = await locationService
        //                     .getDistanceBetween(currentLocation, pointOfInterest.location);

        //                 pointOfInterest.distance = distance;

        //                 return pointOfInterest;

        //             })).then(() => {
        //                 renderPointsOfInterestPage({ pointsOfInterest, onFilterChange, sortBy });
        //             });
        //         });

        //     } 
        //     // else {
        //     //     renderPointsOfInterestPage({ pointsOfInterest, onFilterChange, sortBy });
        //     // }
        };
        // renderPointsOfInterestPage({ pointsOfInterest, onFilterChange, sortBy: "name" });

        injectPageBeforeRender(PointsOfInterestPage({ 
            pointsOfInterest, 
            onFilterChange, 
            sortBy: "name" 
        }));

        renderPages(rootElement);
    }
})
.notFound(() => {
    alert("Not found!");
})
.resolve();
