import {createElementFromString} from "../../utils/utils";
import "./mapPage.scss";
import mapboxgl from "mapbox-gl";

function MapPage() {
    const mapElement = document.getElementById("map");

    const pageElement = createElementFromString(`
        <div id="map"></div>
        <div id="estimates"></div>
        <div>
            <button id="waypoint-button">Set waypoint</button>
        </div>
    `);


    return pageElement;
}

export default MapPage;