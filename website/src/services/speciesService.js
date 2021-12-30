const url = 'http://localhost:8080'

export const speciesService = {
    findAllAnimals: () => {
        return fetch( url + "/animals").then(response => response.json())
    },
    findAllPlants: () => {
        return fetch( url + "/plants").then(response => response.json())
    },
    findByAnimalsBySeason: (season) => {
        return fetch(url + "/animals?season=" + season).then(res=> res.json())
    },
    findByPlantsBySeason: (season) => {
        return fetch(url + "/plants?season=" + season).then(res=> res.json())
    },
    findById: (id) => {
        return fetch(url + "/species/" + id).then(response => response.json());
    },
}
