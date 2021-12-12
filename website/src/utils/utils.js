export function createElementFromString(str) {
    const divElement = document.createElement('div');
    divElement.innerHTML = str.trim();
    return divElement;
}

export function renderPageElement(pageElement, rootElement) {
    rootElement.innerHTML = "";
    rootElement.appendChild(pageElement);
}