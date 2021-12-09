const url = 'http://localhost:8080'

export const speciesService = {
    findAllAnimals: async () => {
        return await fetch( url + "/animals").then(response => response.json())
    },
    findAllPlants: async () => {
        return await fetch( url + "/plants").then(response => response.json())
    },
    findByAnimalsBySeason: async (season) => {
        return await fetch(url + "/animals?season=" + season).then(res=> res.json())
    },
    findByPlantsBySeason: async (season) => {
        return await fetch(url + "/plants?season=" + season).then(res=> res.json())
    },
    findById: async (id) => {
        return await fetch(url + "/species/" + id).then(response => response.json());
    },
}
