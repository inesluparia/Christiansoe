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
        const id = Number(event.target.dataset.animalId)
        const selectedAnimal = await speciesService.findById(id)
        console.log("This is evidence that the fetch is working, animal id2 name: " + selectedAnimal.name)

        //Update text elements
        pageElement.querySelector("h2").innerHTML = selectedAnimal.name
        pageElement.querySelector("h4").innerHTML = selectedAnimal.latinName
        pageElement.querySelector("p").innerHTML = selectedAnimal.description

        //Update Image
        pageElement.querySelector("img").src = ""
        const imageMedia = selectedAnimal.media.filter((media) => media.isImage)
        if (imageMedia.length > 0) {
            //MAKE A FOR EACH IF LATER THERE WILL BE MORE THAN ONE PICTURE
        pageElement.querySelector("img").src = imageMedia[0].url
        }

        //Update sound element
        pageElement.querySelector("audio").style.display = "none"
        const soundMedia = selectedAnimal.media.filter((media) => !media.isImage)
        if (soundMedia.length > 0) {
            pageElement.querySelector("audio").style.display = "block"
            pageElement.querySelector("sound").src = soundMedia[0].url
        }
    })

    const pageElement = document.createElement("div")
    pageElement.appendChild(listElement)
    pageElement.appendChild(detailsElement)
    return pageElement



}

