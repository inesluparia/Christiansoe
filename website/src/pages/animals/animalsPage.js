function AnimalsPage(props) {
    
    const html = props.animals.map(animal => `
        <li>
            <a href="/species/${animal.id}" data-navigo>
                ${animal.name}, ${animal.latinName}
            </a>
        </li>
    `).join("");

    const pageElement = document.createElement("div");
    pageElement.innerHTML = html;

    return pageElement;
}

export default AnimalsPage;
