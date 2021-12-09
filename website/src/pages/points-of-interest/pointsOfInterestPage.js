import "./pointsOfInterestPage.scss";
import { createElementFromString } from "../../utils/utils";

function PointsOfInterestPage(props) {

    const pageElement = createElementFromString(`
        <h1>Interessepunkter</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <hr>
            <div class="filter-container">
                <select class="filter-select">
                    <option value="all">Vis alle</option>
                    <option value="history">Historisk</option>
                </select>
            </div>
        <hr>
        <div class="grid-container">
            ${props?.pointsOfInterest.map(point => `
                <div class="grid-item">
                    <button>
                        <article>
                            ${point.media.find(m => m.isImage) ? `
                                <img src="${point.media.find(m => m.isImage).url}" alt="">
                            `: ''}
                            <section>
                                <header>
                                    <h2>${point.name}</h2>
                                    ${point.species.filter(s => s.isAnimal).length > 0 && `
                                        <p>${point.species.filter(s => s.isAnimal).length} dyr</p>
                                    `}
                                    ${point.species.filter(s => !s.isAnimal).length > 0 && `
                                        <p>${point.species.filter(s => !s.isAnimal).length} plante(r)</p>
                                    `}
                                </header>
                                <p>${point.description}</p>
                            </section>
                        </article>
                    </button>
                </div>
            `).join("")}
        </div>
    `);

    const filterSelect = pageElement.querySelector(".filter-select");
    filterSelect.addEventListener("change", () => {
        props.onFilterChange(filterSelect.value);
    });
    
    return pageElement;
}

export default PointsOfInterestPage;
