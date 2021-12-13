import "./pointsOfInterestPage.scss";
import { createElementFromString } from "../../utils/utils";

function PointsOfInterestPage(props) {
    switch (props.sortBy) {
        // case "name":
        //     props.pointsOfInterest.sort((a, b) => {
        //         if (a.name < b.name) return -1;
        //         if (a.name > b.name) return 1;
        //         return 0;
        //     });
        //     break;
        case "distance":
            props.pointsOfInterest.sort((a, b) => {
                if (a.distance < b.distance) return -1;
                if (a.distance > b.distance) return 1;
                return 0;
            });
            break;
    }

    const pageElement = createElementFromString(`
        <div class="loading-spinner"></div>
        <h1>Interessepunkter</h1>
        <hr>
            <div class="filter-container">
                <label for="filter-select">Sortér efter</label>
                <div class="dropdown">
                    <select class="filter-select" id="filter-select" autofocus>
                        <option value="name" ${props.sortBy === "name" ? "selected" : ""}>Navn</option>
                        <option value="distance" ${props.sortBy === "distance" ? "selected" : ""}>Afstand</option>
                        <option value="hasPlants" ${props.sortBy === "hasPlants" ? "selected" : ""}>Har plantearter</option>
                        <option value="hasAnimals" ${props.sortBy === "hasAnimals" ? "selected" : ""}>Har dyrearter</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        class="feather 
                        feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
            </div>
        <hr>
        <ul>
            ${props?.pointsOfInterest.map(point => `
                <li>
                    <a data-navigo href="/points-of-interest/${point.id}">
                        ${point.media.find(m => m.isImage) ? `
                            <img src="${point.media.find(m => m.isImage).url}" alt="">
                        `: ""}
                        <section>
                            <header>
                                <h2>${point.name} ${
                                    point.distance ? `
                                        <span class="shown-distance">
                                            ${(point.distance / 1000).toFixed(2)} km
                                        </span>
                                    ` : ""}
                                </h2>
                                ${point.species.filter(s => s.isAnimal).length > 0 ? `
                                    <span>
                                        ${point.species.filter(s => s.isAnimal).length} dyr
                                    </span>
                                ` : ""}
                                ${point.species.filter(s => !s.isAnimal).length > 0 ? `
                                    <span>
                                        ${point.species.filter(s => !s.isAnimal).length} plante${
                                            point.species.filter(s => !s.isAnimal).length > 1 ? "r" : ""
                                        }
                                    </span>
                                ` : ""}
                            </header>
                            <p>${point.description}</p>
                        </section>
                    </a>
                </li>
            `).join("")}
        </ul>
    `);

    const filterSelect = pageElement.querySelector(".filter-select");
    filterSelect.addEventListener("change", () => {
        props.onFilterChange(filterSelect.value);
    });
    
    return pageElement;
}

export default PointsOfInterestPage;
