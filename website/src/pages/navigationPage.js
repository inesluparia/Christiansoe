import "./navigationPage.scss";
import { createElementFromString } from "../utils/utils";

function NavigationPage(props) {
    const pageElement = createElementFromString(`
        <nav>
            <ul>
                <li>
                    <a href="/" data-navigo>Christiansø</a>
                </li>
                <li>
                    <a href="/map" data-navigo>Kort over øen</a>
                </li>
                <li>
                    <a href="/routes" data-navigo>Stier</a>
                </li>
                <li>
                    <a href="/points-of-interest" data-navigo>Interessepunkter</a>
                </li>
                <li>
                    <a href="/animals" data-navigo>Dyr</a>
                </li>
                <li>
                    <a href="/plants" data-navigo>Planter</a>
                </li>
            </ul>
            ${props ? `
                <div class="ferry-info">
                    <span class="ferry-info-text">Tid og afstand til færgeterminalen</span>
                    <div class="ferry-info-data">
                        <time class="ferry-time" datetime="PT0H4M">${props.estimatedWalkDuration}</time>
                        <span class="ferry-distance">${props.estimatedDistance}</span>
                    </div>
                </div>
            ` : ""}
            <button id="toggle-nav-menu">
                <svg id="open-menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
                <svg id="close-menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </nav>
    `, "navigation-page"); // Custom id for the outer page element.

    const toggleNavMenuButton = pageElement.querySelector("#toggle-nav-menu");
    toggleNavMenuButton.addEventListener("click", () => {
        pageElement.querySelector("nav").classList.toggle("expanded");
    });
    
    return pageElement;
}

export default NavigationPage;
