const url = "http://localhost:8080/routes"

export const routesService = {
    findAll: () => { return fetch(url).then(res => res.json())
    },
    findById: (id) => {return fetch(url + "/" + id).then(r => r.json())
    }
}
