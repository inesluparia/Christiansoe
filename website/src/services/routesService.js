const url = "http://localhost:8080/routes"

export const routesService = {
    findAll: async () => { return await fetch(url).then(res => res.json())
    },
    findById: async (id) => {return await fetch(url + "/" + id).then(r => r.json())
    }
}
