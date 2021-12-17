/**
 * Create an HTMLElement from a string of HTML.
 * 
 * @param {string} str The HTML code for the element.
 * @param {*} id The id of the element.
 * @returns {HTMLDivElement} The element.
 */
export function createElementFromString(str, id) {
    const divElement = document.createElement('div');
    divElement.innerHTML = str.trim();
    if (id) {
        divElement.id = id;
    }
    return divElement;
}

const injectedPageElements = [];

/**
 * Injects a page element into the queue of elements to be rendered.
 * The page element is first shown when {@link renderInjectedPages()} is called.
 * 
 * @param {HTMLDivElement} pageElement The page element to inject.
 */
export function injectPageBeforeRender(pageElement) {
    injectedPageElements.push(pageElement);
}

/**
 * Rerenders an already injected page element.
 * 
 * @param {HTMLDivElement} pageElement The page element to update.
 * @param {*} rootElement The root element where the page element should be rendered.
 */
export function updateInjectedPage(pageElement, rootElement) {
    // Find the injected page element in the root element.
    const indexOfInjectedPageElement = injectedPageElements
        .findIndex(p => p.id === pageElement.id);
    
    if (indexOfInjectedPageElement !== -1) {

        // Replace the injected page element with the new one.
        injectedPageElements[indexOfInjectedPageElement] = pageElement;
        
        rootElement.querySelector(`#${pageElement.id}`)
            ?.replaceWith(pageElement);
    }
}

/**
 * Renders all injected page elements injected with {@link injectPageBeforeRender()}.
 * 
 * @param {HTMLElement} rootElement The root element to render the injected pages into.
 */
export function renderInjectedPages(rootElement) {
    rootElement.innerHTML = "";
    injectedPageElements.forEach(pageElement => {
        rootElement.appendChild(pageElement);
    });
}
