function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    console.log(`${this.title}, ${this.author}, ${this.pages}, ${this.read}`);
}

const myLibrary = [
    new Book("Harry Potter 1", "J.K.K. Rowling", 576, true)
];

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    books.push(book);
}

function loadContent() {
    const booksDiv = document.querySelector('.books');
    booksDiv.innerHTML = "";
    myLibrary.forEach(book => {
        booksDiv.append(`${book.title}`);
    });

}

const dialog = document.querySelector('dialog');
//dialog.showModal();

loadContent();




