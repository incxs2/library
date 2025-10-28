const myLibrary = [];

const buttons = document.createElement("div")
buttons.classList.add("buttons")
const readButton = document.createElement("button")
readButton.setAttribute("id", "toggleRead")
const removeBook = document.createElement("button")
removeBook.setAttribute("id", "removeBook")

buttons.append(readButton, removeBook)

const newButton = document.querySelector(".new")

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

Book.prototype.toggleRead = function() {
    this.status = this.status === "read" ? "Unread" : "Read";
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

    card.append(title,author,pages,status,buttons)
    library.insertBefore(card, newButton)

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

const submitButton = document.querySelector(".addButton")

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBook(
        document.getElementById("title").value,
        document.getElementById("author").value,
        Number(document.getElementById("pages").value)
    );
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
    toggleForm()

    const card = document.createElement("div")
    card.classList.add("card")

    const title = document.createElement("div")
    title.classList.add("title")
    title.textContent = myLibrary[myLibrary.length - 1].title

    const author = document.createElement("div")
    author.classList.add("author")
    author.textContent = `by ${myLibrary[myLibrary.length - 1].author}`

    const pages = document.createElement("div")
    pages.classList.add("pages")
    pages.textContent = `${myLibrary[myLibrary.length - 1].pages} pages`

    const status = document.createElement("div")
    status.classList.add("status")
    status.textContent = myLibrary[myLibrary.length - 1].status

    card.append(title,author,pages,status,buttons)
    library.insertBefore(card, newButton)
});