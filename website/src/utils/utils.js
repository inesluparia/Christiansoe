export function createElementFromString(str) {
    const divElement = document.createElement('div');
    divElement.innerHTML = str.trim();
    return divElement;
}

export function renderPageElement(pageElement, rootElement) {
    rootElement.innerHTML = "";
    pageElement.childNodes.forEach(child => {
        if (child.nodeType === 1) {
            rootElement.appendChild(child);
        }
    });
}