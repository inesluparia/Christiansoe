export function createElementFromString(str) {
    const divElement = document.createElement('div');
    divElement.innerHTML = str.trim();
    return divElement;
}

export function renderPageElement(pageFunction, rootElement) {
    rootElement.innerHTML = "";
    pageFunction().childNodes.forEach(child => {
        if (child.nodeType === 1) {
            rootElement.appendChild(child);
        }
    });
}