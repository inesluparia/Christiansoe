<<<<<<< HEAD:website/src/pages/animals/animalsPage.js
function AnimalsPage(props) {
    
    const html = props.animals.map(animal => `
=======
function AnimalsPage() {

    // const animalsResponse = await fetch("http://localhost:8080/animals")
    //     .then(res => res.json());
    const animalsResponse = [];

    const html = animalsResponse.map(animal => `
>>>>>>> 84959002b009dcc05024a9b76b365af460074a98:website/src/pages/animals/animals.js
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
