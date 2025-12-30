export function createLibrary() {
  let books = [];

  const fetchBooks = function () {
    const savedBooks = JSON.parse(localStorage.getItem("library"));
    if (savedBooks == null || savedBooks.length == 0) {
      addBook(
        "Harry Potter and the Philosopher's Stone",
        "J.K. Rowling",
        223,
        true
      );
      addBook("A Tale of Two Cities", "Charles Dickens", 448, false);
      addBook("The Alchemist", "Paulo Coelho", 163, false);
      addBook("The Hobbit", "J.R.R. Tolkien", 310, true);
      addBook("And Then There Were None", "Agatha Christie", 272, false);
      addBook("The Da Vinci Code", "Dan Brown", 689, true);
    } else {
      books.push(...savedBooks);
    }
  };

  const addBook = function (title, author, pages, read) {
    const book = createBook(title, author, pages, read);
    books.push(book);
    saveLibrary();
  };

  const removeBook = function (event) {
    const id = event.target.getAttribute("book-id");
    const index = books.findIndex((book) => book.id == id);
    if (index === -1) return;
    books.splice(index, 1);
    saveLibrary();
  };

  const toggleBookRead = function (event) {
    const id = event.target.getAttribute("book-id");
    const index = books.findIndex((book) => book.id == id);
    if (index === -1) return;
    let book = books[index];
    if (book) {
      book.read = !book.read;
    }
    saveLibrary();
  };

  const saveLibrary = function () {
    localStorage.setItem("library", JSON.stringify(books));
    loadContent();
  };

  return { books, fetchBooks, addBook, removeBook, toggleBookRead };
}
