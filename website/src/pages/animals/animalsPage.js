import { createElementFromString } from "../../utils/utils";
import {speciesService} from "../../services/speciesService";
export default AnimalsPage;

function AnimalsPage(props) {

    const listStr = props.animals.map(animal => `
        <li data-animal-id=${animal.id}>
                ${animal.name}, ${animal.latinName}
        </li>
       `).join("")

    const detailsStr =
        `<aside>
            <h2>${props.animals[2].name}</h2>
            <h4>${props.animals[2].latinName}</h4>
            <p>${props.animals[2].description}</p>
            <img src="/images/Cyanistes caeruleus.jpg"> 
            <audio controls>
                <source src="/sounds/Cyanistes caeruleus.mp3" type="audio/mpeg">
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
        //console.log(event.target.dataset.test)
        const id = Number(event.target.dataset.animalId)
        //******* notice hardcoded id
        const selectedAnimal = await speciesService.findById(id)
        console.log("This is evidence that the fetch is working, animal id2 name: " + selectedAnimal.name)
        pageElement.querySelector("h2").innerHTML = selectedAnimal.name
        pageElement.querySelector("h4").innerHTML = selectedAnimal.latinName
        pageElement.querySelector("p").innerHTML = selectedAnimal.description
    //TODO find out how to get the loop the media objects to find if they are sounds or images and render dem ...
        //pageElement.querySelector("img").src = selectedAnimal.media.
    })

    const pageElement = document.createElement("div")
    pageElement.appendChild(listElement)
    pageElement.appendChild(detailsElement)
    return pageElement



}

