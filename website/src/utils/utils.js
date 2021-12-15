export function createElementFromString(str) {
    const divElement = document.createElement('div');
    divElement.innerHTML = str.trim();
    return divElement;
}

const injectedPageElements = [];

export function injectPageBeforeRender(pageElement) {
    injectedPageElements.push(pageElement);
}

export function renderPages(rootElement) {
    rootElement.innerHTML = "";
    injectedPageElements.forEach(pageElement => {
        rootElement.appendChild(pageElement);
    });
}