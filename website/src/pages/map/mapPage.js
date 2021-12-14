import { createElementFromString } from "../../utils/utils";
import { createMap, drawMarkerOnMap } from "../../services/mapService";
import "./mapPage.scss";

function MapPage() {

    const pageElement = createElementFromString(`
        <div id="map"></div>
        <div id="estimates"></div>
        <div>
            <button id="waypoint-button">Set waypoint</button>
        </div>
    `);
    
    // .on("click", (event) => {
    //     const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
    //     console.log("coords", coords);
    // });
    
    const map = createMap(pageElement);
    map.on("load", () => {
        drawMarkerOnMap(map, [15.188356982912637, 55.320417209601885]);
    });

    return pageElement;
}

export default MapPage;
