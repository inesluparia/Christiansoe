import "./plantsPage.scss";
import {createElementFromString} from "../../utils/utils";
import {speciesService} from "../../services/speciesService";

export default PlantsPage;

function PlantsPage(props) {

    let plants = props.plants

    const dropdownStr = `
      <h1>Øens planter</h1><hr><br><br><br>
      <div class="dropdown">
      <button class="dropbtn">Filter by season</button>
      <span class="dropdown-content">
        <li data-season="spring">Forår</li>
        <li data-season="summer">Sommer</li>
        <li data-season="autumn">Efterår</li>
        <li data-season="winter">Vinter</li>
        <li data-season="">Se alle</li>
      </span>
      </div>`

    const listStr = plants.map(plant => `
      <li data-plant-id=${plant.id}>
                ${plant.name}, ${plant.latinName}
        </li>
       `).join("")

    const detailsStr =
        `<hr>
        <aside>
            <h2>${plants[0].name}</h2>
            <h4>${plants[0].latinName}</h4>
            <p>${plants[0].description}</p>
            <img src="${plants[0].media[0].url}"> 
        </aside>`;

    let listElement = createElementFromString(listStr)
    listElement.id = "list-container"

    const detailsElement = createElementFromString(detailsStr)
    detailsElement.id = "details-container"

    const dropdownElement = createElementFromString(dropdownStr)
    dropdownElement.id = "details-container"


    listElement.addEventListener("click", async (event) => {
        event.preventDefault()
        const id = Number(event.target.dataset.plantId)
        console.log("xxxxxx"+id)
        const selectedPlant = await speciesService.findById(id)

        //Update text elements
        pageElement.querySelector("h2").innerHTML = selectedPlant.name
        pageElement.querySelector("h4").innerHTML = selectedPlant.latinName
        pageElement.querySelector("p").innerHTML = selectedPlant.description

        //Update Image
        pageElement.querySelector("img").src = ""
        if (selectedPlant.media.length > 0) {
            pageElement.querySelector("img").src = selectedPlant.media[0].url
        }
    })

    dropdownElement.querySelector("span").addEventListener("click", async (event) => {
        event.preventDefault()
        const seasonSelected = event.target.dataset.season
        let plantsBySeason;
        if (seasonSelected === ""){
            plantsBySeason = plants
        } else
            plantsBySeason = await speciesService.findByPlantsBySeason(seasonSelected)
        listElement.innerHTML = plantsBySeason.map(plant => `
         <li data-plant-id=${plant.id}>
                 ${plant.name}, ${plant.latinName}
         </li>
        `).join("")
    })

    const pageElement = document.createElement("div")
    pageElement.appendChild(dropdownElement)
    pageElement.appendChild(listElement)
    pageElement.appendChild(detailsElement)
    return pageElement

}

