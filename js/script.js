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
    new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, true),
    new Book("A Tale of Two Cities", "Charles Dickens", 448, false),
    new Book("The Alchemist", "Paulo Coelho", 163, false),
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("And Then There Were None", "Agatha Christie", 272, false),
    new Book("The Da Vinci Code", "Dan Brown", 689, true)
];

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    books.push(book);
}

function loadContent() {
    const booksDiv = document.querySelector('.books');
    booksDiv.innerHTML = "";
    myLibrary.forEach(book => {
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

        booksDiv.append(bookDiv);
    });

}

const dialog = document.querySelector('dialog');
//dialog.showModal();

loadContent();




