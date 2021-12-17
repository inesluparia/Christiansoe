import {createElementFromString} from "../../utils/utils";
import * as mapService from "../../services/mapService";
import "./mapPage.scss";
import {drawMarkerOnMap} from "../../services/mapService";

function MapPage() {

    const pageElement = createElementFromString(`
        <div id="map">
        
        </div>
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
            <div class="bridge-status-wrapper-close">
                    <button class="bridge-close-button">
                       <div class="bridge-close-line line-1"></div>
                       <div class="bridge-close-line line-2"></div>
                   </button>
            </div>
        </div>
        
    `);

    const bridgeNotice = pageElement.getElementsByClassName("bridge-status-wrapper-close")[0]

    bridgeNotice.addEventListener("click",
        () => pageElement.getElementsByClassName("bridge-status-wrapper")[0].style.display = "none")

    const map = mapService.createMap(pageElement.querySelector("#map"));
    map.on("load", async (e) => {
        drawMarkerOnMap(map,"bridge", [15.18588, 55.32044], "yellow")

        map.resize();

        const waypoints = await mapService.getRouteFromCoordinates(
            [15.188356982912637, 55.320417209601885], [15.1928236, 55.3201917]
        );

        mapService.drawRouteOnMap(map, waypoints);
    });

    return pageElement;
}

export default MapPage;
