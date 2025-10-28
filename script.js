const myLibrary = [];

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

myLibrary[0].toggleRead();

console.log(myLibrary[0]);

const library = document.querySelector(".library");

myLibrary.forEach(book => {
    const card = document.createElement("div")
    card.classList.add("card")

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

    card.append(title,author,pages,status)
    library.appendChild(card)
})