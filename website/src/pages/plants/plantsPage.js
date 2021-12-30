import "./plantsPage.scss";
import {createElementFromString} from "../../utils/utils";
import {speciesService} from "../../services/speciesService";

export default PlantsPage;

function PlantsPage(props) {

    let plants = props.plants

    const htmlStr = `
    <div id="page-container">
        <h1>Øens planter</h1>
        <hr>
        <section id="top-section">
            <div id="dropdown-container" class="dropdown">
              <button class="dropbtn">Sorter efter sæson</button>
              <span class="dropdown-content">
                <li data-season="spring">Forår</li>
                <li data-season="summer">Sommer</li>
                <li data-season="autumn">Efterår</li>
                <li data-season="winter">Vinter</li>
                <li data-season="">Alle sæsoner</li>
              </span>
            </div>
            <ul id="list-container">
                ${plants.map(plant => `
                <li data-plant-id=${plant.id}>
                            ${plant.name}, ${plant.latinName}
                </li>`).join("")}
            </ul>  
        </section>
        <hr> 
        <aside id="details-container">
            <h2>${plants[2].name}</h2>
            <h4>${plants[2].latinName}</h4>
            <p>${plants[2].description}</p>
            <img src="${plants[2].media.find(m => m.isImage).url}" alt=""> 
        </aside>
    </div>`

    const pageElement = createElementFromString(htmlStr)


    let list = pageElement.querySelector("#list-container")
    list.addEventListener("click", async (event) => {
        event.preventDefault()
        const id = Number(event.target.dataset.plantId)
        const selected = await speciesService.findById(id)

        //Update text elements
        pageElement.querySelector("h2").innerHTML = selected.name
        pageElement.querySelector("h4").innerHTML = selected.latinName
        pageElement.querySelector("p").innerHTML = selected.description

        //Update Image
        pageElement.querySelector("img").src = ""
        const imageMedia = selected.media.filter((media) => media.isImage)
        if (imageMedia.length > 0) {
            pageElement.querySelector("img").src = imageMedia[0].url
        }
    })

    const dropdown = pageElement.querySelector(".dropdown-content")
    dropdown.addEventListener("click", async (event) => {
        event.preventDefault()
        const seasonSelected = event.target.dataset.season
        let plantsBySeason;
        if (seasonSelected === ""){
            plantsBySeason = plants
        } else
            plantsBySeason = await speciesService.findByPlantsBySeason(seasonSelected)
        list.innerHTML = plantsBySeason.map(plant => `
         <li data-plant-id=${plant.id}>
                 ${plant.name}, ${plant.latinName}
         </li>
        `).join("")
    })

    return pageElement


}

