function AnimalsPage() {
    
    // const animalsResponse = await fetch("http://localhost:8080/animals")
    //     .then(res => res.json());
    const animalsResponse = [];
    
    const html = animalsResponse.map(animal => `
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
