const URL = "http://localhost:8080/animals"

export async function showAnimals() {
    const animals = await getAnimals()
    const html = animals.map(a =>
        `<li>${a.name}, <a href="'#/animals?id=$">
    `)
}

export async function showBooks(match) {
    const books = await bookRepository.getBooks()
    const html = books.map(book =>
        `<li>${book.title}, <a href="#/books?id=${book.id}" data-navigo="">ID: ${book.id}</a></li>
    `).join("")
    document.getElementById("books-id").innerHTML= html

    if (match.params && match.params.id){
        document.getElementById("selected-id").innerText= "Book ID: " + match.params.id
        const book = await bookRepository.findBook(match.params.id)
        document.getElementById("details").innerText= "Title: " + book.title + "\nInfo: " + book.info
    }
}

const getAnimals = () => {
    return fetch(URL).then(res => res.json())
}

const findAnimal = (id) => {
    return fetch(URL + "/" +id).then(res => res.json())
}
