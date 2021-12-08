import { createElementFromString } from "../../utils/utils";
import {speciesService} from "../../services/speciesService";
export default AnimalsPage;

function AnimalsPage(props) {

    const listStr = props.animals.map(animal => `
        <li data-test=${animal.name}>
                ${animal.name}, ${animal.latinName}
        </li>
       `).join("")

    const detailsStr =
        `<aside>
            <h2>${props.animals[2].name}</h2>
            <h4>${props.animals[2].latinName}</h4>
            <p>${props.animals[2].description}</p>
            <img src="http://localhost:3000/images/Cyanistes caeruleus.jpg"> 
            <audio controls>
                <source src="http://localhost:3000/sounds/Cyanistes caeruleus.mp3" type="audio/mpeg">
            </audio>
        </aside>
`;
    const listElement = createElementFromString(listStr)
    listElement.id = "list-container"

    const detailsElement = createElementFromString(detailsStr)
    detailsElement.id = "details-container"


    listElement.addEventListener("click", async(event) => {
        event.preventDefault()
        //event.target.style.color = "red"
        console.log(event.target.dataset.test)
        //  const id = Number(event.target.dataset.animalId)
        //******* notice hardcoded id
        const selectedAnimal = await speciesService.findById(2)
        console.log("This is evidence that the fetch is working, animal id2 name: " + selectedAnimal.name)
        pageElement.querySelector("h2").innerHTML = selectedAnimal.name
        pageElement.querySelector("h4").innerHTML = selectedAnimal.latinName
        pageElement.querySelector("p").innerHTML = selectedAnimal.description
    })

    const pageElement = document.createElement("div")
    pageElement.appendChild(listElement)
    pageElement.appendChild(detailsElement)
    return pageElement


    //TODO find out how to get the media objects, first fetche davids changes in the backend...
    //Looks like I can only get attributes but not objects!!!! and the ID doesnt come in the json :(

}

