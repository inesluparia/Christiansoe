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
    <div id="page-container">
        <h1>Interessepunkter</h1>
        <hr>
            <div class="filter-container">
                <label for="filter-select">Sortér efter</label>
                <div class="dropdown">
                    <select class="filter-select" id="filter-select" autofocus>
                        <option value="name" ${props.sortBy === "name" ? "selected" : ""}>Navn</option>
                        <option value="distance" ${props.sortBy === "distance" ? "selected" : ""}>Afstand</option>
                    </select>
                </div>
            </div>
        <hr>
        <ul class="points-of-interest-list">
            ${props?.pointsOfInterest.map(point => `
                <li class="point-of-interest">
                    <a data-navigo href="/points-of-interest/${point.id}">
                        ${point.media.find(m => m.isImage) ? `
                            <img src="${point.media.find(m => m.isImage).url}" alt="">
                        `: ""}
                        <section>
                            <header>
                                <h2 class="point-of-interest-name">${point.name}</h2>
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
                            <p class="point-of-interest-description">${point.description}</p>
                        </section>
                    </a>
                </li>
            `).join("")}
        </ul>
    </div>`, "points-of-interest-page");

    const filterSelect = pageElement.querySelector(".filter-select");
    filterSelect.addEventListener("change", () => {
        props.onFilterChange(filterSelect.value);
    });

    return pageElement;
}

export default PointsOfInterestPage;
