import { createElementFromString } from "../../utils/utils";
import * as mapService from "../../services/mapService";
import "./mapPage.scss";

function MapPage() {

    const pageElement = createElementFromString(`
        <div id="map"></div>
    `);

    const map = mapService.createMap(pageElement.querySelector("#map"));
    map.on("load", async (e) => {

        map.resize();

        const waypoints = await mapService.getRouteFromCoordinates(
            [15.188356982912637, 55.320417209601885], [15.1928236, 55.3201917]
        );

        mapService.drawRouteOnMap(map, waypoints);
    });

    return pageElement;
}

export default MapPage;