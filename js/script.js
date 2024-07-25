class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = [
    new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, true),
    new Book("A Tale of Two Cities", "Charles Dickens", 448, false),
    new Book("The Alchemist", "Paulo Coelho", 163, false),
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("And Then There Were None", "Agatha Christie", 272, false),
    new Book("The Da Vinci Code", "Dan Brown", 689, true)
];


const dialog = document.querySelector('dialog');
const createBook = document.querySelector('#createBook');
const removeModal = document.querySelector('#removeModal');

const form = document.querySelector('form');
const titleInput = form.querySelector('#titleInput');
const authorInput = form.querySelector('#authorInput');
const pagesInput = form.querySelector('#pagesInput');
const readInput = form.querySelector('#readInput');

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBook(event) {
    const index = event.target.getAttribute('book-index');
    myLibrary.splice(index, 1);
    loadContent();
}

function toggleBookRead() {
    const index = event.target.getAttribute('book-index');
    let book = myLibrary[index];
    if (book) {
        book.toggleRead();
        loadContent();
    }

}

function loadContent() {
    const booksDiv = document.querySelector('.books');
    booksDiv.innerHTML = "";
    myLibrary.forEach((book, index) => {

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const bookTitle = document.createElement('h4');
        bookTitle.classList.add('title');
        bookTitle.innerText = book.title;
        bookDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('author');
        bookAuthor.innerText = book.author;
        bookDiv.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.classList.add('pages');
        bookPages.innerText = `${book.pages} pages`;
        bookDiv.appendChild(bookPages);

        const bookRead = document.createElement('p');
        bookRead.classList.add('read');
        bookRead.innerText = book.read ? "Book read" : "Book not read";
        bookDiv.appendChild(bookRead);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle');
        toggleButton.setAttribute('book-index', index);
        toggleButton.innerText = "Toggle";
        toggleButton.addEventListener("click", toggleBookRead);
        buttonDiv.appendChild(toggleButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.setAttribute('book-index', index);
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", removeBook);
        buttonDiv.appendChild(removeButton);


        bookDiv.appendChild(buttonDiv);

        booksDiv.append(bookDiv);
    });

}

removeModal.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();

})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    addBookToLibrary(title, author, pages, read);

    loadContent();
    dialog.close();
})

function showModal() {
    dialog.showModal();
}


loadContent();




