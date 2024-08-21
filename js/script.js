function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const myLibrary = [
  new Book(
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    223,
    true
  ),
  new Book("A Tale of Two Cities", "Charles Dickens", 448, false),
  new Book("The Alchemist", "Paulo Coelho", 163, false),
  new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
  new Book("And Then There Were None", "Agatha Christie", 272, false),
  new Book("The Da Vinci Code", "Dan Brown", 689, true),
];

const dialog = document.querySelector("dialog");
const createBook = document.querySelector("#createBook");
const removeModal = document.querySelector("#removeModal");

const form = document.querySelector("form");
const titleInput = form.querySelector("#titleInput");
const authorInput = form.querySelector("#authorInput");
const pagesInput = form.querySelector("#pagesInput");
const readInput = form.querySelector("#readInput");

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function removeBook(event) {
  const index = event.target.getAttribute("book-index");
  myLibrary.splice(index, 1);
  loadContent();
}

function toggleBookRead() {
  const index = event.target.getAttribute("book-index");
  let book = myLibrary[index];
  if (book) {
    book.toggleRead();
    loadContent();
  }
}

function loadContent() {
  const booksDiv = document.querySelector(".books");
  booksDiv.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    const bookTitle = document.createElement("h4");
    bookTitle.classList.add("title");
    bookTitle.innerText = book.title;
    bookDiv.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = book.author;
    bookDiv.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.classList.add("pages");
    bookPages.innerText = `${book.pages} pages`;
    bookDiv.appendChild(bookPages);

    const bookRead = document.createElement("p");
    bookRead.classList.add("read");
    bookRead.innerText = book.read ? "Book read" : "Book not read";
    bookDiv.appendChild(bookRead);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle");
    toggleButton.setAttribute("book-index", index);
    toggleButton.innerText = "Toggle";
    toggleButton.addEventListener("click", toggleBookRead);
    buttonDiv.appendChild(toggleButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.setAttribute("book-index", index);
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
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !titleInput.validity.valid ||
    !authorInput.validity.valid ||
    !pagesInput.validity.valid ||
    !readInput.validity.valid
  ) {
    console.log("ERROR");
    console.log(authorInput.validity);
    showError();
    return;
  }

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;

  addBookToLibrary(title, author, pages, read);

  loadContent();
  dialog.close();
});

// Error handling
const error = document.querySelector("span.error");

titleInput.addEventListener("input", (event) => {
  if (titleInput.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    error.textContent = ""; // Reset the content of the message
    error.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

authorInput.addEventListener("input", (event) => {
  if (authorInput.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    error.textContent = ""; // Reset the content of the message
    error.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

pagesInput.addEventListener("input", (event) => {
  if (pagesInput.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    error.textContent = ""; // Reset the content of the message
    error.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

function showError() {
  if (titleInput.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    error.textContent = "You need to enter a title";
  } else if (titleInput.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    error.textContent = "Entered value needs to be a text";
  } else if (titleInput.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    error.textContent = `Title should be at least ${titleInput.minLength} characters; you entered ${titleInput.value.length}.`;
  }

  if (authorInput.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    error.textContent = "You need to enter an author";
  } else if (authorInput.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    error.textContent = "Entered value needs to be a text";
  }

  if (pagesInput.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    error.textContent = "You need to enter a page number";
  } else if (pagesInput.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    error.textContent = "Entered value needs to be a number";
  }

  if (readInput.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    error.textContent = "You need to enter whether book has been read";
  } else if (readInput.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    error.textContent = "Entered value needs to be a bool";
  }

  // Set the styling appropriately
  error.className = "error active";
}

function showModal() {
  dialog.showModal();
}

loadContent();
