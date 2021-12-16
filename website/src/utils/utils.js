export function createElementFromString(str, id) {
    const divElement = document.createElement('div');
    divElement.innerHTML = str.trim();
    if (id) {
        divElement.id = id;
    }
    return divElement;
}

const injectedPageElements = [];

export function injectPageBeforeRender(pageElement) {
    console.log(pageElement);
    injectedPageElements.push(pageElement);
}

export function updateInjectedPage(pageElement, rootElement) {
    // Find the injected page element in the root element.
    const injectedPageElement = injectedPageElements
        .find(p => p.id === pageElement.id);
    
    if (injectedPageElement) {
        // Replace the injected page element with the new one.
        rootElement.querySelector(`#${injectedPageElement.id}`)
            .replaceWith(pageElement);
    }
}

export function renderInjectedPages(rootElement) {
    rootElement.innerHTML = "";
    injectedPageElements.forEach(pageElement => {
        rootElement.appendChild(pageElement);
    });
}
