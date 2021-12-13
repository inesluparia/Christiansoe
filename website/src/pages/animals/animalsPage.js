import "./animalsPage.scss";
import {createElementFromString} from "../../utils/utils";
import {speciesService} from "../../services/speciesService";

export default AnimalsPage;

function AnimalsPage(props) {

    let animals = props.animals

    const dropdownStr = `<div class="dropdown">
      <button class="dropbtn">Filter by season</button>
      <span class="dropdown-content">
        <li data-season="spring">Forår</li>
        <li data-season="summer">Sommer</li>
        <li data-season="autumn">Efterår</li>
        <li data-season="winter">Vinter</li>
        <li data-season="">Se alle</li>
      </span>
      </div>
      `

    const listStr = animals.map(animal => `
      <li data-animal-id=${animal.id}>
                ${animal.name}, ${animal.latinName}
        </li>
       `).join("")

    const detailsStr =
        `<hr> 
        <aside>
            <h2>${animals[2].name}</h2>
            <h4>${animals[2].latinName}</h4>
            <p>${animals[2].description}</p>
            <audio controls>
              <source src="/sounds/Cyanistes caeruleus.mp3" type="audio/mpeg">
            </audio>
            <img src="${animals[2].media.find(m => m.isImage).url}"> 
        </aside>`;

    let listElement = createElementFromString(listStr)
    listElement.id = "list-container"

    const detailsElement = createElementFromString(detailsStr)
    detailsElement.id = "details-container"

    const dropdownElement = createElementFromString(dropdownStr)
    dropdownElement.id = "dropdown-container"


    listElement.addEventListener("click", async (event) => {
        event.preventDefault()
        const id = Number(event.target.dataset.animalId)
        const selectedAnimal = await speciesService.findById(id)

        //Update text elements
        pageElement.querySelector("h2").innerHTML = selectedAnimal.name
        pageElement.querySelector("h4").innerHTML = selectedAnimal.latinName
        pageElement.querySelector("p").innerHTML = selectedAnimal.description

        //Update Image
        pageElement.querySelector("img").src = ""
        const imageMedia = selectedAnimal.media.filter((media) => media.isImage)
        if (imageMedia.length > 0) {
            pageElement.querySelector("img").src = imageMedia[0].url
        }

        //Update sound element
        pageElement.querySelector("audio").style.display = "none"
        const soundMedia = selectedAnimal.media.filter((media) => !media.isImage)
        if (soundMedia.length > 0) {
            pageElement.querySelector("audio").style.display = "block"
            pageElement.querySelector("audio").src = soundMedia[0].url
        }
    })

    dropdownElement.querySelector("span").addEventListener("click", async (event) => {
        event.preventDefault()
        const seasonSelected = event.target.dataset.season
        let animalsBySeason;
        if (seasonSelected === ""){
            animalsBySeason = animals
        } else
        animalsBySeason = await speciesService.findByAnimalsBySeason(seasonSelected)
         listElement.innerHTML = animalsBySeason.map(animal => `
         <li data-animal-id=${animal.id}>
                 ${animal.name}, ${animal.latinName}
         </li>
        `).join("")

    })

    const pageElement = document.createElement("div")
    pageElement.appendChild(dropdownElement)
    pageElement.appendChild(listElement)
    pageElement.appendChild(detailsElement)
    return pageElement


}

