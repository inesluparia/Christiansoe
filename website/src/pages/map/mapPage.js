import { createElementFromString } from "../../utils/utils";
import * as mapService from "../../services/mapService";
import "./mapPage.scss";

function MapPage() {

    const pageElement = createElementFromString(`
        <div id="map"></div>
        <div class="bridge-status-wrapper">
            <div class="bridge-status-beacon">
                <div class="bridge-status-indicator">
                
                </div>
            </div>
            <div class="bridge-inner-text">
                <p><b>BEMÆRKNING</b></p>
                <p>Broen er åben i efterår, vinter og forår.</p>
                <p>Det kan forekommer under sommer at den er midlertidig lukket.</p>
            </div>
        </div>
        
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
