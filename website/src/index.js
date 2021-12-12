import "./style.scss";
import Navigo from "navigo";
import { renderPageElement } from "./utils/utils";
import PointsOfInterestPage from "./pages/points-of-interest/pointsOfInterestPage";
import AnimalsPage from "./pages/animals/animalsPage";
import { pointsOfInterestService } from "./services/pointsOfInterestService";
import { speciesService } from "./services/speciesService";
import { locationService } from "./services/locationService";

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

        const renderPointsOfInterestPage = (props) => {
            renderPageElement(
                PointsOfInterestPage(props),
                rootElement
            );
        };

        const onFilterChange = (sortBy) => {
            if (sortBy === "distance") {
                locationService.getCurrentLocationAsync().then(currentLocation => {
                    // Adding, as a property, on each point of interest, the distance from 
                    // the user's current location to the location of the point of interest.
                    Promise.all(pointsOfInterest.map(async (pointOfInterest) => {
                        const distance = await locationService
                            .getDistanceBetween(currentLocation, pointOfInterest.location);
    
                        pointOfInterest.distance = distance;
    
                        return pointOfInterest;
    
                    })).then(() => {
                        renderPointsOfInterestPage({ pointsOfInterest, onFilterChange, sortBy });
                    });
                });

            } else {
                renderPointsOfInterestPage({ pointsOfInterest, onFilterChange, sortBy });
            }
        };

        renderPointsOfInterestPage({ pointsOfInterest, onFilterChange, sortBy: "name" });
    },
})
.notFound(() => {
    alert("Not found!");
})
.resolve();
