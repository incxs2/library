const myLibrary = [];



const newButton = document.querySelector(".new")

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

Book.prototype.toggleRead = function() {
    this.status = this.status === "Read" ? "Unread" : "Read";
};

function addBook(title, author, pages) {
    myLibrary.push(new Book(title, author, pages, "Unread"))
};

addBook("1984","George Orwell", 400, "unread");

const library = document.querySelector(".library");

function createCard(book) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.setAttribute("id",book.id)

    const title = document.createElement("div")
    title.classList.add("title")
    title.textContent = book.title

    const author = document.createElement("div")
    author.classList.add("author")
    author.textContent = `by ${book.author}`

    const pages = document.createElement("div")
    pages.classList.add("pages")
    pages.textContent = `${book.pages} pages`

    const status = document.createElement("div")
    status.classList.add("status")
    status.textContent = book.status

    const buttons = document.createElement("div")
    buttons.classList.add("buttons")

    const readButton = document.createElement("button")
    readButton.setAttribute("id", "toggleRead")
    readButton.addEventListener("click", () => {
        book.toggleRead()
        status.textContent = book.status;
    })

    const removeBook = document.createElement("button")
    removeBook.setAttribute("id", "removeBook")
    removeBook.addEventListener("click", () => {
        library.removeChild(card);
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index > -1) {
            myLibrary.splice(index,1)
        }
    })


    buttons.append(readButton, removeBook)

    card.append(title,author,pages,status,buttons)

    return card;
}

myLibrary.forEach(book => library.insertBefore(createCard(book), newButton))



const form = document.querySelector("form")

function toggleForm() {
    form.style.display = window.getComputedStyle(form, null).display === "flex" ? "none" : "flex";
}

const addButton = document.querySelector(".new")
addButton.addEventListener("click", () => {toggleForm()})

const closeButton = document.querySelector(".close")

closeButton.addEventListener("click", () => {
    toggleForm();
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(
        document.getElementById("title").value,
        document.getElementById("author").value,
        Number(document.getElementById("pages").value),
        "Unread"
    );

    myLibrary.push(newBook)
    library.insertBefore(createCard(newBook), newButton);

    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
    toggleForm()
});